import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
//Cardのimport
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
//Gridのimport
import Grid from "@material-ui/core/Grid";
//TextFieldのimport
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
// //お気に入りボタンのimport
// import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/products/selectors";
import { fetchProducts } from "../redux/products/operations";
import ClearIcon from '@material-ui/icons/Clear';
import HomeSwiper from "../components/Swiper/HomeSwiper";
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  sliderBox: {
    [theme.breakpoints.down('sm')]: {
        margin: '30px auto 30px auto',
        height: 320,
        width: 320, 
    },
    [theme.breakpoints.up('sm')]: {
        margin: '30px auto',
        height: 400,
        maxWidth: 400,
        width: '100%',
    }
  },
  rootcard: {
    Width: 345,
  },
  rootgrid: {
    flexGrow: 1,
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
  roottext: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  rootsearch: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: 320,
  },
  input: {
    margin: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  links: {
    underline: "none",
  },
}));

const ProductList = () => {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const products = getProducts(selector);
  const history = useHistory();
  const handleLink = (path) => history.push(path);
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const [showingProducts, setShowingProducts] = useState([]);
  const [currentPageShowingProducts, setCurrentPageShowingProducts] = useState([]);
  const [imgaes, setImages] = useState([]);
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(1)

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    setShowingProducts(products);
    const newImages = products.map(product => {
      return product.url
    });
    setImages(newImages)
  },[products])

  const keywordOnChange = useCallback((e) => {
    setKeyword(e.target.value);
  },[setKeyword]);

  const keywordOnClicked = useCallback(() => {
    const newShowingProducts = products.filter(product => {
      return product.productName.indexOf(keyword) >= 0
    });
    console.log(newShowingProducts);
    setShowingProducts([...newShowingProducts]);
  },[keyword, products, setShowingProducts])

  const clearSearchInpuut = useCallback(() => {
    setKeyword('');
    setShowingProducts(products);
  },[products, setKeyword, setShowingProducts]);

  useEffect(() => {
    if(showingProducts.length > 9) {
      const pages = (Math.floor(showingProducts.length / 9) + 1)
      setPageCount(pages);

      const startProduct = (page * 9 - 9);
      const lastProduct = startProduct + 9;
      const newProducts = showingProducts.slice(startProduct, lastProduct);
      setCurrentPageShowingProducts(newProducts);
    } else if(showingProducts.length > 0 && showingProducts.length <= 9){
      setPage(1);
      setPageCount(1);
      setCurrentPageShowingProducts(showingProducts);
    } else if(showingProducts.length === 0) {
      setPage(1);
      setPageCount(1);
      setCurrentPageShowingProducts([]);
    }
  },[page, showingProducts, setCurrentPageShowingProducts, setPageCount, setPage])

  return (
    <>
    {imgaes.length > 0 && 
      <div className={classes.sliderBox}>
        <HomeSwiper images={imgaes}/>
      </div>
    }
      <Paper className={classes.rootsearch}>
        <InputBase
          className={classes.input}
          placeholder="入力してください"
          value={keyword}
          onChange={(e) => keywordOnChange(e)}
        />
        <IconButton
          type="button"
          className={classes.iconButton}
          onClick={keywordOnClicked}
        >
          <SearchIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          color="primary"
          className={classes.iconButton}
          onClick={clearSearchInpuut}
        >
          <ClearIcon />
        </IconButton>
      </Paper>
      <Grid container justify="center" spacing={0} className={classes.rootgrid}>
        {currentPageShowingProducts.length > 0 && currentPageShowingProducts.map((product, value) => (
          <Grid key={value} item xs={8} sm={4} className={classes.control}>
            <Card className={classes.rootcard}>
              <CardActionArea
                onClick={() => handleLink(`/product/${product.productId}`)}
              >
                <CardMedia
                  className={classes.media}
                  image={product.url}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h1">
                    {product.productName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {product.size[0].size} {product.size[0].price}円
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {product.size[1].size} {product.size[1].price}円
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        {currentPageShowingProducts.length === 0 && (
          <>
            <p className="mb-20">該当する商品はありません</p>
          </>
        )}
      </Grid>
      <div className="text-center">
        <Pagination
          style={{display: "inline-block", marginTop: 20, marginBottom: 30}}
          count={pageCount}
          variant="outlined"
          color="primary"
          onChange={(e, page) => setPage(page)}
          page={page}
        />
      </div>
    </>
  );
};
export default ProductList;
