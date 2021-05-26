import { createSelector } from 'reselect';

const productSelector = (state) => state.products;

export const getProducts = createSelector(
    [productSelector],
    state => state.list
);
