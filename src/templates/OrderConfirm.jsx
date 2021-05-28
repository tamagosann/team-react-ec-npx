import React, { useState, useCallback, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import { PrimaryButton } from "../components/UIKit";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DateInput from '../components/UIKit/DateInput';
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
  // const inputRef = useRef(null);
  // const [inputError, setInputError] = useState(false);
  const [destinationName, setDestinationName] = useState('')
  const [destinationMail, setDestinationMail] = useState('')
  const [destinationZipcode, setDestinationZipcode] = useState('')
  const [destinationAddress, setDestinationAddress] = useState('')
  const [destinationTel, setDestinationTel] = useState('')
  const [destinationDay, setDestinationDay] = useState('')
  // DayだけuseStateに値入れても画面に反映できない
  const [destinationTime, setDestinationTime] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('');
  
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

  const destinationDayChange = useCallback((e) => {
    setDestinationDay(e.target.value);
  }, [setDestinationDay])

  const destinationTimeChange = useCallback((e) => {
    setDestinationTime(e.target.value);
  }, [setDestinationTime])

  const PaymentMethodChange = useCallback((e) => {
    setPaymentMethod(e.target.value);
  },[setPaymentMethod])

  
  return (
    <>
      <p className={classes.title}>お届け先情報</p>
      <div>お名前</div>
      <TextField
          // error={inputError}
          // // inputProps={{ pattern: "^[a-zA-Z0-9_]+$" }}
          // inputRef={inputRef}          
          // id="outlined-basic"
          // helperText={inputRef?.current?.validationMessage}
        value={ destinationName }
        onChange={destinationNameChange}
        required
      />
      <div>メールアドレス</div>
      <TextField
        // error={inputError}
        // inputProps={{ pattern: "^[a-zA-Z0-9_]+$" }}
        // inputRef={inputRef}          
        // id="outlined-basic"
        // helperText={inputRef?.current?.validationMessage}
        value={ destinationMail }
        onChange={destinationMailChange}
        required
      />

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
      
      <div>住所</div>                
        <TextField
        value={ destinationAddress }
        onChange={destinationAddressChange}
        required
      />
      
      <div>電話番号</div>
      <TextField
        value={ destinationTel }
        onChange={destinationTelChange}
        required
      />
      
      <div>配達日時</div>
      <DateInput
        value={ destinationDay }
        onChange={destinationDayChange}
        required
      />
        
      <FormControl>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={destinationTime}
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

      <p>お支払い方法</p>
      <RadioGroup
        name="paymentMethod"
        value={paymentMethod}
        onChange={PaymentMethodChange}
        required>
        <FormControlLabel value="1" control={<Radio />} label="代金引換" />
        <FormControlLabel value="2" control={<Radio />} label="クレジットカード" />
      </RadioGroup>
            
      <PrimaryButton className={classes.title}
        label={'この内容で注文する'}
        onClick={() => {}}
      />
            
    </>
  )
}

export default OrderConfirm;