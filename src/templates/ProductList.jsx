import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useEffect} from 'react';
//Cardのimport
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//Gridのimport
import Grid from '@material-ui/core/Grid';
//TextFieldのimport
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
// //お気に入りボタンのimport
// import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

//firebaseのimport
import firebase from 'firebase';

import {useHistory} from 'react-router-dom';
import {ProductDetail} from './ProductDetail'

import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) =>({
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
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  rootsearch: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 400,
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
    underline: 'none',
  }

}));  
const products=[]
const db =()=>{
  const small=firebase.firestore().collection('products').doc('FeKpGj7gUgt7dvFmbWIU').collection('parentProducts')
  small.get().then(snapshot => snapshot.forEach(doc => products.push({ ...doc.data(),productId:doc.id})))
  console.log(products)
}

// const products = [
//     {productId:1,productName:'コーヒー０',size:[{size:'M',price:480},{size:'L',price:700}], img:'1.jpg'},
//     {productId:2,productName:'コーヒー１',size:[{size:'M',price:480},{size:'L',price:700}], img:'1.jpg'},
//     {productId:3,productName:'コーヒー２',size:[{size:'M',price:480},{size:'L',price:700}], img:'1.jpg'},
//     {productId:4,productName:'コーヒー３',size:[{size:'M',price:480},{size:'L',price:700}], img:'1.jpg'},
//     {productId:5,productName:'コーヒー4',size:[{size:'M',price:480},{size:'L',price:700}], img:'1.jpg'},
//     {productId:6,productName:'コーヒー5',size:[{size:'M',price:480},{size:'L',price:700}], img:'1.jpg'},
//     {productId:7,productName:'コーヒー6',size:[{size:'M',price:480},{size:'L',price:700}], img:'1.jpg'},
//     {productId:8,productName:'コーヒー7',size:[{size:'M',price:480},{size:'L',price:700}], img:'1.jpg'},
//     {productId:9,productName:'コーヒー8',size:[{size:'M',price:480},{size:'L',price:700}], img:'1.jpg'},
//     {productId:10,productName:'コーヒー9',size:[{size:'M',price:480},{size:'L',price:700}], img:'1.jpg'},
//     {productId:11,productName:'コーヒー10',size:[{size:'M',price:480},{size:'L',price:700}], img:'1.jpg'},
//     {productId:12,productName:'コーヒー11',size:[{size:'M',price:480},{size:'L',price:700}], img:'1.jpg'},
//     {productId:13,productName:'コーヒー12',size:[{size:'M',price:480},{size:'L',price:700}], img:'1.jpg'},
//     {productId:14,productName:'Gコーヒー13',size:[{size:'M',price:480},{size:'L',price:700}], img:'1.jpg'},
//     {productId:15,productName:'コーヒー14',size:[{size:'M',price:480},{size:'L',price:700}], img:'1.jpg'},
//     {productId:16,productName:'コーヒー15',size:[{size:'M',price:480},{size:'L',price:700}], img:'1.jpg'},
//     {productId:17,productName:'コーヒー16',size:[{size:'M',price:480},{size:'L',price:700}], img:'1.jpg'},
//     {productId:18,productName:'コーヒー17',size:[{size:'M',price:480},{size:'L',price:700}], img:'1.jpg'}
// ]



const ProductList=()=> {
  // const [spacing, setSpacing] = React.useState(2);

  const classes = useStyles();
  useEffect(()=>{
    db()
  })
  const history =useHistory();
  const handleLink= path =>history.push(path);
  
  return (
      <>
      {/* <button onClick={db()}>商品読み込み</button> */}
        <Paper component="form" className={classes.rootsearch} >
            <InputBase
                className={classes.input}
                placeholder="入力してください"
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                <DirectionsIcon />
            </IconButton>
        </Paper>
        {/* <Router> */}
    {/* <Grid container className={classes.rootgrid} spacing={2}>
      <Grid item xs={15}> */}
        <Grid container justify="center" spacing={0} className={classes.rootgrid}>
        {products.map((product,value) => (
            <Grid key={value} item xs={8} sm={4} className={classes.control}>
              {/* <Link to={`/ProductDetail/${product.productId}`} className={classes.links}> */}
                        <Card className={classes.rootcard} >
                        <CardActionArea onClick={()=>handleLink(`/productdetail/${product.productId}`)}>
                        <CardMedia
                            className={classes.media}
                            image="https://img.cpcdn.com/recipes/4911988/800x800c/aa46163e885ab2571f2e3e70afb0ff6f?u=15300935&p=1518681059"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h1">
                            {product.productName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {product.size[0].size} {product.size[0].price}円
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            {product.size[1].size} {product.size[1].price}円
                            </Typography>
                        </CardContent>
                        </CardActionArea>
                    </Card>
               {/* </Link> */}
            </Grid>
          ))}
        </Grid>
      {/* </Grid>
    </Grid> */}
    {/* <Switch>
      <Route path='/ProductDetail/:productId' component={ProductDetail}></Route>
    </Switch>
    </Router> */}
    </>
  );
}
export default ProductList;
