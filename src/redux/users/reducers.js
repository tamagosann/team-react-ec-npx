import * as Actions from './actions'
import initialState from '../store/initialState'

export const UsersReducer = (state = initialState.users, action) => {
    switch (action.type) {
        case Actions.SET_USER_ACTION:
            return {
                ...state,
                uid: action.payload.uid,
                username: action.payload.username,
                isSignedIn: action.payload.isSignedIn,
                email: action.payload.email
            };
        case Actions.FETCH_PRODUCTS_IN_CART_ACTION:
            return {
                ...state,
                cart: [...action.payload],
            };
        case Actions.FETCH_ORDER_HISTORY_ACTION:
            return {
                ...state,
                orders: [...action.payload],
            };
        case Actions.ADD_TO_CART_ACTION:
            return {
                ...state,
                cart: [...action.payload],
            };
        case Actions.REMOVE_FROM_CART_ACTION:
            return {
                ...state,
                cart: [...action.payload]
            };
        case Actions.LOGOUT_USER_ACTION:
            return {
                ...state,
                uid: '',
                username: '',
                isSignedIn: false,
                cart: [],
                orders: [],
                email: '',
            };
        default:
            return state
    }
}