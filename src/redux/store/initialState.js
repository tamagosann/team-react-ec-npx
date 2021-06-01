const initialState = {
    products: {
        productsList: [
            // {
            //     productId: '0001',
            //     productName: 'コーヒー',
            //     description: 'おいしいコーヒーです',
            //     image: '../src/ffff',
            //     size: [
            //         {
            //             size: 's',
            //             price: 500,
            //         },
            //         {
            //             size: 'm',
            //             price: 650,
            //         }
            //     ]
            // },
            // {
            //     productId: '0002',
            //     productName: 'サンドイッチ',
            //     description: '具がたくさんのサンドイッチです',
            //     image: '../src/ffff',
            //     size: [
            //         {
            //             size: 's',
            //             price: 400,
            //         },
            //         {
            //             size: 'm',
            //             price: 500,
            //         },
            //     ]
            // }
        ],
        toppings: [
            // {
            //     toppingId: 'aaa',
            //     toppingName: 'onion 少なめ',
            //     price: 100,
            // },
            // {
            //     toppingId: 'bbb',
            //     toppingName: 'onion 多め',
            //     price: 150,
            // },
            // {
            //     toppingId: 'ccc',
            //     toppingName: 'sermon 少なめ',
            //     price: 150,
            // },
            // {
            //     toppingId: 'ddd',
            //     toppingName: 'sermon 多め',
            //     price: 200,
            // },
        ],
    },

    users: {
        uid: null,　//ログイン後はgoogleのユーザIDが入る
        isSignedIn: false,
        username: '',
        // userInfo: {// この中身はfirebaseのuser/userinfoサブコレクションから持ってくる
        //     uid: '1122334455',
        //     productId: '0002',
        //     // status: '1',　statusは省く
        //     orderDate: '2021-05-04',
        //     destinationName: '相澤',
        //     destinationZipcode: '1111111',
        //     destinationAddress: '東京都',
        //     destinationTel: '090-8888-8888',
        //     destinationTime: '2021-05-10',
        //     paymentMethod: 1,
        //     creditCardNo: '1111-1111-1111-1111',
        // },
        // role: '', //管理者かユーザーかを認識するために使う
        cart: [ //この中身はfirebaseのuser/cartサブコレクションから持ってくる
            // {
            //     productId: '0001',
            //     url: '../../unko/unko.jpg',
            //     productSize: 'm',
            //     productPrice: 300,
            //     quantity: 2,
            //     toppingId: 'aaa',
            //     toppingName: 'sermon 多め',
            //     toppingPrice: 200,
            // },
        ],
        orders: [],
    }
};

export default initialState;

// {
//     uid: '1122334455',
//     orderId: 'abcdefg',
//     product : {
//         productId: '0001',
//         productSize: 's',
//         quantity: 2,
//         choseToppings: [
//             {//priceは、amountで合計金額出すからいらなそうじゃないかあああ？
//                 toppingId: 'aaa',
//                 toppingName: 'onion',
//                 topppingsize: 's',
//             },//トッピングの数だけこのオブジェクトが続く
//         ],
//         amount: 700, //ここは、注文するときに計算して値を入れる。
//     },
//     status: '1',
//     orderDate: '2021-05-04',
//     destinationName: '相澤',
//     destinationZipcode: 111-1111,
//     destinationAddress: '東京都',
//     destinationTel: '090-8888-8888',
//     destinationDate: '2021-05-10',
//     destinationTime: '12-14時',
//     paymentMethod: 1,
//     creditCardNo: '1111-1111-1111-1111',
// },