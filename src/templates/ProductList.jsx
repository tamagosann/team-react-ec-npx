import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
//Cardのimport
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

//Gridのimport
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) =>({
  rootcard: {
    maxWidth: 345,
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
}));


const product ={
    productId: '0001',
    productName: 'コーヒー',
    description: 'おいしいコーヒーです',
    image: '../src/ffff',
    size: [
        {
            size: 'S',
            price: 500,
        },
        {
            size: 'M',
            price: 650,
        }
    ]
}


const CardList=()=>{
    const classes = useStyles();
  
    return (
      <Card className={classes.rootcard}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="../assets/img/coffee.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
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
    );
}

export default function ProductList() {
    return (
        <div>
        <CardList/>
        <SpacingGrid/>
        </div>
    )
}



const SpacingGrid=()=> {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

//   const handleChange = (event) => {
//     setSpacing(Number(event.target.value));
//   };

  return (
    <Grid container className={classes.rootgrid} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
        {[0, 1, 2,3,4].map((value) => (
            <Grid key={value} item xs={3}>
                        <Card className={classes.rootcard}>
                        <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="../assets/img/coffee.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
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
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
