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

export const getUsername = createSelector( //こんにちは、まるまるさんを表示するためにつかって！
    [usersSelector],
    state => state.isSignedIn
)

export const getProductsInCart = createSelector( //こんにちは、まるまるさんを表示するためにつかって！
    [usersSelector],
    state => state.isSignedIn
)
export const getOrderHistory = createSelector( //こんにちは、まるまるさんを表示するためにつかって！
    [usersSelector],
    state => state.isSignedIn
)
