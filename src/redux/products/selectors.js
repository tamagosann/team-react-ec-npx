import { createSelector } from 'reselect';

const productSelector = (state) => state.products;

export const getProducts = createSelector(
    [productSelector],
    state => state.productsList
);

export const getToppings = createSelector(
    [productSelector],
    state => state.toppings
);
