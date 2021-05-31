import React, { useState, useCallback , useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
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
import { order } from '../redux/users/operations';
import { useDispatch } from 'react-redux';

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
  }
}));

const OrderConfirm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
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

  // エラーメッセージ表示用
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
    errorMessages.destinationName = '名前を入力して下さい'
  } 

  if (!destinationMail || !destinationMail.match(/\S/g)) {
    errorMessages.destinationMail = 'メールアドレスを入力して下さい'
  } else if (destinationMail.indexOf('@') === -1) {
    errorMessages.destinationMail = 'メールアドレスの形式が不正です'
  }

  if (!destinationZipcode || !destinationZipcode.match(/\S/g)) {
    errorMessages.destinationZipcode = '郵便番号を入力して下さい'
  } else if (!destinationZipcode.match(/^[0-9]{3}-[0-9]{4}$/)) {
    errorMessages.destinationZipcode = '郵便番号はXXX-XXXXの形式で入力して下さい'
  }

  if(!destinationAddress || !destinationAddress.match(/\S/g)) {
    errorMessages.destinationAddress = '住所を入力して下さい'
  }

  if (!destinationTel || !destinationTel.match(/\S/g)) {
    errorMessages.destinationTel = '電話番号を入力して下さい'
  } else if (!destinationTel.match(/\d{1,4}-\d{1,4}-\d{1,4}$/)) {
    errorMessages.destinationTel = '電話番号はXXXX-XXXX-XXXXの形式で入力して下さい'
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
    errorMessages.destinationDateTime = '配達日時を入力して下さい'
  } else if (selectedDateTime < nowDateTime) {
    errorMessages.destinationDateTime = '指定日時を既に過ぎています'
  } else if (selectedDateTime - nowDateTime < 3 * 60 * 60 * 1000) {
    errorMessages.destinationDateTime = '今から3時間以上後の日時をご入力下さい'
  }

  if (!creditCard  || !creditCard.match(/\S/g)) {
    errorMessages.creditCard = 'クレジットカード番号を入力して下さい'
  } else if (!creditCard.match(/\d{4}-\d{4}-\d{4}-\d{4}$/)) {
    errorMessages.creditCard = 'クレジットカード番号はXXXX-XXXX-XXXX-XXXXの形式で入力して下さい'
  }

  let credit

  if (!paymentMethod) {
    // 初期値に1を指定してるからありえないけどね
    errorMessages.paymentMethod = 'お支払い方法を選択して下さい'
  } else if (paymentMethod === '2') {
    credit = (
      <>
        <TextField
          label="クレジットカード番号"
          style={{ width: 250 }}
          value={ creditCard }
          onChange={ creditCardChange }
        />
        <div className={classes.error}>{ errorMessages.creditCard }</div>
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

  const cart = [
    {
      cartId: '111111',
      productId: '0001',
      productName: 'チーズケーキ',
      url: '../../unko/unko.jpg',
      productSize: 'm',
      productPrice: 300,
      quantity: 2,
      toppingId: 'aaa',
      toppingName: 'sermon 多め',
      toppingPrice: 200,
    },
    {
      cartId: '222222',
      productId: '0002',
      url: '../../unko/unko.jpg',
      productName: 'ショートケーキ',
      productSize: 'm',
      productPrice: 300,
      quantity: 2,
      toppingId: 'aaa',
      toppingName: 'sermon 多め',
      toppingPrice: 200,
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
          {SelectedItems.map((SelectedItem, index) => (
            <StyledTableRow key={index}>
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
      <TextField
        label="お名前"
        style={{ width: 250 }}
        value={destinationName}
        onChange={ destinationNameChange }
      />
      <div className={classes.error}>{ errorMessages.destinationName }</div>

      <TextField
        label="メールアドレス"
        style={{ width: 250 }}
        value={ destinationMail }
        onChange={ destinationMailChange }
      />
      <div className={classes.error}>{ errorMessages.destinationMail }</div>
          
      <TextField
        label="郵便番号"
        style={{ width: 250 }}
        id="zipcode"
        value={ destinationZipcode }
        onChange={destinationZipcodeChange}
        helperText="郵便番号を入力すると住所が表示されます"
      />
      
      <div className={classes.error}>{ errorMessages.destinationZipcode }</div>
      
      <TextField
        label="住所"
        id="address"
        fullWidth
        value={ destinationAddress }
        onChange={ destinationAddressChange }
      />
      
      <div className={classes.error}>{ errorMessages.destinationAddress }</div>

      <TextField
        label="電話番号"
        style={{ width: 250 }}
        value={ destinationTel }
        onChange={ destinationTelChange }
      />
      
      <div className={classes.error}>{errorMessages.destinationTel}</div>

      <div className={classes.labelTitle}>配達日時</div>
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
        <MenuItem value={1}>10時</MenuItem>
        <MenuItem value={2}>11時</MenuItem>
        <MenuItem value={3}>12時</MenuItem>
        <MenuItem value={4}>13時</MenuItem>
        <MenuItem value={5}>14時</MenuItem>
        <MenuItem value={6}>15時</MenuItem>
        <MenuItem value={7}>16時</MenuItem>
        <MenuItem value={8}>17時</MenuItem>
        <MenuItem value={9}>18時</MenuItem>
        <MenuItem value={10}>19時</MenuItem>
        <MenuItem value={11}>20時</MenuItem>
        {/* <MenuItem value={12}>21時</MenuItem>
        <MenuItem value={13}>22時</MenuItem>
        <MenuItem value={14}>23時</MenuItem>
        <MenuItem value={15}>24時</MenuItem>
        <MenuItem value={16}>25時</MenuItem>
        <MenuItem value={17}>26時</MenuItem>
        <MenuItem value={18}>27時</MenuItem> */}
        </Select>
      </FormControl>

      <div className={classes.error}>{errorMessages.destinationDateTime}</div>
          
      <div className={classes.labelTitle}>お支払い方法</div>
        <RadioGroup
          SelectedItem
          row
          name="paymentMethod"
          value={ paymentMethod }
          onChange={PaymentMethodChange}
        >
        <FormControlLabel value="1" control={<Radio />} label="代金引換" />
        <FormControlLabel value="2" control={<Radio />} label="クレジットカード" />
        
        </RadioGroup>
      <div className={classes.error}>{errorMessages.paymentMethod}</div>
      
      {/* クレジットカードが選択された時だけカード番号入力欄を表示 */}
      { credit }
 
      </Paper>
      <div className="text-center">

        {/* 元の注文ボタンを一応残しときます  */}
        {/* <PrimaryButton className={classes.title}
        label={'この内容で注文する'}
        onClick={() => dispatch(order(cart, destinationName, destinationMail,
        destinationZipcode, destinationAddress, destinationTel,
        destinationDate, destinationTime, paymentMethod, creditCard, history
        ))}
        /> */}
            
        <Button
          className={classes.title}
          variant="contained"
          color="primary"
          // === バリデーションをクリアしないと注文ボタンが押せないのが煩わしければ
          // disabled={ }をコメントアウトしてね！ ===   
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
          )),link('/order/complete')]}
        >
          この内容で注文する
        </Button>
      </div>
    
    </Container>   
    </>
  )
}

export default OrderConfirm;