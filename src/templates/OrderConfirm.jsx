import React, { useState, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import { PrimaryButton } from "../components/UIKit";
import { SecondaryButton } from '../components/UIKit';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import { Container, Paper, Select, MenuItem } from '@material-ui/core';
import {Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

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
  }
}));

const OrderConfirm = () => {
  const history = useHistory();
  const link = useCallback((path) => {
    history.push(path)
  },[history]);

  const classes = useStyles();
  const [destinationName, setDestinationName] = useState('')
  const [destinationMail, setDestinationMail] = useState('')
  const [destinationZipcode, setDestinationZipcode] = useState('')
  const [destinationAddress, setDestinationAddress] = useState('')
  const [destinationTel, setDestinationTel] = useState('')
  const [destinationDate, setDestinationDate] = useState('')
  const [destinationTime, setDestinationTime] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [creditCard, setCreditCard] = useState('');
  
  // エラーメッセージ表示用
  const errorMessages = {
    destinationName: '',
    destinationMail: '',        
    destinationZipcode: '',        
    destinationAddress: '',        
    destinationTel: '',
    destinationDateTime: '',        
    paymentMethod: ''
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

  // const selectedDate = new Date(destinationDate);
  // const selectedDateYear = selectedDate.getFullYear();
  // const selectedDateMonth = selectedDate.getMonth() + 1;
  // const selectedDateDay = selectedDate.getDate();
  // const nowDateTime = new Date();
  // const nowDateTimeYear = nowDateTime.getFullYear();
  // const nowDateTimeMonth = nowDateTime.getMonth() + 1;
  // const nowDateTimeDay = nowDateTime.getDate();
  // const nowDateTimeHours = nowDateTime.getHours();

  // console.log(destinationDate)
  // console.log(selectedDate)
  // console.log(nowDateTime)

  // console.log('=============')
  // console.log(destinationDate)
  // console.log(destinationTime)
  // console.log(paymentMethod)

  if (!destinationName) {
    errorMessages.destinationName = '名前を入力してください'
  }

  if (!destinationMail) {
    errorMessages.destinationMail = 'メールアドレスを入力してください'
  } else if (destinationMail.indexOf('@') === -1) {
    errorMessages.destinationMail = 'メールアドレスの形式が不正です'
  }

  if (!destinationZipcode) {
    errorMessages.destinationZipcode = '郵便番号を入力してください'
  } else if (!destinationZipcode.match(/^[0-9]{3}-[0-9]{4}$/)) {
    errorMessages.destinationZipcode = '郵便番号はXXX-XXXXの形式で入力してください'
  }

  if(!destinationAddress) {
    errorMessages.destinationAddress = '住所を入力してください'
  }

  if (!destinationTel) {
    errorMessages.destinationTel = '電話番号を入力して下さい'
  } else if (!destinationTel.match(/\d{1,4}-\d{1,4}-\d{1,4}$/)) {
    errorMessages.destinationTel = '電話番号はXXXX-XXXX-XXXXの形式で入力してください'
  }

  if (!(destinationDate && destinationTime)) {
    errorMessages.destinationDateTime = '配達日時を入力して下さい'
  }

  let credit

  if(!paymentMethod) {
    errorMessages.paymentMethod = 'お支払い方法を選択してください'
  } else if (paymentMethod === '2') {
    credit = (
    <>
    <div className={classes.labelTitle}>クレジットカード番号</div>
      <TextField
        value={ creditCard }
        onChange={ creditCardChange }
        required
      />
    </>
    )
  }

  const SelectedItems = [
    {
      url:'https://firebasestorage.googleapis.com/v0/b/team-react-ec-npx.appspot.com/o/16.jpg?alt=media&token=fc210a54-369b-4689-bddd-6ff069d8147c',
      name:'商品1',
      productSize:'S',
      productPrice: 400,
      topping: 'ミルクM',
      toppingPrice: 300
    },
    {
      url:'https://firebasestorage.googleapis.com/v0/b/team-react-ec-npx.appspot.com/o/16.jpg?alt=media&token=fc210a54-369b-4689-bddd-6ff069d8147c',
      name:'商品2',
      productSize:'M',
      productPrice: 600,
      topping: '蜂蜜S',
      toppingPrice: 200
    },
    {
    url:'https://firebasestorage.googleapis.com/v0/b/team-react-ec-npx.appspot.com/o/16.jpg?alt=media&token=fc210a54-369b-4689-bddd-6ff069d8147c',
    name:'商品3',
    productSize:'S',
    productPrice: 500,
    topping: 'ホイップM',
    toppingPrice: 300
    },
  ];

  return (
    <>
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
          {SelectedItems.map((SelectedItem) => (
            <StyledTableRow key={SelectedItem.index}>
              <StyledTableCell component="th" scope="SelectedItem">
                <img src={SelectedItem.url} alt="" style={{width:100}}/>
                <br/>
                {SelectedItem.name}
              </StyledTableCell>

              <StyledTableCell align="right">         
                    <TableRow>
                      <StyledTableCell >サイズ</StyledTableCell>
                  <StyledTableCell align="right">{ SelectedItem.productSize }</StyledTableCell>
                  <StyledTableCell align="right">{ SelectedItem.productPrice }円</StyledTableCell>
                  </TableRow>
                  <TableRow>
                      <StyledTableCell>トッピング</StyledTableCell>
                  <StyledTableCell align="right">{ SelectedItem.topping }</StyledTableCell>
                  <StyledTableCell align="right">{ SelectedItem.toppingPrice }円</StyledTableCell>
                  </TableRow>
                  <TableRow>
                      <StyledTableCell>小計</StyledTableCell>
                      <StyledTableCell align="right"></StyledTableCell>
                  <StyledTableCell align="right">{ SelectedItem.productPrice + SelectedItem.toppingPrice }円</StyledTableCell>
                  </TableRow>
              </StyledTableCell>

              <StyledTableCell align="right">
                <SecondaryButton
                  label={'削除'}
                  onClick={() => {}}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        </Table>
        
      {/* =================合計金額================= */}

      <Paper variant="outlined" component="div" style={{ padding: 20, marginTop: 40, }}>
        <h1 align="center">
          消費税： { Math.floor(5000 * 0.1).toLocaleString() }円
        </h1>
        <h1 align="center">
          ご注文合計金額:
          { Math.floor(5000 * 1.1).toLocaleString() }円(税込)
        </h1>    
        </Paper>
        
      {/* =================お届け先情報================= */}

      <Paper variant="outlined" component="div" style={{ padding: 20, marginTop: 40,}}>
      <h2 className="product-h2">お届け先情報</h2>
      <div className={classes.labelTitle}>お名前</div>
      <TextField
        value={destinationName}
        onChange={ destinationNameChange }
        required
      />
      <span>{ errorMessages.destinationName }</span>

      <div className={classes.labelTitle}>メールアドレス</div>
      <TextField
        value={ destinationMail }
        onChange={ destinationMailChange }
        required
      />
      <span>{ errorMessages.destinationMail }</span>

      <div className={classes.labelTitle}>郵便番号</div>
      <TextField
        value={ destinationZipcode }
        onChange={ destinationZipcodeChange }
        required
      />
      
      <PrimaryButton
        label={'住所検索'}
        onClick={() => { }}
        className={classes.addressbutton}
      />
      
      <span>{ errorMessages.destinationZipcode }</span>
      
      <div className={classes.labelTitle}>住所</div>                
      <TextField
        fullWidth
        value={ destinationAddress }
        onChange={ destinationAddressChange }
        required
      />
      
      <span>{ errorMessages.destinationAddress }</span>

      <div className={classes.labelTitle}>電話番号</div>
      <TextField
        value={ destinationTel }
        onChange={ destinationTelChange }
        required
      />
      
      <span>{errorMessages.destinationTel}</span>

      <div className={classes.labelTitle}>配達日時</div>
      <TextField
        type="date"
        value={ destinationDate }
        onChange={ destinationDateChange }
      />
        
      <FormControl>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={ destinationTime }
          onChange={ destinationTimeChange }
          required
        >
          <MenuItem value="10">10時</MenuItem>
          <MenuItem value="11">11時</MenuItem>
          <MenuItem value="12">12時</MenuItem>
          <MenuItem value="13">13時</MenuItem>
          <MenuItem value="14">14時</MenuItem>
          <MenuItem value="15">15時</MenuItem>
          <MenuItem value="16">16時</MenuItem>
          <MenuItem value="17">17時</MenuItem>
          <MenuItem value="18">18時</MenuItem>
        </Select>
      </FormControl>

      <span>{errorMessages.destinationDateTime}</span>
          
      <div className={classes.labelTitle}>お支払い方法</div>
      <RadioGroup SelectedItem
        name="paymentMethod"
        value={ paymentMethod }
        onChange={ PaymentMethodChange }
        required>
        <FormControlLabel value="1" control={<Radio />} label="代金引換" />
        <FormControlLabel value="2" control={<Radio />} label="クレジットカード" />
        <span>{errorMessages.paymentMethod}</span>
      </RadioGroup>
        
      { credit }

      </Paper>

      <PrimaryButton className={classes.title}
      label={'この内容で注文する'}
      onClick={() => link('/order/complete')}
      />
    
    </Container>   
    </>
  )
}

export default OrderConfirm;