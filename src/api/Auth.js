
import validator from "validator"
import Cookies from "js-cookie";
import bcrypt from 'bcryptjs';

import { firebaseConfig } from "./firebaseConfig";
import { app } from "./firebaseConfig";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from "firebase/firestore";

const database = getFirestore()

export const API = {
    register: async (name, country, email, CEO, service, password ) => {
        const collectionRef = collection(database, "companies");

        const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const user = { 
            name,
            email,
            password: hash,
            CEO,
            service,
            country,
            date: Date.now(),
            logo: ""
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

            Cookies.set("token", id);
            window.location.href = "/";
        } catch (err) {
            console.log(err);
            return err;
        }
    },

    access: async ( email, password ) => {
        const collectionRef = collection(database, "companies");

        if (!validator.isEmail(email)) {
            console.log(email);
            return "Please, provide a valid email.";
        }
        if (!validator.isStrongPassword(password)) {
            return "Please, provide a valid password.";
        }

        await getDocs(collectionRef)
        .then((snapshot) => {
            snapshot.docs.forEach( async (doc) => {
                if (doc.data().email === email){
                    console.log(email);

                    const hash = doc.data().password;
                    const result = await bcrypt.compare(password, hash);

                    if (result) {
                        Cookies.set("token", doc.data().id);
                        window.location.href = "/";
                    }
                };
            })
        })
    },

    getMe: async ( token ) => {
        const collectionRef = collection(database, "companies");

        await getDoc(doc(database, "companies", token))
        .then((snapshot) => {
            // console.log(snapshot.data());
        })
    }
}
