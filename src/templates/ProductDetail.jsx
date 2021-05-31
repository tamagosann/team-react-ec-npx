import React, { useCallback, useEffect, useState } from 'react';
import { Checkbox, Container, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { getProducts, getToppings } from '../redux/products/selectors';
import PrimaryButton from '../components/UIKit/PrimaryButton'
import {fetchProductsInCart, addToCart} from '../redux/users/operations'
import { useDispatch } from 'react-redux';
import { getUid } from '../redux/users/selectors';
import { fetchProducts, fetchToppings } from '../redux/products/operations';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    flex: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    rootgrid: {
      flexGrow: 1,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        }),
    },
  }));

const ProductDetail = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch() 
    const { productId } = useParams()
    const selector = useSelector(state => state);
    const uid = getUid(selector);
    const productsList = getProducts(selector)
    const index = productsList.findIndex(selected => selected.productId === productId)
    const chosen = productsList[index];
    const toppings = getToppings(selector);
    console.log(chosen);

    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedPrice, setSelectedPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [toppingId, setToppingId] = useState('');
    const [toppingName, setToppingName] = useState('なし');
    const [toppingPrice, setToppingPrice] = useState(0);

    const cart = [
        {
          cartId: '111111',
          productId: '0001',
          productName: 'チーズケーキ',
          url: '../../unko/unko.jpg',
          productSize: 'm',
          productPrice: 300,
          quantity: 2,
          toppingId: 'aaa',
          toppingName: 'sermon 多め',
          toppingPrice: 200,
        },
        {
          cartId: '222222',
          productId: '0002',
          url: '../../unko/unko.jpg',
          productName: 'ショートケーキ',
          productSize: 'm',
          productPrice: 300,
          quantity: 2,
          toppingId: 'aaa',
          toppingName: 'sermon 多め',
          toppingPrice: 200,
        },
      ];

    // アコーディオン
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // サイズ
    const handleChangeSelectedSize = (event) => {
        setSelectedSize(event.target.value);
        if(event.target.value === 'M') {
            const price = chosen.size[0].price;
            setSelectedPrice(price);
        } else if (event.target.value === 'L') {
            const price = chosen.size[1].price;
            setSelectedPrice(price);
        }
    };
    // 個数
    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    }

    const toppingOnChange = useCallback((e) => {
        if(e.target.value === 'なし') {
            setToppingName('なし');
            setToppingPrice(0);
            setToppingId('');
        } else {
            setToppingName(e.target.value);
            const index = toppings.findIndex(topping => {
                return topping.toppingName === e.target.value
            });
            const newToppingPrice = toppings[index].price;
            const newToppingId = toppings[index].toppingId;
            setToppingPrice(newToppingPrice);
            setToppingId(newToppingId);
        }
    },[toppings, setToppingId, setToppingPrice, setToppingName])

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchToppings());
    },[]);

    useEffect(() => {
        if(chosen) {
            const price = chosen.size[0].price;
            setSelectedPrice(price);
        }
    },[chosen])

    // selectedSize, selectedPrice, quantity, toppingId, toppingName, toppingPrice

    if(chosen && toppings) {

        return (
            <Container maxWidth="sm">
                <Paper variant="outlined" component="div" style={{ padding: 20, marginTop: 40,}} >
                    <h2 className="product-h2">商品詳細</h2>
                    <Grid container spacing={3} style={{ marginBottom: 40,}}>
                        <Grid item xs={12} sm={6}>
                            <img src={chosen.url} alt="商品画像"/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography gutterBottom variant="subtitle1" style={{ marginBottom: 40, fontWeight: 'bold', textAlign: 'center'}} >
                                {chosen.productName}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {chosen.description}
                            </Typography>
                        </Grid>
                    </Grid>
                    <h3 className="product-h3">サイズ</h3>
                    <div className={classes.flex} style={{ marginBottom: 40,}}>
                        <FormControl required component='fieldset'>
                        <RadioGroup row >
                            <FormControlLabel value="M" control={<Radio checked={selectedSize === 'M'} onChange={handleChangeSelectedSize}/>} label={`${chosen.size[0].size}: ${chosen.size[0].price.toLocaleString()}円`}/>
                            <FormControlLabel value="L" control={<Radio checked={selectedSize === 'L'} onChange={handleChangeSelectedSize}/>} label={`${chosen.size[1].size}: ${chosen.size[1].price.toLocaleString()}円`} />
                        </RadioGroup>
                        </FormControl>
                    </div>
                    <h3 className="product-h3">個数</h3>
                    <FormControl className={classes.formControl} style={{ marginBottom: 40,}}>
                        <InputLabel id="demo-simple-select-label">個数</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={quantity}
                        onChange={handleQuantityChange}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={11}>11</MenuItem>
                            <MenuItem value={12}>12</MenuItem>
                            <MenuItem value={13}>13</MenuItem>
                            <MenuItem value={14}>14</MenuItem>
                            <MenuItem value={15}>15</MenuItem>
                            <MenuItem value={16}>16</MenuItem>
                            <MenuItem value={17}>17</MenuItem>
                            <MenuItem value={18}>18</MenuItem>
                            <MenuItem value={19}>19</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                        </Select>
                    </FormControl>
                    <span>小計: {(selectedPrice * quantity).toLocaleString()}円</span>
                    <h3 className="product-h3">トッピング</h3>
                    <Grid container justify='center' spacing={0} className={classes.rootgrid} style={{ marginBottom: 40,}}>
                        <Grid key={index} item xs={12} sm={12} className={classes.control}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>トッピング</InputLabel>
                                <Select
                                    value={toppingName}
                                    onChange={(event) => toppingOnChange(event)}
                                >
                                    <MenuItem value={'なし'}>なし</MenuItem>
                                    {toppings.map(topping => {
                                    return <MenuItem key={topping.toppingId} value={topping.toppingName}>{ topping.toppingName }</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <span>価格:{ toppingPrice.toLocaleString() }円</span>
                        </Grid>
                    </Grid>
                    <h3 className="product-h3">合計金額</h3>
                    <Typography>
                        {((selectedPrice * quantity) + (toppingPrice * quantity)).toLocaleString()}円
                    </Typography>
                    <Typography>
                        <div className={'text-center'}>
                            <PrimaryButton label='カートへ追加' onClick={() => dispatch(addToCart(selectedSize, selectedPrice, quantity, toppingId, toppingName, toppingPrice, history, chosen))} ></PrimaryButton>
                        </div>
                    </Typography>
                </Paper>
            </Container>
        )

    } else {
        return (
        <>
            <p>...少々お待ちください</p>
        </>
        )
    }

}

export default ProductDetail;