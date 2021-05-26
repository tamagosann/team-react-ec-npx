import { fetchProductAction } from "./actions";


export const fetchProducts = () => {
    return async (dispatch) => {
        const productList = [
            {
                category: 'トップス',
                description: 'とても良い生地のいシャツです',
                gender: 'male',
                images: '#URL',
                productName: '良い感じのシャツ',
                price: 5000,
                sizes: 's',
                created_at: 'timestamp',
                updated_at: 'timestamp',
            },
            {
                category: 'ボトムス',
                description: 'ダボダボしてて履き心地の悪いズボンです。',
                gender: 'female',
                images: '#URL',
                productName: 'ダボダボのズボン',
                price: 2000,
                sizes: 'm',
                created_at: 'timestamp',
                updated_at: 'timestamp',
            },
        ];
        dispatch(fetchProductAction(productList))
    }
};
