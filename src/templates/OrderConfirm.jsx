import React from 'react';
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
    margin: 50,
    fontsize: 100,
  }
}));

// const theme = {
//   spacing: 8,
// }

const OrderConfirm = () => {
  // const [name, setCount] = useState("")
  const classes = useStyles();
  // const [age, setAge] = React.useState('');
  
    return (
    <>
        <p className={classes.title}>お届け先情報</p>
        <div>お名前</div>
        <TextField
          defaultValue=""
        />
        <div>メールアドレス</div>
        <TextField
          defaultValue=""
        />
        <div>郵便番号</div>
        <TextField
          defaultValue=""
        />
        <PrimaryButton
            label={'住所検索'}
            onClick={() => {}}
        />
        <div>住所</div>                
        <TextField
          defaultValue=""
        />
        <div>電話番号</div>
        <TextField
          defaultValue=""
        />
        <div>配達日時</div>
        <DateInput
        />
        
        <FormControl className={classes.formControl}>
          {/* <InputLabel id="demo-simple-select-label">時刻</InputLabel> */}
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            // onChange={handleChange}
          >
            <MenuItem value={10}>10時</MenuItem>
            <MenuItem value={11}>11時</MenuItem>
            <MenuItem value={12}>12時</MenuItem>
            <MenuItem value={13}>13時</MenuItem>
            <MenuItem value={14}>14時</MenuItem>
            <MenuItem value={15}>15時</MenuItem>
            <MenuItem value={16}>16時</MenuItem>
            <MenuItem value={17}>17時</MenuItem>
            <MenuItem value={18}>18時</MenuItem>
          </Select>
        </FormControl>
        <h3>お支払い方法</h3>
        <RadioGroup name="paymentMethod">
            <FormControlLabel value="代金引換" control={<Radio />} label="代金引換" />
            <FormControlLabel value="クレジットカード" control={<Radio />} label="クレジットカード" />
        </RadioGroup>
            
        <PrimaryButton 
            label={'この内容で注文する'}
            onClick={() => {}}
        />
            
    </>
    )
}

export default OrderConfirm;