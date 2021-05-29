
export const SET_USER_ACTION = 'SET_USER_ACTION';

export const setUserAction = (user) => {
    console.log(user)    
    return {
        type: SET_USER_ACTION,
        payload: user,
    }
}

export const FETCH_PRODUCTS_IN_CART_ACTION = 'FETCH_PRODUCTS_IN_CART_ACTION';

export const fetchProductsInCartAction = (products) => {
    console.log(products)
    return {
        type: FETCH_PRODUCTS_IN_CART_ACTION,
        payload: products,
    }
}

export const ADD_TO_CART_ACTION = 'ADD_TO_CART_ACTION';
export const addToCartAction = (item) => {
    console.log(item)
    console.log('addToCartActionが実行されました');
    return {
        type: ADD_TO_CART_ACTION,
        item: item,
    }
}
export const REMOVE_FROM_CART_ACTION = 'REMOVE_FROM_CART_ACTION';
export const removeFromCartAction = (item, index) => {
    console.log('removeFromCartActionが実行されました');
    return {
        type: REMOVE_FROM_CART_ACTION,
        item: item,
        index: index,
    }
}

