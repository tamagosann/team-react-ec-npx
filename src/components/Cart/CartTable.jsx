import React, {useEffect} from 'react';
// materialUI
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// store
import {useSelector, useDispatch} from 'react-redux'
import {fetchProducts} from '../../redux/products/operations'
import initialState from '../../redux/store/initialState'
import PrimaryButton from '../UIKit/PrimaryButton'
// firebase
import {auth, db, storage, functions, FirebaseTimestamp} from '../../firebase/index'
import firebase from 'firebase'



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '40px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const id = firebase.firestore().collection('products').doc().id
console.log(id);


const CartTable = () => {
    useEffect(() => {
        // firebase.firestore().collection('products').doc('5unFVBaSixcjnr52mYUS').set({id: 1, name: 'oranges'})
    })
    
    const setInfo = () => {
        firebase.firestore().collection('products/sample/sampleSubCollection').add({title: 'setメソッドを使用', id: '自動発行'})
    }
    const dataArray = []
    
    
    let data = ''
    const showInfo = () => {
        const info = firebase.firestore().collection('products').doc('FeKpGj7gUgt7dvFmbWIU').collection('parentProducts')

        info.get().then(snapshot => snapshot.forEach(doc => dataArray.push(doc.data())))
        console.log(dataArray);
        console.log(dataArray[0]);
        console.log(dataArray.length);
        // dataArray.map(data => console.log(data.productName))
        

        // info.get().then(snapshot => snapshot.docs.forEach(doc => dataArray.push(doc.data())))    
        // console.log(dataArray);

        // const newArray = info.get().then(snapshot => console.log(snapshot.docs[0].data()))  
        // console.log(newArray);

        // info.get().then(snapshot => console.log(snapshot.docs))
       



        // info.docs().get().then(snapshot => console.log(snapshot)
        // )   
            
    }
    

    const productList = useSelector(state => state.products.productsList)
    productList.map(list => console.log(list))

    const isSignedIn = useSelector(state => state.users.isSignedIn)
    const list = useSelector(state => state.products.list)
    
    // console.log(isSignedIn);
    // console.log(list);

    const classes = useStyles()
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <React.Fragment>
        <Typography variant="body2" color="textSecondary" component="p">
            <PrimaryButton label='show info' onClick={() => showInfo()}></PrimaryButton>
        </Typography>
            <ul>
            {dataArray.length ?
                 <div>dataArrayにはデータが入っています</div>
                /* {dataArray.map(data => (
                    <React.Fragment>
                        <li>{data.productName}</li>
                    </React.Fragment>
                ))} */
            : 
                <div>何もありません</div>
            }
            </ul>

        {/* <h1>Cart List</h1>
        {productList.map(list => 

         <Card className={classes.root}>
            <CardHeader
                avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                    R
                </Avatar>
                }
                action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                }
                title={list.productName}
                // subheader="September 14, 2016"
            />
            <CardMedia
                className={classes.media}
                src="/static/images/cards/paella.jpg"
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                {list.description}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                サイズ：{list.size[0].size} / 値段：{list.size[0].price}円
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                サイズ：{list.size[1].size} / 値段：{list.size[1].price}円
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                <PrimaryButton label='削除' onClick={() => setInfo()}></PrimaryButton>
                <PrimaryButton label='set info' onClick={() => setInfo()}></PrimaryButton>
                <PrimaryButton label='show info' onClick={() => showInfo()}></PrimaryButton>
                </Typography>
            </CardContent>

            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                <ShareIcon />
                </IconButton>
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
                <CardContent>
                <Typography paragraph>
                    コーヒーの説明です
                </Typography>
                </CardContent>
            </Collapse>

        </Card>
        )} */}
    </React.Fragment>


    )
}

export default CartTable;