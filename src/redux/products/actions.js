export const FETCH_PRODUCTS_ACTION = 'FETCH_PRODUCTS_ACTION';

export const fetchProductsAction = (products) => {
    console.log(products)
    return {
        type: FETCH_PRODUCTS_ACTION,
        payload: products,
    }
}

export const FETCH_TOPPINGS_ACTION = 'FETCH_TOPPINGS_ACTION';

export const fetchToppingsAction = (toppings) => {
    console.log(toppings)
    return {
        type: FETCH_TOPPINGS_ACTION,
        payload: toppings,

    }
}

