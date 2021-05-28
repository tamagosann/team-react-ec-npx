import React, { useCallback, useEffect, useState } from 'react';
import { Checkbox, Container, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputLabel, List, ListItem, ListItemText, MenuItem, Paper, Radio, RadioGroup, Select, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getProducts, getToppings } from '../redux/products/selectors';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

const ProductDetail = () => {
    const classes = useStyles();
    const { productId } = useParams();
    const selector = useSelector(state => state);
    const products = getProducts(selector);
    const toppings = getToppings(selector);
    const [selectedSize, setSelectedSize] = useState('s');
    const handleChangeSelectedSize = (event) => {
        setSelectedSize(event.target.value);
    };

    const [selectToppings, setSelectToppings] = useState({
        checkedA: false,
        checkedB: false,
        checkedF: false,
        checkedG: false,
      });

    const handleChange = (event) => {
      setSelectToppings({ ...selectToppings, [event.target.name]: event.target.checked });
    };

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
                            <img alt="商品画像"/>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom variant="subtitle1" style={{ marginBottom: 40,}} >
                                サンドイッチ
                            </Typography>
                            <Typography variant="body2" gutterBottom　>
                                ああああああああああああああああああああああああああああああああああああああああああああああああ
                            </Typography>
                        </Grid>
                    </Grid>
                    <h3 className="product-h3">サイズ</h3>
                    <FormControl required component='fieldset'>
                      <RadioGroup row >
                        <FormControlLabel value="s" control={<Radio checked={selectedSize === 's'} onChange={handleChangeSelectedSize}/>} label="S 1,560円"/>
                        <FormControlLabel value="m" control={<Radio checked={selectedSize === 'm'} onChange={handleChangeSelectedSize}/>} label="M 1,560円" />
                      </RadioGroup>
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