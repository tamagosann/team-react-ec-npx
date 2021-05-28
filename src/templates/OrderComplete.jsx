import React, { useCallback } from 'react';
import { Container, Paper } from '@material-ui/core';
import { PrimaryButton } from '../components/UIKit';
import { useHistory } from 'react-router';

const OrderComplete = () => {
    const history = useHistory();
    const link = useCallback((path) => {
        history.push(path)
    },[history]);

    return (
        <Container maxWidth="sm">
            <Paper variant="outlined" component="div" style={{ padding: 20, marginTop: 40,}} >
                <h2 className="product-h2">決済が完了しました！</h2>
                <p className={'text-center'} style={{fontSize: 16}}>この度はご注文ありがとうございます。</p>
                <p style={{ marginBottom: 30 }}>お支払い先は、お送りしたメールに記載してありますのでご確認ください。メールが届かない場合は「注文履歴」からご確認ください。</p>
                <div className="text-center">
                    <PrimaryButton label={'商品一覧へ戻る'} onClick={() => link('/')} />
                    <span style={{ padding: 10 }}></span>
                    <PrimaryButton label={'注文履歴へ'} onClick={() => link('/order/history')}/>
                </div>
            </Paper>
        </Container>
    )
};

export default OrderComplete;