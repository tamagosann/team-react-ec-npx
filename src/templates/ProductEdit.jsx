import React, { useCallback, useState } from 'react';
import { Container, Paper } from '@material-ui/core';
import ImageArea from '../components/ProductEdit/ImageArea';
import { PrimaryButton, TextInput } from '../components/UIKit';
import { db } from '../firebase';
import { useHistory } from 'react-router';


const ProductEdit = () => {
    const history = useHistory();
    const [name, setName] = useState(''),
          [description, setDescription] = useState(''),
          [image, setImage] = useState(''),
          [priceM, setPriceM] = useState(''),
          [priceL, setPriceL] = useState('');

    const inputName = useCallback((event) => {
        setName(event.target.value)
    },[setName]);

    const inputDescription = useCallback((event) => {
        setDescription(event.target.value)
    },[setDescription]);

    const inputPriceM = useCallback((event) => {
        setPriceM(event.target.value)
    },[setPriceM]);

    const inputPriceL = useCallback((event) => {
        setPriceL(event.target.value)
    },[setPriceL]);

    const submit = useCallback((name, description, image, priceM, priceL, history) => {
        if(name === '' || description === '' || priceM === '' || priceL === '' || image === '' ) {
            alert('入力項目に不備があります。もう一度入力し直してください。')
            return false
        }
        const productsRef = db.collection('products').doc('FeKpGj7gUgt7dvFmbWIU').collection('parentProducts').doc();
        
        const newProduct = {
            productId: productsRef.id,
            productName: name,
            size: [
                {
                    size: 'M',
                    price: 340,
                },
                {
                    size: 'L',
                    price: 460,
                },
            ],
            description: description,
            url: image
        };
        productsRef.set(newProduct);
        history.push('/');


    },[name, description, image, priceM, priceL, history])

    return (
        <>
            <Container maxWidth="sm">
                <Paper variant="outlined" component="div" style={{ padding: 20, marginTop: 40,}} >
                    <h2>商品追加画面</h2>
                    <ImageArea image={image} setImage={setImage}/>
                    <TextInput fullWidth={true} multiline={false} required={true} label={'商品名'}
                        rows={1} value={name} type={'text'} onChange={(e) => inputName(e)}
                    />
                    <TextInput fullWidth={true} multiline={true} required={true} label={'商品詳細'}
                        rows={5} value={description} type={'text'} onChange={(e) => inputDescription(e)}
                    />
                    <TextInput fullWidth={true} multiline={false} required={true} label={'Mサイズ価格'}
                        rows={1} value={priceM} type={'number'} onChange={(e) => inputPriceM(e)}
                    />
                    <TextInput fullWidth={true} multiline={false} required={true} label={'Lサイズ価格'}
                        rows={1} value={priceL} type={'number'} onChange={(e) => inputPriceL(e)}
                    />
                    <div style={{marginTop: 30}}></div>
                    <div className="text-center">
                        <PrimaryButton label={'商品を追加'} onClick={() => submit(name, description, image, priceM, priceL, history)}/>
                    </div>
                </Paper>
            </Container>
        </>
    )
};

export default ProductEdit;