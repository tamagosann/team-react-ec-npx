import { createSelector } from 'reselect';

const usersSelector = (state) => state.users;

export const getIsSignedIn = createSelector(
    [usersSelector],
    state => state.isSignedIn
)

export const getUid = createSelector(
    [usersSelector],
    state => state.uid
)

export const getUsername = createSelector( 
    [usersSelector],
    state => state.username
)

export const getProductsInCart = createSelector( 
    [usersSelector],
    state => state.cart
)
export const getOrderHistory = createSelector(
    [usersSelector],
    state => state.orders
)
