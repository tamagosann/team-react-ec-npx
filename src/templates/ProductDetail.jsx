import React, { useCallback, useEffect, useState } from 'react';
import { Checkbox, Container, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputLabel, List, ListItem, ListItemText, MenuItem, Paper, Radio, RadioGroup, Select, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getProducts, getToppings } from '../redux/products/selectors';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import PrimaryButton from '../components/UIKit/PrimaryButton'
import {fetchProductsInCart, addToCart} from '../redux/users/operations'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    flex: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }));

const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()
    const newProducts = useSelector(state => state.products.productsList)        

    const id = useParams()
    const selectedItem = newProducts.findIndex(selected => selected.productId === id.productId)
    const chosen = newProducts[selectedItem]
    
    
    const classes = useStyles();
    const { productId } = useParams();
    const selector = useSelector(state => state);
    const products = getProducts(selector);
    const toppings = getToppings(selector);
    const [selectedSize, setSelectedSize] = useState('M');
    const handleChangeSelectedSize = (event) => {
        setSelectedSize(event.target.value);
        chosen.selectedSize = event.target.value
        if(chosen.selectedSize === 'M'){
            chosen.selectedPrice = chosen.size[0].price
        } else if (chosen.selectedSize === 'L') {
            chosen.selectedPrice = chosen.size[1].price
        } 
        console.log(chosen);
    };
    // chosen.selectedSize = 'M'
    // chosen.selectedPrice = chosen.size[0].price

    const [selectToppings, setSelectToppings] = useState({
        checkedA: false,
        checkedB: false,
        checkedF: false,
        checkedG: false,
      });

    const handleChange = (event) => {
      setSelectToppings({ ...selectToppings, [event.target.name]: event.target.checked });
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value)
    }

    let product;

    // useEffect(() => {
    //     if(products !== undefined) {
    //         const index = products.findIndex(product => {
    //             return product.productId === productId
    //         })
    //         product = products[index];
    //     }
    // }, [products])

    if(true) {

        return (
            <Container maxWidth="sm">
                <Paper variant="outlined" component="div" style={{ padding: 20, marginTop: 40,}} >
                    <h2 className="product-h2">商品詳細</h2>
                    <Grid container spacing={3} style={{ marginBottom: 40,}}>
                        <Grid item xs={6}>
                            <img src={chosen.url} alt="商品画像"/>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom variant="subtitle1" style={{ marginBottom: 40,}} >
                                {chosen.productName}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {chosen.description}
                            </Typography>
                        </Grid>
                    </Grid>
                    <h3 className="product-h3">サイズ</h3>
                    <div className={classes.flex}>
                        <FormControl required component='fieldset'>
                        <RadioGroup row >
                            <FormControlLabel value="M" control={<Radio checked={selectedSize === 'M'} onChange={handleChangeSelectedSize}/>} label={`${chosen.size[0].size}: ${chosen.size[0].price}円`}/>
                            <FormControlLabel value="L" control={<Radio checked={selectedSize === 'L'} onChange={handleChangeSelectedSize}/>} label={`${chosen.size[1].size}: ${chosen.size[1].price}円`} />
                        </RadioGroup>
                        </FormControl>

                        <Typography>
                            <Link to='/' style={{ textDecoration: 'none' }}>
                                <PrimaryButton label='カートへ追加' onClick={() => dispatch(addToCart(chosen))} ></PrimaryButton>
                            </Link>
                        </Typography>
                    </div>
                    <h3 className="product-h3">個数</h3>

                    <FormControl className={classes.formControl}>
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

                    <h3 className="product-h3">トッピング</h3>

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