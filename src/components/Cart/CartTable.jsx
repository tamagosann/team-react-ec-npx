import React, {useEffect} from 'react';
// materialUI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { Container, Paper} from '@material-ui/core';

// import { Select, MenuItem } from '@material-ui/core';
// import Card from '@material-ui/core/Card';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid';
// import CardActionArea from '@material-ui/core/CardActionArea';


// store
import {useSelector, useDispatch} from 'react-redux'
import PrimaryButton from '../UIKit/PrimaryButton'
// import initialState from '../../redux/store/initialState'
// import { fetchProductsInCart } from '../../redux/users/operations'
import SecondaryButton from '../UIKit/SecondaryButton';

// react-router
import { Link } from 'react-router-dom'
// firebase
// import {auth, db, storage, functions, FirebaseTimestamp} from '../../firebase/index'
// import firebase from 'firebase'
import { removeFromCart } from '../../redux/users/operations'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

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
    // デバッグ
    let cart = useSelector(state => state.users.cart)
    console.log(cart);
    // useEffect(() => {
    //     fetchProductsInCart()
    // })

    const dispatch = useDispatch()  

    let price = cart.map(item => item.productPrice * item.quantity)
    // console.log(price);
    let sum = price.reduce((a, b) => a + b)
    // console.log(sum);
    
    
    
    
    const uid = useSelector(state => state.users.uid)

    const productList = useSelector(state => state.products.productsList)
    // productList.map(list => console.log(list))

    const classes = useStyles()

    // cartにmapをかける
    return (
        <React.Fragment>

            <Container maxWidth="sm">
        
                <Table aria-label="customized table" style={{ padding: 20, marginTop: 40,}}>
                    <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">商品</StyledTableCell>
                        <StyledTableCell align="center">内訳</StyledTableCell>
                        <StyledTableCell align="center">商品を削除</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {cart.map((SelectedItem) => (
                        <StyledTableRow key={SelectedItem.index}>
                        <StyledTableCell component="th" scope="SelectedItem">
                            <img src={SelectedItem.url} alt="" style={{width:100}}/>
                            <br/>
                            {SelectedItem.productName}
                        </StyledTableCell>

                        <StyledTableCell align="right">         
                            <TableRow>
                                <StyledTableCell >サイズ</StyledTableCell>
                                <StyledTableCell align="right">{ SelectedItem.productSize }</StyledTableCell>
                                <StyledTableCell align="right">{ SelectedItem.productPrice }円</StyledTableCell>
                            </TableRow>

                            <TableRow>
                                <StyledTableCell >個数</StyledTableCell>
                                <StyledTableCell align="right">{ SelectedItem.quantity }</StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                            </TableRow>

                            <TableRow>
                                <StyledTableCell>トッピング</StyledTableCell>
                                <StyledTableCell align="right">{ SelectedItem.topping }</StyledTableCell>
                                <StyledTableCell align="right">{ SelectedItem.toppingPrice }円</StyledTableCell>
                            </TableRow>

                            <TableRow>
                                <StyledTableCell>小計</StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                                {SelectedItem.toppingPrice ?
                                    <StyledTableCell align="right">{ SelectedItem.productPrice * SelectedItem.quantity + SelectedItem.toppingPrice }円</StyledTableCell>
                                :
                                     <StyledTableCell align="right">{ SelectedItem.productPrice * SelectedItem.quantity }円</StyledTableCell>
                                }
                            </TableRow>

                        </StyledTableCell>

                        <StyledTableCell align="right">
                            <SecondaryButton
                            label={'削除'}
                            onClick={() => dispatch(removeFromCart(SelectedItem))}
                            />
                        </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
                
            {/* =================合計金額================= */}

            <Paper variant="outlined" component="div" style={{ padding: 20, marginTop: 40, }}>
                <h1 align="center">
                {/* 消費税： { Math.floor(5000 * 0.1).toLocaleString() }円 */}
                消費税： { Math.floor(sum * 0.1).toLocaleString() }円
                </h1>
                <h1 align="center">
                ご注文合計金額:
                {/* { Math.floor(5000 * 1.1).toLocaleString() }円(税込) */}
                { sum }円(税込)
                </h1>    
            </Paper>
            <Link to='/' style={{ textDecoration: 'none' }}>
                <PrimaryButton label='商品一覧画面へ戻る'></PrimaryButton>
            </Link>

            </Container>
        </React.Fragment>
    )
}


export default CartTable;
