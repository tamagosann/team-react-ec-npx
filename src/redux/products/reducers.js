import * as Actions from './actions'
import initialState from '../store/initialState'

export const ProductsReducer = (state = initialState.products, action) => {
    switch (action.type) {
        case Actions.FETCH_PRODUCTS_ACTION:
            return {
                ...state,
                productsList: [...action.payload]
            }
        case Actions.FETCH_TOPPINGS_ACTION:
            return {
                ...state,
                productsList: [...action.payload]
            }
        default:
            return state
    }
}