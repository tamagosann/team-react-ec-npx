
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
