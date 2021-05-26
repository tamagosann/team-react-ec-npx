import React, { useEffect } from 'react';
import { getIsSignedIn } from './redux/users/selectors';
import { useDispatch, useSelector, } from 'react-redux'
import { useHistory } from 'react-router';

const Auth = ({ children }) => {
    //ここでユーザーがログインしているかチェックする。していなければ、子コンポーネントは表示させず、ログインページに飛ばす。
    // const dispatch = useDispatch();
    // const selector = useSelector(state => state);
    // const isSignedIn = getIsSignedIn(selector);
    // const history = useHistory();

    // useEffect(() => {
    //     if(!isSignedIn ) {
    //         dispatch(listenAuthState(history))
    //     }
    // }, [isSignedIn])

    // if(!isSignedIn) {
    //     return <></>
    // } else {
    //     return children
    // }
    return (
        <div>
            認証してないユーザーには表示させません
            <p>{children}</p>
        </div>
    )

}


export default Auth;