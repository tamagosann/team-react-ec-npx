import * as Actions from './actions'
import initialState from '../store/initialState'

export const ProductsReducer = (state = initialState.products, action) => {
    switch (action.type) {
        case Actions.FETCH_PRODUCTS:
            return {
                ...state, //今回の場合は別にこの8行目はかかなくてもいい
                //ここでわざと配列の中にスプレッドしているのは、reduxに情報が変わったことを認知させるため。
                list: [...action.payload]
            }
        default:
            return state
    }
}