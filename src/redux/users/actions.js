export const SIGN_IN = 'SIGN_IN';

export const signInAction = (user) => {
    return {
        type: SIGN_IN,
        payload: user
    }
};