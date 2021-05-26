import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Header } from "./components/Header";
import { fetchProducts } from "./redux/products/operations";
import { getProducts } from "./redux/products/selectors";
import { signIn } from "./redux/users/operations";
import { getIsSignedIn } from "./redux/users/selectors";
import Router from "./Router";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);
  const ProductsList = getProducts(selector)
  console.log(history);
  console.log(isSignedIn);
  console.log(ProductsList);

  useEffect(() => {
    if (isSignedIn) {
      dispatch(fetchProducts());
    }
  }, [isSignedIn]);

  return (
    <>
      <Header />
      <Router />
      <button onClick={() => dispatch(signIn())}>ログイン</button>
    </>
  );
}

export default App;