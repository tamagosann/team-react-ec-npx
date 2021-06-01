import React, { useEffect, useMemo } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Container, Paper } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import PrimaryButton from "../UIKit/PrimaryButton";
import SecondaryButton from "../UIKit/SecondaryButton";
import { addToCart, noLoginAddToCart, removeFromCart, signIn } from "../../redux/users/operations";
import { getIsSignedIn, getProductsInCart, getUid } from "../../redux/users/selectors";
import { getProducts } from "../../redux/products/selectors";
import { useHistory } from "react-router";

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
    "&:nth-of-type(odd)": {
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
    display: "flex",
    justifyContent: "space-between",
  },
  links: {
    underline: "none",
  },
  container: {
    width: 700,
    overflowX: 'scroll', 
    margin: '0 auto'
  }
}));

const CartTable = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const selector = useSelector((state) => state);
  const cart = getProductsInCart(selector);
  const uid = getUid(selector);
  const productsList = getProducts(selector);
  const isSignedIn = getIsSignedIn(selector);

  const sum = useMemo(() => {
    if(cart.length > 0) {
      let prices = []; 
      cart.forEach((cartItem) => {
        const price = cartItem.productPrice * cartItem.quantity + cartItem.toppingPrice * cartItem.quantity;
        prices.push(price);
      });
      const sumPrice = prices.reduce((a, b) => a + b)
      return sumPrice;
    } else {
      return 0
    }
  },[cart])

  useEffect(() => {
    if(isSignedIn && uid) {
      let noLoginCart = JSON.parse(
        localStorage.getItem('nologincart') || '[]'
      );
      localStorage.setItem('nologincart', JSON.stringify([]));
      
      if (noLoginCart.length > 0) {
        console.log(noLoginCart);
        noLoginCart.forEach(cartItem => {
          dispatch(noLoginAddToCart(cartItem))
        })
        history.push('/order/confirm')
      }
    }
  },[isSignedIn, uid])

  const goToOrderClicked = () => {
    if(isSignedIn) {
      history.push('/order/confirm')
    } else {
      localStorage.setItem('nologincart', JSON.stringify(cart));
      dispatch(signIn());
    }
  };

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        {cart.length > 0 && (
        <Table
          aria-label="customized table"
          style={{ padding: 20, marginTop: 40 }}
          className={classes.container}
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">商品</StyledTableCell>
              <StyledTableCell align="center">内訳</StyledTableCell>
              <StyledTableCell align="center">商品を削除</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((SelectedItem, index) => (
              <StyledTableRow key={SelectedItem.cartId}>
                <StyledTableCell component="th" scope="SelectedItem">
                  <img src={SelectedItem.url} alt="商品画像" style={{ width: 100 }} />
                  <br />
                  {SelectedItem.productName}
                </StyledTableCell>

                <StyledTableCell align="right">
                  <TableRow>
                    <StyledTableCell>サイズ</StyledTableCell>
                    <StyledTableCell align="right">
                      {SelectedItem.productSize}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {SelectedItem.productPrice}円
                    </StyledTableCell>
                  </TableRow>

                  <TableRow>
                    <StyledTableCell>個数</StyledTableCell>
                    <StyledTableCell align="right">
                      {SelectedItem.quantity}
                    </StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                  </TableRow>

                  <TableRow>
                    <StyledTableCell>トッピング</StyledTableCell>
                    <StyledTableCell align="right">
                      {SelectedItem.toppingName}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {SelectedItem.toppingPrice}円
                    </StyledTableCell>
                  </TableRow>

                  <TableRow>
                    <StyledTableCell>小計</StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                      <StyledTableCell align="right">
                        {((SelectedItem.productPrice * SelectedItem.quantity) +
                          (SelectedItem.toppingPrice * SelectedItem.quantity)).toLocaleString()}
                        円
                      </StyledTableCell>
                  </TableRow>
                </StyledTableCell>

                <StyledTableCell align="right">
                  <SecondaryButton
                    label={"削除"}
                    onClick={() => dispatch(removeFromCart(SelectedItem.cartId, index))}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        )}

        <Paper
          variant="outlined"
          component="div"
          style={{ padding: 20, marginTop: 40 }}
        >
          { cart.length > 0 && (
            <>
              <h1 align="center">
                消費税： { Math.floor(sum * 0.1).toLocaleString() }円
              </h1>
              <h1 align="center">
                ご注文合計金額:
                {sum.toLocaleString()}円(税込)
              </h1>
            </>
          )}
          { cart.length === 0 && (
            <div className="text-center">カートに商品がありません。</div>
          )}
        </Paper>
        <div className="mt-20 text-center">
          <span style={{marginRight: 20, marginBottom: 20}}>
            <SecondaryButton label="商品一覧画面へ戻る" onClick={() => history.push('/')}></SecondaryButton>
          </span>
          <PrimaryButton label="注文へ進む" onClick={() => goToOrderClicked()}></PrimaryButton>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default CartTable;
