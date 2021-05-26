import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';

import { ProductsReducer } from '../products/reducers';
import { UsersReducer } from '../users/reducers'

export default function createStore() {
    return reduxCreateStore(
        combineReducers({
            products: ProductsReducer,
            users: UsersReducer,
        }),
        applyMiddleware(
            thunk
        )
    )
}