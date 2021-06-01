
export const SET_USER_ACTION = 'SET_USER_ACTION';

export const setUserAction = (user) => {
    // console.log(user)    
    return {
        type: SET_USER_ACTION,
        payload: user,
    }
}

export const FETCH_PRODUCTS_IN_CART_ACTION = 'FETCH_PRODUCTS_IN_CART_ACTION';

export const fetchProductsInCartAction = (products) => {
    // console.log(products)
    return {
        type: FETCH_PRODUCTS_IN_CART_ACTION,
        payload: products,
    }
}

export const ADD_TO_CART_ACTION = 'ADD_TO_CART_ACTION';
export const addToCartAction = (cart) => {
    return {
        type: ADD_TO_CART_ACTION,
        payload: cart,
    }
}
export const REMOVE_FROM_CART_ACTION = 'REMOVE_FROM_CART_ACTION';
export const removeFromCartAction = (cart) => {
    return {
        type: REMOVE_FROM_CART_ACTION,
        payload: cart,
    }
}

export const FETCH_ORDER_HISTORY_ACTION = 'FETCH_ORDER_HISTORY_ACTION';
export const fetchOrderHistoryAction = (orderHistory) => {
    return {
        type: FETCH_ORDER_HISTORY_ACTION,
        payload: orderHistory,
    }
}

export const ORDER_CANCEL_ACTION = 'ORDER_CANCEL_ACTION';
export const orderCancelAction = (orderHistory) => {
    return {
        type: ORDER_CANCEL_ACTION,
        payload: orderHistory,
    }
}

export const LOGOUT_USER_ACTION = 'LOGOUT_USER_ACTION';

export const logOutUserAction = () => {
    return {
        type: LOGOUT_USER_ACTION,
    }
}

