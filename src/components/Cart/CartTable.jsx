import React, {useEffect} from 'react';
// materialUI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';

// store
import {useSelector, useDispatch} from 'react-redux'
import PrimaryButton from '../UIKit/PrimaryButton'
import initialState from '../../redux/store/initialState'
import { fetchProductsInCart } from '../../redux/users/operations'
// react-router
import { Link } from 'react-router-dom'
// firebase
import {auth, db, storage, functions, FirebaseTimestamp} from '../../firebase/index'
import firebase from 'firebase'
import { removeFromCart } from '../../redux/users/operations'

const useStyles = makeStyles((theme) => ({
  rootcard: {
    Width: 345,
  },
  rootgrid: {
    flexGrow: 1,
    // grid-template-rows: '100px';
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  media: {
    height: 145,
  },
  flex: {
      display: 'flex',
      justifyContent: 'space-between',
  },
  links: {
      underline: 'none'
  }
}));  


const CartTable = () => {
    useEffect(() => {
        fetchProductsInCart()
    })
    const dispatch = useDispatch()  

    let cart = useSelector(state => state.users.cart)
    console.log(cart);
    
    console.log(cart);
    const uid = useSelector(state => state.users.uid)

    const productList = useSelector(state => state.products.productsList)
    // productList.map(list => console.log(list))

    const classes = useStyles()

    return (
        <React.Fragment>

            <Typography variant="h4" gutterBottom>
                カート
            </Typography>
            <Grid container justify="center" spacing={0} className={classes.rootgrid}>
            {cart.map((item,index) => (
                <Grid key={index} item xs={8} className={classes.control}>
                    <Card className={classes.rootcard} >
                    <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={item.url}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h1">
                        {item.productName}
                        </Typography>

                        <div className={classes.flex}>
                            <div>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {item.size[0].size} {item.size[0].price}円
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                {item.size[1].size} {item.size[1].price}円
                                </Typography>
                            </div>
                            <PrimaryButton label='削除' onClick={() => dispatch(removeFromCart(item, index))}></PrimaryButton>
                        </div>

                    </CardContent>
                    </CardActionArea>
                </Card>
                </Grid>
            ))}
            </Grid>
            <Link to='/' style={{ textDecoration: 'none' }}>
                <PrimaryButton label='商品一覧画面へ戻る'></PrimaryButton>
            </Link>
        </React.Fragment>
    )
}


export default CartTable;
