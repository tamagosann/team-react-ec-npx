import * as Actions from './actions'
import initialState from '../store/initialState'

export const ProductsReducer = (state = initialState.products, action) => {
    switch (action.type) {
        case Actions.FETCH_PRODUCTS:
            return {
                ...state, 
                productsList: [...action.payload]
            }
        default:
            return state
    }
}