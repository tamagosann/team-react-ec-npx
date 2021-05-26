export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const fetchProductAction = (products) => {
    return {
        type: 'FETCH_PRODUCTS',
        payload: products,
    }
}