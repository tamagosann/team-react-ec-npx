import React, { useState, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import { PrimaryButton } from "../components/UIKit";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import DateInput from '../components/UIKit/DateInput';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

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
  }
}));

const OrderConfirm = () => {

  const classes = useStyles();
  const [destinationName, setDestinationName] = useState('')
  const [destinationMail, setDestinationMail] = useState('')
  const [destinationZipcode, setDestinationZipcode] = useState('')
  const [destinationAddress, setDestinationAddress] = useState('')
  const [destinationTel, setDestinationTel] = useState('')
  const [destinationDate, setDestinationDate] = useState('')
  const [destinationTime, setDestinationTime] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('');
  
  const errorMessages = {
        destinationName: '',
        destinationMail: '',
        destinationZipcode:'',
        destinationAddress:'',
        destinationTel: '',
        destinationDateTime:'',
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
  },[setPaymentMethod])

  const selectedDate = new Date(destinationDate);
  // const selectedDateYear = selectedDate.getFullYear();
  // const selectedDateMonth = selectedDate.getMonth() + 1;
  // const selectedDateDay = selectedDate.getDate();
  const nowDateTime = new Date();
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
  } else if (!destinationZipcode.match(/^\d{3}-?\d{4}$/)) {
    errorMessages.destinationZipcode = '郵便番号はXXX-XXXXの形式で入力してください'
  }

  if(!destinationAddress) {
    errorMessages.destinationAddress = '住所を入力してください'
  }

  if (!destinationTel) {
    errorMessages.destinationTel = '電話番号を入力して下さい'
  } else if (!destinationTel.match(/\d{1,4}-\d{1,4}-\d{3,4}$/)) {
    errorMessages.destinationTel = '電話番号はXXXX-XXXX-XXXXの形式で入力してください'
  }

  if (!(destinationDate && destinationTime)) {
    errorMessages.destinationDateTime = '配達日時を入力して下さい'
  }

  if(!paymentMethod) {
    errorMessages.paymentMethod = 'お支払い方法を選択してください'
  }

  return (
    <>
      <p className={classes.title}>お届け先情報</p>
      <div>お名前</div>
      <TextField
        value={destinationName}
        onChange={destinationNameChange}
        required
      />
      <span>{ errorMessages.destinationName }</span>

      <div>メールアドレス</div>
      <TextField
        value={ destinationMail }
        onChange={destinationMailChange}
        required
      />
      <span>{ errorMessages.destinationMail }</span>

      <div>郵便番号</div>
      <TextField
        value={ destinationZipcode }
        onChange={destinationZipcodeChange}
        required
      />
      
      <PrimaryButton
        label={'住所検索'}
        onClick={() => { }}
        className={classes.addressbutton}
      />
      
      <span>{errorMessages.destinationZipcode}</span>
      
      <div>住所</div>                
        <TextField
        value={ destinationAddress }
        onChange={destinationAddressChange}
        required
      />
      
      <span>{errorMessages.destinationAddress}</span>

      <div>電話番号</div>
      <TextField
        value={ destinationTel }
        onChange={destinationTelChange}
        required
      />
      
      <span>{errorMessages.destinationTel}</span>

      <div>配達日時</div>
      <TextField
            // fullWidth={props.fullWidth}
            // margin='dense'
            // label={props.label}
            type="date"
            // required={props.required}
            // defaultValue={}
            // InputLabelProps={{
            //     shrink: true,
            // }}
            value={destinationDate}
            onChange={destinationDateChange}
      />
      {/* <DateInput
        value={ destinationDate }
        onChange={destinationDateChange}
        required
      /> */}
        
      <FormControl>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={ destinationTime }
          onChange={destinationTimeChange}
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

      <p>お支払い方法</p>
      <RadioGroup
        name="paymentMethod"
        value={paymentMethod}
        onChange={PaymentMethodChange}
        required>
        <FormControlLabel value="1" control={<Radio />} label="代金引換" />
        <FormControlLabel value="2" control={<Radio />} label="クレジットカード" />
        <span>{errorMessages.paymentMethod}</span>
      </RadioGroup>
      
            
      <PrimaryButton className={classes.title}
        label={'この内容で注文する'}
        onClick={() => {}}
      />
            
    </>
  )
}

export default OrderConfirm;