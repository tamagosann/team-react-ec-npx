import { db } from "../../firebase"
import { fetchProductsAction, fetchToppingsAction } from "./actions";

export const fetchProducts = () => {
    return async (dispatch) => {
        let products = [];
        console.log('きたよおおお')
        await db.collection('products').doc('FeKpGj7gUgt7dvFmbWIU').collection('parentProducts').get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    products.push({...doc.data(), productId: doc.id})
                })
        });
        console.log(products)
        dispatch(fetchProductsAction(products))
    }
}

export const fetchToppings = () => {
    return async (dispatch) => {
        let toppings = [];
        await db.collection('products').doc('FeKpGj7gUgt7dvFmbWIU').collection('toppings')
            .get().then(snapshot => {
            snapshot.forEach(doc => toppings.push(doc.data()))
        });
        toppings.sort((x, y) => x.toppingName.localeCompare(y.toppingName, 'ja'));
        dispatch(fetchToppingsAction(toppings))
    }
}