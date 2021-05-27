import firebase from 'firebase/app'
import { auth, db } from '../../firebase';
import { setUserAction, fetchProductsInCartAction } from './actions';

export const signIn = () => {
    return async (dispatch) => {
        const google_auth_provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithRedirect(google_auth_provider);
    }
}

export const signOut = () => {
    return async (dispatch) => {
        auth.signOut();
        dispatch(setUserAction({
            uid: null,
            username: '',
            isSignedIn: false,
        }))
    }
}

export const listenAuthState = (history) => {
    return async (dispatch) => {
        return auth.onAuthStateChanged(user => {
            if(user) {
                console.log(user)
                const uid = user.uid;
                const username = user.displayName;
                const loginUser = {
                    uid: uid,
                    isSignedIn: true,
                    username: username,
                }
                console.log(loginUser)
                dispatch(setUserAction(loginUser));
                if(history.location.path === '/login') {
                    history.push('/')
                }
            } else {
                setUserAction({
                    uid: null,
                    username: '',
                    isSignedIn: false,
                });
            }
        })
    }
}

export const fetchProductsInCart = () => {
    return async (dispatch, getState) => {
        const uid = getState().users.uid;
        console.log(uid)
        let fetchedCart = [];
        await db.collection(`users/${uid}/cart`).get()
            .then(snapshot => {
                console.log(snapshot)
                snapshot.forEach(doc => {
                    console.log(doc)
                    const data = doc.data();
                    const cartItem = {
                        ...data,
                        todoId: doc.id
                    };
                    fetchedCart.push(cartItem);
                });
            })
        console.log(fetchedCart)
        dispatch(fetchProductsInCartAction(fetchedCart))
    }
}

export const updateProductsInCart = (products) => {
    return async (dispatch) => {
        //処理が全く同じなのでfetchProductsInCartActionを使い回す
        dispatch(fetchProductsInCartAction(products))
    }
}