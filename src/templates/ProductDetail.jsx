import React, { useState } from 'react';
// import React, { useCallback, useEffect } from 'react';
import { Checkbox, Container, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Typography } from '@material-ui/core';
// import { FormLabel, List, ListItem, ListItemText, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getProducts } from '../redux/products/selectors';
// import { getToppings } from '../redux/products/selectors';
// import AddIcon from '@material-ui/icons/Add';
// import DeleteIcon from '@material-ui/icons/Delete';
// //Cardのimport
// import Card from "@material-ui/core/Card";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// checkbox
import FormGroup from '@material-ui/core/FormGroup';
// アコーディオン
import CardActions from '@material-ui/core/CardActions';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';





import PrimaryButton from '../components/UIKit/PrimaryButton'
import {fetchProductsInCart, addToCart} from '../redux/users/operations'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import firebase from 'firebase'
// import {fetchToppings, fetchProducts} from '../redux/products/operations'


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
    // アコーディオン
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        }),
    },
  }));

  let toppings = []
  // size配列なしの方
//   firebase.firestore().collection('products/FeKpGj7gUgt7dvFmbWIU/toppings').get().then(shapshot => {
//     shapshot.forEach(doc => toppings.push(doc.data()))
//   })
  
// size配列ありの方
  firebase.firestore().collection('products/FeKpGj7gUgt7dvFmbWIU/sampleToppings').get().then(shapshot => {
    shapshot.forEach(doc => toppings.push(doc.data()))
  })

  
  const ProductDetail = () => {
    const dispatch = useDispatch() 
    const id = useParams()
    const uid = useSelector(state => state.users.uid)

    const productsList = useSelector(state => state.products.productsList)
    const selectedItem = productsList.findIndex(selected => selected.productId === id.productId)
    const chosen = productsList[selectedItem]
    
    const classes = useStyles();
    // アコーディオン
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const { productId } = useParams();
    const selector = useSelector(state => state);
    const products = getProducts(selector);

    const [selectedSize, setSelectedSize] = useState('M');
    const handleChangeSelectedSize = (event) => {
        setSelectedSize(event.target.value);
        chosen.productSize = event.target.value
        if(chosen.productSize === 'M'){
            chosen.productPrice = chosen.size[0].price
        } else if (chosen.productSize === 'L') {
            chosen.productPrice = chosen.size[1].price
        } 
    };
    // chosen.productSize = 'M'
    // chosen.selectedPrice = chosen.size[0].price
    
    // const [selectToppings, setSelectToppings] = useState({
    //     checkedA: false,
    //     checkedB: false,
    //     checkedC: false,
    //     checkedD: false,
    //     checkedE: false,
    // });
   


    // const handleChange = (event) => {
    //     setSelectToppings({ ...selectToppings, [event.target.name]: event.target.checked });
    // };


    const [selectToppings, setSelectToppings] = useState([{isClicked: false, toppingId: '', toppingName: '', toppingName: '', price: ''}]);
    const[isSelected, setIsSelected] = useState()
    console.log(selectToppings)

    let trues = []
    const handleChange = (event) => {
        console.log(event.target.checked)
        console.log(event.target.name)
        
        if(event.target.checked){
            trues.push({name: event.target.name, isChecked: event.target.checked})
        }
        console.log(trues)
    }
    
    
    // 個数
    const [quantity, setQuantity] = useState(1)
    const handleQuantityChange = (event) => {
        setQuantity(event.target.value)
        console.log(event.target.value);
        chosen.quantity = event.target.value
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
                            {/* <FormControlLabel value="M" control={<Radio checked={selectedSize === 'M'} onChange={handleChangeSelectedSize}/>} label={`${chosen.size[0].size}: ${chosen.size[0].price}円`}/>
                            <FormControlLabel value="L" control={<Radio checked={selectedSize === 'L'} onChange={handleChangeSelectedSize}/>} label={`${chosen.size[1].size}: ${chosen.size[1].price}円`} /> */}

                            {/* sampleToppings用の表示 */}
                            <FormControlLabel value="M" control={<Radio checked={selectedSize === 'M'} onChange={handleChangeSelectedSize}/>} label={`${chosen.size[0].size}: ${chosen.size[0].price}円`}/>
                            <FormControlLabel value="L" control={<Radio checked={selectedSize === 'L'} onChange={handleChangeSelectedSize}/>} label={`${chosen.size[1].size}: ${chosen.size[1].price}円`} />
                        </RadioGroup>
                        </FormControl>

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

                    {/* トッピング */}
                    <h3 className="product-h3">トッピング</h3>
                    <CardActions disableSpacing>
                    <IconButton 
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />

                    </IconButton>

                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>

                        <Grid container justify='center' spacing={0} className={classes.rootgrid}>
                            {toppings.map((topping, index) => (
                                <Grid key={index} item xs={8} sm={4} className={classes.control}>
                                    <FormGroup row>

                                        {/* eventのみ取得 */}
                                        <FormControlLabel label={`${topping.toppingName}: ${topping.size[0].size}`} control={<Checkbox checked={selectToppings.checkedA} onChange={handleChange} name={`${topping.toppingId}`} />}>
                                        </FormControlLabel>

                                        <FormControlLabel label={`${topping.toppingName}: ${topping.size[1].size}`} control={<Checkbox checked={selectToppings.checkedA} onChange={handleChange} name={`${topping.toppingId}`} />}>

                                        {/* topping情報をガッツリ引数に渡す */}
                                        {/* <FormControlLabel label={`${topping.toppingName}: ${topping.size}`} control={<Checkbox checked={false} onChange={() => handleChange(topping.toppingId, topping.toppingName, topping.price)} name={`${topping.toppingId}`} />}> */}

                                        </FormControlLabel>
                                    </FormGroup> 
                                </Grid>
                            ))}

                        </Grid>
                    </Collapse>

                    <Typography>
                        <Link to='/' style={{ textDecoration: 'none' }}>
                            <PrimaryButton label='カートへ追加' onClick={() => dispatch(addToCart(chosen))} ></PrimaryButton>
                        </Link>
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