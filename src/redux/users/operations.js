import { signInAction } from './actions';

export const signIn = () => {
    return async (dispatch) => {
        dispatch(signInAction({
            isSignedIn: true,
            role: 'customer',
            uid: 'aabbccdd',
            username: '哀川',
        }))
    }
}
