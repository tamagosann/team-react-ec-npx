import * as Actions from './actions'
import initialState from '../store/initialState'

export const UsersReducer = (state = initialState.users, action) => {
    console.log(state)
    console.log(action)
    switch (action.type) {
        case Actions.SET_USER_ACTION:
            return {
                ...state,
                uid: action.payload.uid,
                username: action.payload.username,
                isSignedIn: action.payload.isSignedIn,

            };
        case Actions.FETCH_PRODUCTS_IN_CART_ACTION:
            return {
                ...state,
                cart: [...action.payload],
            };
        default:
            return state
    }
}