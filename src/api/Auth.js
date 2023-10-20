
import validator from "validator"
import Cookies from "js-cookie";
import bcrypt from 'crypto';

import { app } from "./firebaseConfig";
import { addDoc, arrayUnion, collection, query, doc, 
    getDoc, getDocs, getFirestore, 
    onSnapshot, setDoc, updateDoc, where, deleteDoc } 
from "firebase/firestore";

const database = getFirestore(app);

export const API = {
    register: async (name, country, email, CEO, service, password ) => {
        const collectionRef = collection(database, "companies");

        const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const token = bcrypt.hashSync(password)

        const user = { 
            company_name: name,
            email,
            password: hash,
            CEO,
            service,
            country,
            date: Date.now(),
            logo: "",
            token
        }

        if (!validator.isEmail(email)) {
            return "Please, provide a valid email.";
        }
        if (!validator.isStrongPassword(password)) {
            return "Please, provide a valid password.";
        }

        try {
            const company = await addDoc(collectionRef, user);
            const id = company._key.path.segments[1];

            await updateDoc(doc(database, "companies", id), {
                id
            });

            await setDoc(doc(database, "sales", id), {
                company_id: id,
                id,
                sales: []
            })

            await setDoc(doc(database, "containers", id), {
                company_id: id,
                id,
                products: []
            })

            Cookies.set("token", token);
            Cookies.set("id", id);
            localStorage.setItem("name", name);
            localStorage.setItem("email", email);
            localStorage.setItem("CEO", CEO);
        } catch (err) {
            console.log(err);
            return null;
        }
    },

    access: async ( email, password ) => {
        const collectionRef = collection(database, "companies");
        let token = null;
        let id = null;
        let name = "";
        let _email = "";
        let CEO = "";
        let logo = "";

        if (!validator.isEmail(email)) {
            return "Please, provide a valid email.";
        }
        if (!validator.isStrongPassword(password)) {
            return "Please, provide a valid password.";
        }

        try {
            await getDocs(collectionRef)
            .then((snapshot) => {
                snapshot.docs.forEach( (doc) => {
                    if (doc.data().email === email) {
                        const hash = doc.data().password;

                        (async function() {
                            const hashCompare = await bcrypt.compare(password, hash);
                            if ( !hashCompare ) {
                                return null;
                            } else {
                                token = doc.data().token;
                                id = doc.data().id;
                                name = doc.data().company_name;
                                _email = doc.data().email;
                                CEO = doc.data().CEO;
                                logo = doc.data().logo; 

                                Cookies.set("token", token);
                                Cookies.set("id", id);
                                localStorage.setItem("name", name);
                                localStorage.setItem("email", _email);
                                localStorage.setItem("CEO", CEO);
                                localStorage.setItem("logo", logo);
                                
                                return { token, id };
                            }
                        })();
                    };
                })
            })
        } catch(err) {
            return null;
        }
    },

    getMe: async ( token ) => {
        let user = null;

        await getDoc(doc(database, "companies", token))
        .then((snapshot) => {
            user = snapshot.data();
        })
        return user;
    },

    registerProduct: async ( id, name, price, discount, final_price, category, quantity, SKU, barcode ) => {  
        let result;
        let scans = [];
        let products = [];

        try {
            await getDoc(doc(database, "scans", id))
            .then((snapshot ) => {
                if (snapshot.data() === undefined) {
                    scans.push( barcode );
                } else {
                    scans = snapshot.data().codes;
                }
            })

            let res = scans.findIndex((el) => el === barcode);
            if (res > -1 ) {
                let existingProduct;
                await getDoc(doc(database, "containers", id))
                .then((snapshot) => {
                    products = [...snapshot.data().products];

                    if (snapshot.data() !== undefined) {
                        snapshot.data().products.forEach( async (prod) => {
                            if (prod.barcode === barcode) {
                                let updated = {
                                    ...prod, 
                                    quantity: prod.quantity += quantity, 
                                    outputs: prod.outputs
                                }
                                let newProds = products.filter(el => el.barcode !== barcode );
                                newProds.push(updated);
    
                                result = await updateDoc(doc(database, `containers`, id), { 
                                    products: newProds
                                })
                            }
                        });
                    }
                })
            } else {
                result = await updateDoc(doc(database, `containers`, id), { 
                    products: arrayUnion({
                        name, 
                        price, 
                        discount, 
                        final_price, 
                        category, 
                        quantity, 
                        SKU, 
                        barcode, 
                        outputs: 0, 
                        date: Date.now() 
                    })
                })
                await updateDoc(doc(database, "scans", id), {
                    codes: arrayUnion(barcode)
                })
            }
        } catch(err) {
            console.log(err);
            return null;
        }
        return result;
    },

    getProducts: async ( id ) => {
        let products = [];
        try {
            await getDoc(doc(database, "containers", id))
            .then((snapshot) => {
                products = snapshot.data().products;
            })
    
            onSnapshot(doc(database, "containers", id), (snapshot) => {
                products = snapshot.data().products;
            })
        } catch(err) {
            return null;
        }

        return products;
    },

    getProduct: async ( id, barcode ) => {
        let product = null;

        try {
            await getDoc(doc(database, "containers", id))
            .then((snapshot) => {
                snapshot.data().products.forEach((prod) => {
                    if (prod.barcode === barcode) {
                        product = prod;
                    }
                });
            })
            return product;
        } catch(err) {
            return null
        }
    },

    getScanned: async ( id ) => {
        let code = "";

        await getDoc(doc(database, "scans", id))
        .then((snapshot) => {
            code = snapshot.data().codes.at(-1);
        })

        onSnapshot(doc(database, "scans", id), (snapshot) => {
            code = snapshot.data().codes.at(-1);
        })

        return code;
    },

    getAsyncScanned: async ( id, setBarcode ) => {
        let scanned;

        onSnapshot(doc(database, "scans", id), (snapshot) => {
            if (snapshot.data() !== undefined) {
                scanned = snapshot.data().codes.at(-1);
                setBarcode(scanned);
            } else {
                scanned = "";
            }
        })
        return scanned;
    },

    setCheckout: async ( id, total, payment_method, products ) => {
        console.log('prods: ', products);

        try {
            await updateDoc(doc(database, "sales", id), {
                sale: arrayUnion({
                    id: Date.now(),
                    date: Date.now(),
                    total,
                    payment_method,
                    products
                })})
        } catch (err) {
            console.log(err);
            return null;
        }
    },
    
    getSales: async ( id, timestamp ) => {
        let sales = [];
        let dates = [];
        let filters = [];

        try {
            await getDoc(doc(database, "sales", id))
            .then((snapshot) => {
                sales = snapshot.data().sale;
                sales.forEach(el => dates.push(el.date));
            })
            sales.forEach(el => {
                if (timestamp >= el.date ) {
                    filters.push(el);
                }
            })
            // console.log("filters: ", filters);
            return filters;
        } catch(err) {
            return null;
        }
    },

    getTotalSales: async ( id ) => {
        let total;
        let amount = 0;
        let payment_methods = [];

        try {
            await getDoc(doc(database, "sales", id))
            .then((snapshot) => {
                total = snapshot.data().sale.length;
                let sales = snapshot.data().sale;
                sales.forEach(el => {
                    amount += el.total
                    payment_methods.push(el.payment_method);
                })
            })
        } catch (err) {
            return null;
        }

        return { total, amount, payment_methods };
    },

    getAllProducts: async ( id ) => {
        try {
            await getDoc(doc(database, `containers`, id))
            .then((snapshot) => {
                // console.log("s: ", snapshot.data());
            })
        } catch(err) {
            return null;
        }
    },

    updateProduct: async ( id, _barcode, quantity ) => {
        let prods = [];
    
        try {
            await getDoc(doc(database, "containers", id))
            .then(( snapshot ) => {
                prods = snapshot.data().products;
            })

            prods.forEach((prod) => {
                if (prod.barcode === _barcode) {
                    prod.quantity -= quantity;
                    prod.outputs += quantity;
                }
            })

            await updateDoc(doc(database, "containers", id), {
                products: prods
            })
    
        } catch(err) {
            console.log(err);
            return null;
        }
    },

    getBestSellers: async ( id ) => {
        let bests = [];
        let data = [];

        try {
            await getDoc(doc(database, "containers", id))
            .then((snapshot) => {
                bests = snapshot.data().products;

                bests.forEach(el => {
                    data.push({
                        name: el.name,
                        price: el.price,
                        outputs: el.outputs
                    })
                })
            })
        } catch(err) {
            return null;
        }

        return data;
    },

    getSalesAnalytics: async ( id ) => {
        let day = 0;
        let month = 0;
        let year = 2023;

        let data = [];
        let analytics = [];

        try {
            await getDoc(doc(database, "sales", id))
            .then((snapshot) => {
                snapshot.data().sale.forEach(( el ) => {
                    data.push(el);
                })
            })
        } catch (err) {
            console.log(err);
            return null;
        }

        for (let i = 0; i < 30; i++) {
            let dateStr = `2023-10-${day+i}`;
            let _date = new Date(dateStr);
            let timestamp = _date.getTime();
            // console.log(timestamp);

            data.forEach(( el ) => {
                if (el.date >= timestamp && (parseInt(timestamp) + 86400000) >= el.date) {
                    // analytics.push( timestamp, el );
                }
            })
        }
        // console.log('analy: ', analytics);
    }
}
