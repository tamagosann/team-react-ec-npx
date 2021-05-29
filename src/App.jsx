import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Header } from "./components/Header";
import { db } from "./firebase";
import { fetchProducts } from "./redux/products/operations";
import { getProducts } from "./redux/products/selectors";
import {
  fetchProductsInCart,
  listenAuthState,
  signIn,
  updateProductsInCart,
} from "./redux/users/operations";
import { getIsSignedIn, getProductsInCart, getUid } from "./redux/users/selectors";
import Router from "./Router";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);
  const productsList = getProducts(selector);
  const uid = getUid(selector);
  const productsInCart = getProductsInCart(selector);

  useEffect(() => {
    if (!isSignedIn) {
      console.log('きてる')
      dispatch(listenAuthState(history));
    } else {
      dispatch(fetchProductsInCart());

      const unsubscribe = db
        .collection('users')
        .doc(uid)
        .collection('cart')
        .onSnapshot((snapshots) => {
          snapshots.docChanges().forEach((change) => {
            const product = change.doc.data();
            const changeType = change.type;

            switch (changeType) {
              case "added":
                productsInCart.push(product);
                break;
              case "modified":
                const index = productsInCart.findIndex((product) => {
                  return product.productId === change.doc.id;
                });
                productsInCart[index] = product;
                break;
              case "removed":
                productsInCart = productsInCart.filter((product) => {
                  return product.cartId !== change.doc.id;
                });
                break;
              default:
                break;
            }
          });
          dispatch(updateProductsInCart(productsInCart));
        });

        return () => unsubscribe();
    }
  }, [isSignedIn]);

  return (
    <>
      <Header cartLength={productsInCart ? productsInCart.length : 0} />
      <div className="header-space"></div>
      <Router />
    </>
  );
}

export default App;
