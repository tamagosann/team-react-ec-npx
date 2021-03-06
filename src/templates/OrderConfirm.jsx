import React, { useState, useCallback , useEffect, useMemo } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';
// import { PrimaryButton } from "../components/UIKit";
import { SecondaryButton } from '../components/UIKit';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import { Container, Paper, Select, MenuItem } from '@material-ui/core';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { order, removeFromCart } from '../redux/users/operations';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsInCart, getUid } from '../redux/users/selectors';
import { getProducts } from '../redux/products/selectors';

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  title: {
    margin: '20px 0',
  },
    addressbutton: {
    margin: '0 20px'
  },
  table: {
    minWidth: 700,
  },
  labelTitle: {
    marginTop: theme.spacing(2),
    color: '#696969'
  },
  error: {
    color: '#f44336',
    fontSize: '15px'
  },
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

const OrderConfirm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const link = useCallback((path) => {
    history.push(path)
  },[history]);
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const cart = getProductsInCart(selector);
  const uid = getUid(selector);
  const productsList = getProducts(selector);

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

  const [destinationName, setDestinationName] = useState('')
  const [destinationMail, setDestinationMail] = useState('')
  const [destinationZipcode, setDestinationZipcode] = useState('')
  const [destinationAddress, setDestinationAddress] = useState('')
  const [destinationTel, setDestinationTel] = useState('')
  const [destinationDate, setDestinationDate] = useState('')
  const [destinationTime, setDestinationTime] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('1')
  const [creditCard, setCreditCard] = useState('');
  
  useEffect(() => {
    if (destinationZipcode) {
      fetch(`https://api.zipaddress.net/?zipcode=${destinationZipcode}`, {
        mode: 'cors',
      })
        .then((result) => {
          return result.json();
        })
        .then((result) => {
          setDestinationAddress(result.data?.fullAddress || '');
        });
    }
  }, [destinationZipcode]);

  // ?????????????????????????????????
  const errorMessages = {
    destinationName: '',
    destinationMail: '',        
    destinationZipcode: '',        
    destinationAddress: '',        
    destinationTel: '',
    destinationDateTime: '',        
    paymentMethod: '',
    creditCard: ''
  }

  const destinationNameChange = useCallback((e) => {
    setDestinationName(e.target.value);
  }, [setDestinationName])

  const destinationMailChange = useCallback((e) => {
    setDestinationMail(e.target.value);
  }, [setDestinationMail])

  const destinationZipcodeChange = useCallback((e) => {
    setDestinationZipcode(e.target.value);
  }, [setDestinationZipcode])

  const destinationAddressChange = useCallback((e) => {
    setDestinationAddress(e.target.value);
  }, [setDestinationAddress])

  const destinationTelChange = useCallback((e) => {
    setDestinationTel(e.target.value);
  }, [setDestinationTel])

  const destinationDateChange = useCallback((e) => {
    setDestinationDate(e.target.value);
  }, [setDestinationDate])

  const destinationTimeChange = useCallback((e) => {
    setDestinationTime(e.target.value);
  }, [setDestinationTime])

  const PaymentMethodChange = useCallback((e) => {
    setPaymentMethod(e.target.value);
  }, [setPaymentMethod])
  
  const creditCardChange = useCallback((e) => {
    setCreditCard(e.target.value);
  },[setCreditCard])

  if (!destinationName || !destinationName.match(/\S/g)) {
    errorMessages.destinationName = '??????????????????????????????'
  } 

  if (!destinationMail || !destinationMail.match(/\S/g)) {
    errorMessages.destinationMail = '?????????????????????????????????????????????'
  } else if (destinationMail.indexOf('@') === -1) {
    errorMessages.destinationMail = '?????????????????????????????????????????????'
  }

  if (!destinationZipcode || !destinationZipcode.match(/\S/g)) {
    errorMessages.destinationZipcode = '????????????????????????????????????'
  } else if (!destinationZipcode.match(/^[0-9]{3}-[0-9]{4}$/)) {
    errorMessages.destinationZipcode = '???????????????XXX-XXXX?????????????????????????????????'
  }

  if(!destinationAddress || !destinationAddress.match(/\S/g)) {
    errorMessages.destinationAddress = '??????????????????????????????'
  }

  if (!destinationTel || !destinationTel.match(/\S/g)) {
    errorMessages.destinationTel = '????????????????????????????????????'
  } else if (!destinationTel.match(/\d{1,4}-\d{1,4}-\d{1,4}$/)) {
    errorMessages.destinationTel = '???????????????XXXX-XXXX-XXXX?????????????????????????????????'
  }

  const selectedDate = new Date(destinationDate);
  const additionTime = destinationTime * 60 * 60 * 1000;
  const makeDateTime = selectedDate.getTime() + additionTime
  const selectedDateTime = new Date(makeDateTime)
  const nowDateTime = new Date();
  // console.log(selectedDateTime)
  // console.log(nowDateTime)
  // console.log(selectedDateTime - nowDateTime)

  if (!(destinationDate && destinationTime)) {
    errorMessages.destinationDateTime = '????????????????????????????????????'
  } else if (selectedDateTime < nowDateTime) {
    errorMessages.destinationDateTime = '???????????????????????????????????????'
  } else if (selectedDateTime - nowDateTime < 3 * 60 * 60 * 1000) {
    errorMessages.destinationDateTime = '?????????3?????????????????????????????????????????????'
  }

  if (!creditCard  || !creditCard.match(/\S/g)) {
    errorMessages.creditCard = '??????????????????????????????????????????????????????'
  } else if (!creditCard.match(/\d{4}-\d{4}-\d{4}-\d{4}$/)) {
    errorMessages.creditCard = '?????????????????????????????????XXXX-XXXX-XXXX-XXXX?????????????????????????????????'
  }

  let credit

  if (!paymentMethod) {
    // ????????????1????????????????????????????????????????????????
    errorMessages.paymentMethod = '??????????????????????????????????????????'
  } else if (paymentMethod === '2') {
    credit = (
      <>
        <TextField
          label="??????????????????????????????"
          style={{ width: 250 }}
          value={ creditCard }
          onChange={ creditCardChange }
        />
        <div className={classes.error}>{ errorMessages.creditCard }</div>
      </>
    )
  }

  return (
    <>
    <Container>
    {cart.length > 0 && (
        <Table
          aria-label="customized table"
          style={{ padding: 20, marginTop: 40}}
          className={classes.container}
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">??????</StyledTableCell>
              <StyledTableCell align="center">??????</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((SelectedItem) => (
              <StyledTableRow key={SelectedItem.cartId}>
                <StyledTableCell component="th" scope="SelectedItem">
                  <img src={SelectedItem.url} alt="????????????" style={{ width: 200 }} />
                  <br />
                  <Typography>
                    {SelectedItem.productName}
                  </Typography>
                </StyledTableCell>

                <StyledTableCell align="right">
                  <TableRow>
                    <StyledTableCell>?????????</StyledTableCell>
                    <StyledTableCell align="right">
                      {SelectedItem.productSize}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {SelectedItem.productPrice}???
                    </StyledTableCell>
                  </TableRow>

                  <TableRow>
                    <StyledTableCell>??????</StyledTableCell>
                    <StyledTableCell align="right">
                      {SelectedItem.quantity}
                    </StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                  </TableRow>

                  <TableRow>
                    <StyledTableCell>???????????????</StyledTableCell>
                    <StyledTableCell align="right">
                      {SelectedItem.toppingName}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {SelectedItem.toppingPrice}???
                    </StyledTableCell>
                  </TableRow>

                  <TableRow>
                    <StyledTableCell>??????</StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                      <StyledTableCell align="right">
                        {((SelectedItem.productPrice * SelectedItem.quantity) +
                          (SelectedItem.toppingPrice * SelectedItem.quantity)).toLocaleString()}
                        ???
                      </StyledTableCell>
                  </TableRow>
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
                ???????????? { Math.floor(sum * 0.1).toLocaleString() }???
              </h1>
              <h1 align="center">
                ?????????????????????:
                {Math.floor(sum * 1.1).toLocaleString()}???(??????)
              </h1>
            </>
          )}
          { cart.length === 0 && (
            <div className="text-center">???????????????????????????????????????</div>
          )}
        </Paper>
        
      {/* =================??????????????????================= */}

      <Paper variant="outlined" component="div" style={{ padding: 20, marginTop: 40,}}>
      <h2 className="product-h2">??????????????????</h2>
      <TextField
        label="?????????"
        style={{ width: 250 }}
        value={destinationName}
        onChange={ destinationNameChange }
      />
      <div className={classes.error}>{ errorMessages.destinationName }</div>

      <TextField
        label="?????????????????????"
        style={{ width: 250 }}
        value={ destinationMail }
        onChange={ destinationMailChange }
      />
      <div className={classes.error}>{ errorMessages.destinationMail }</div>
          
      <TextField
        label="????????????"
        style={{ width: 250 }}
        id="zipcode"
        value={ destinationZipcode }
        onChange={destinationZipcodeChange}
        helperText="?????????????????????????????????????????????????????????"
      />
      
      <div className={classes.error}>{ errorMessages.destinationZipcode }</div>
      
      <TextField
        label="??????"
        id="address"
        fullWidth
        style={{maxWidth: 500}}
        value={ destinationAddress }
        onChange={ destinationAddressChange }
      />
      
      <div className={classes.error}>{ errorMessages.destinationAddress }</div>

      <TextField
        label="????????????"
        style={{ width: 250 }}
        value={ destinationTel }
        onChange={ destinationTelChange }
      />
      
      <div className={classes.error}>{errorMessages.destinationTel}</div>

      <div className={classes.labelTitle}>????????????</div>
      <TextField
        style={{ width: 180 }}
        type="date"
        value={ destinationDate }
        onChange={ destinationDateChange }
      />
        
      <FormControl>
        <Select
          style={{ width: 70 }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={ destinationTime }
          onChange={ destinationTimeChange }
        >
        <MenuItem value={1}>10???</MenuItem>
        <MenuItem value={2}>11???</MenuItem>
        <MenuItem value={3}>12???</MenuItem>
        <MenuItem value={4}>13???</MenuItem>
        <MenuItem value={5}>14???</MenuItem>
        <MenuItem value={6}>15???</MenuItem>
        <MenuItem value={7}>16???</MenuItem>
        <MenuItem value={8}>17???</MenuItem>
        <MenuItem value={9}>18???</MenuItem>
        <MenuItem value={10}>19???</MenuItem>
        <MenuItem value={11}>20???</MenuItem>
        {/* <MenuItem value={12}>21???</MenuItem>
        <MenuItem value={13}>22???</MenuItem>
        <MenuItem value={14}>23???</MenuItem>
        <MenuItem value={15}>24???</MenuItem>
        <MenuItem value={16}>25???</MenuItem>
        <MenuItem value={17}>26???</MenuItem>
        <MenuItem value={18}>27???</MenuItem> */}
        </Select>
      </FormControl>

      <div className={classes.error}>{errorMessages.destinationDateTime}</div>
          
      <div className={classes.labelTitle}>??????????????????</div>
        <RadioGroup
          SelectedItem
          row
          name="paymentMethod"
          value={ paymentMethod }
          onChange={PaymentMethodChange}
        >
        <FormControlLabel value="1" control={<Radio />} label="????????????" />
        <FormControlLabel value="2" control={<Radio />} label="????????????????????????" />
        
        </RadioGroup>
      <div className={classes.error}>{errorMessages.paymentMethod}</div>
      
      {/* ???????????????????????????????????????????????????????????????????????????????????? */}
      { credit }
 
      </Paper>
      <div className="text-center">

        {/* ????????????????????????????????????????????????  */}
        {/* <PrimaryButton className={classes.title}
        label={'???????????????????????????'}
        onClick={() => dispatch(order(cart, destinationName, destinationMail,
        destinationZipcode, destinationAddress, destinationTel,
        destinationDate, destinationTime, paymentMethod, creditCard, history
        ))}
        /> */}
            
        <Button
          className={classes.title}
          variant="contained"
          color="primary"
          // === ???????????????????????????????????????????????????????????????????????????????????????????????????
          // disabled={ }???????????????????????????????????? ===   
          disabled=
            { errorMessages.destinationName !== '' ||
              errorMessages.destinationMail !== '' ||    
              errorMessages.destinationZipcode !== '' ||      
              errorMessages.destinationAddress !== '' ||      
              errorMessages.destinationTel !== '' ||
              errorMessages.destinationDateTime !== '' ||     
              errorMessages.paymentMethod !=='' ||
              (errorMessages.creditCard !=='' && paymentMethod === '2' )
            }
          onClick={() => [dispatch(order(cart, destinationName, destinationMail,
            destinationZipcode, destinationAddress, destinationTel,
            destinationDate, destinationTime, paymentMethod, creditCard, history
          ))]}
        >
          ???????????????????????????
        </Button>
      </div>
    
    </Container>   
    </>
  )
}

export default OrderConfirm;