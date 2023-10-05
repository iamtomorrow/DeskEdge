
import validator from "validator"
import Cookies from "js-cookie";
import bcrypt from 'bcryptjs';

import { app } from "./firebaseConfig";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, getFirestore, onSnapshot, setDoc, updateDoc } from "firebase/firestore";

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
            window.location.href = "/";
        } catch (err) {
            console.log(err);
            return err;
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

        await getDocs(collectionRef)
        .then((snapshot) => {
            snapshot.docs.forEach( (doc) => {
                if (doc.data().email === email) {
                    token = doc.data().token;
                    id = doc.data().id;
                    name = doc.data().name;
                    _email = doc.data().email;
                    CEO = doc.data().CEO;
                    logo = doc.data().logo;
                };
            })
        })

        Cookies.set("token", token);
        Cookies.set("id", id);
        localStorage.setItem("name", name);
        localStorage.setItem("email", _email);
        localStorage.setItem("CEO", CEO);
        localStorage.setItem("logo", logo);

        return { token, id };
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
        console.log(id);

        let result = await updateDoc(doc(database, "containers", id), {
            products: arrayUnion({
                name, 
                price, 
                discount, 
                final_price, 
                category, 
                quantity, 
                SKU, 
                barcode,
                date: Date.now()
            })
        })

        return result;
    },

    getProducts: async ( id ) => {
        let products = [];

        await getDoc(doc(database, "containers", id))
        .then((snapshot) => {
            products = snapshot.data().products;
        })

        onSnapshot(doc(database, "containers", id), (snapshot) => {
            products = snapshot.data().products;
        })

        return products;
    },

    getProduct: async ( id, barcode ) => {
        let product = null;

        await getDoc(doc(database, "containers", id))
        .then((snapshot) => {
            snapshot.data().products.forEach((prod) => {
                if (prod.barcode === barcode) {
                    product = prod;
                }
            });
        })

        return product;
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
    }
}
