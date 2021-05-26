const initialState = {
    products: {
        list: [],
    },
    users: {
        uid: '',
        isSignedIn: false,
        username: '',
        role: '', //管理者かユーザーかを認識するために使う
        cart: [],
        orders: [],
    }
};

export default initialState;