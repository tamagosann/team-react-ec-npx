import React, { useEffect } from 'react';
import { getIsSignedIn, getUid } from './redux/users/selectors';
import { useDispatch, useSelector, } from 'react-redux'
import { useHistory } from 'react-router';

const Auth = ({ children }) => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const isSignedIn = getIsSignedIn(selector);
    const uid = getUid(selector);
    const history = useHistory();

    useEffect(() => {
        if(!isSignedIn && uid === '') {
            console.log('ほむに戻します')
            history.push('/')
        }
    }, [isSignedIn, uid])

    if(!isSignedIn) {
        return <></>
    } else {
        return children
    }

}


export default Auth;