import { useState, useEffect } from "react";
import { db } from '../firebase/firebase'
import { onSnapshot, collection} from "firebase/firestore"; 

const useFirestore = (id) =>{
    const [items, setItems] = useState([]);
    const collectionRef = collection(db, id);

    useEffect(()=> {
        const dataTest =  onSnapshot(collectionRef,(querySnapshot) => { 
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push({...doc.data(), id: doc.id});
            });
        setItems(items);
        });
        return () => {
            dataTest();
        };
    }, []);
    return { items };
}

export default useFirestore;