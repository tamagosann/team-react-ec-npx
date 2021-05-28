import React, { useCallback, useEffect, useState } from 'react';
import { Container, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputLabel, List, ListItem, ListItemText, MenuItem, Paper, Radio, RadioGroup, Select, Typography } from '@material-ui/core';
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
    let selectedToppings = [{
        toppingId: '0001',
        toppingName: "onion",
        size: 's',
        price: 100,
    }];
    const [selectedSize, setSelectedSize] = useState('s');
    const handleChangeSelectedSize = (event) => {
        setSelectedSize(event.target.value);
    };
    const [currentTopping, setCurrentTopping] = useState('');
    const selectorOnChange = useCallback((event) => {
        setCurrentTopping(event.target.value);
    },[setCurrentTopping]);
    const addTopping = useCallback(() => {

    },[])
    const deleteTopping = (topping) => {
        console.log('きたよ')
        const newSelectedToppings = selectedToppings.filter(selectedtoppping => {
            return selectedtoppping.toppingId !== topping.toppingId || selectedtoppping.toppingName !== topping.toppingName || selectedtoppping.size !== topping.size
        });
        console.log(newSelectedToppings);
    }

    console.log(products)
    console.log(toppings)
  
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
        const progressData = [
            0,10,20,30,40,50,60,70,80,90,100,
        ];

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
                    <List>
                        {selectedToppings && selectedToppings.map((topping,index) => (
                            <ListItem key={index}>
                                <ListItemText primary={`${topping.toppingName}　${topping.size}　${topping.price}円` } />
                                <IconButton onClick={deleteTopping(topping)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                        <ListItem>
                            <FormControl className={classes.formControl}>
                              <InputLabel id="demo-simple-select-label">トッピング</InputLabel>
                              <Select
                                value={currentTopping}
                                onChange={selectorOnChange}
                              >
                                {progressData.map(data => {
                                  return <MenuItem key={data} value={data}>{data}</MenuItem>
                                })}
                              </Select>
                            </FormControl>
                            <IconButton onClick={addTopping}>
                                <AddIcon />
                            </IconButton>
                        </ListItem>
                    </List>

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