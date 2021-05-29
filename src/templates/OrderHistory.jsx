import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import CardMedia from '@material-ui/core/CardMedia';

//acorditionのimport
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

//buttonのimport
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const useStyles = makeStyles((theme) => ({
  position:{
      align:'center'
  },
  table: {
    minWidth: 500,
  },
  media: {
    width: 130,
    height: 100,
  },
  rootpaper: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(5),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  rootacording: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  button: {
    margin: theme.spacing(1),
  },
  red:{
      color:'red'
  },
  message: {
    fontWeight: 'bold',
    fontSize: '20px',
    position: 'relative',
  },

}));  

const orders= [
    {
        uid: '1122334455',
        orderId: 'abcdefg',
        product : {
            productName:'エスプレッソ',
            productId: '0001',
            productSize: 'M',
            quantity: 2,
            choseToppings: 
                {//priceは、amountで合計金額出すからいらなそうじゃないかあああ？
                    toppingId: 'aaa',
                    toppingName: 'onion',
                    topppingsize: 'M',
                },//トッピングの数だけこのオブジェクトが続く
            amount: 700, //ここは、注文するときに計算して値を入れる。
        },
        status: 0,
        orderDate: '2021-05-04',
        destinationName: '相澤',
        destinationZipcode: '111-1111',
        destinationAddress: '東京都新宿区',
        destinationTel: '090-8888-8888',
        destinationTime: '2021-05-10',
        paymentMethod: 1,
        creditCardNo: '1111-1111-1111-1111',
    },
    {
        uid: '1122334455',
        orderId: 'has',
        product : {
            productName:'エスプレッソ',
            productId: '0001',
            productSize: 'M',
            quantity: 2,
            choseToppings: 
                {//priceは、amountで合計金額出すからいらなそうじゃないかあああ？
                    toppingId: 'aaa',
                    toppingName: 'onion',
                    topppingsize: 'M',
                },//トッピングの数だけこのオブジェクトが続く
            amount: 700, //ここは、注文するときに計算して値を入れる。
        },
        status: 1,
        orderDate: '2021-05-04',
        destinationName: '相澤',
        destinationZipcode: '111-1111',
        destinationAddress: '東京都新宿区',
        destinationTel: '090-8888-8888',
        destinationTime: '2021-05-10',
        paymentMethod: 1,
        creditCardNo: '1111-1111-1111-1111',
    },
    {
        uid: '1122334455',
        orderId: 'dfe',
        product : {
            productName:'エスプレッソ',
            productId: '0001',
            productSize: 'M',
            quantity: 2,
            choseToppings: 
                {//priceは、amountで合計金額出すからいらなそうじゃないかあああ？
                    toppingId: 'aaa',
                    toppingName: 'onion',
                    topppingsize: 'M',
                },//トッピングの数だけこのオブジェクトが続く
            amount: 700, //ここは、注文するときに計算して値を入れる。
        },
        status: 2,
        orderDate: '2021-05-04',
        destinationName: '相澤',
        destinationZipcode: '111-1111',
        destinationAddress: '東京都新宿区',
        destinationTel: '090-8888-8888',
        destinationTime: '2021-05-10',
        paymentMethod: 1,
        creditCardNo: '1111-1111-1111-1111',
    },
    {
        uid: '1122334455',
        orderId: 'jfs',
        product : {
            productName:'エスプレッソ',
            productId: '0001',
            productSize: 'M',
            quantity: 2,
            choseToppings: 
                {//priceは、amountで合計金額出すからいらなそうじゃないかあああ？
                    toppingId: 'aaa',
                    toppingName: 'onion',
                    topppingsize: 'M',
                },//トッピングの数だけこのオブジェクトが続く
            amount: 700, //ここは、注文するときに計算して値を入れる。
        },
        status: 3,
        orderDate: '2021-05-04',
        destinationName: '相澤',
        destinationZipcode: '111-1111',
        destinationAddress: '東京都新宿区',
        destinationTel: '090-8888-8888',
        destinationTime: '2021-05-10',
        paymentMethod: 1,
        creditCardNo: '1111-1111-1111-1111',
    },
    {
        uid: '1122334455',
        orderId: 'ufv',
        product : {
            productName:'エスプレッソ',
            productId: '0001',
            productSize: 'M',
            quantity: 2,
            choseToppings: 
                {//priceは、amountで合計金額出すからいらなそうじゃないかあああ？
                    toppingId: 'aaa',
                    toppingName: 'onion',
                    topppingsize: 'M',
                },//トッピングの数だけこのオブジェクトが続く
            amount: 700, //ここは、注文するときに計算して値を入れる。
        },
        status: 9,
        orderDate: '2021-05-04',
        destinationName: '相澤',
        destinationZipcode: '111-1111',
        destinationAddress: '東京都新宿区',
        destinationTel: '090-8888-8888',
        destinationTime: '2021-05-10',
        paymentMethod: 1,
        creditCardNo: '1111-1111-1111-1111',
    },
]

const OrderHistory=()=> {
  const classes = useStyles();

    const message={
        unpaid:'未入金',
        paid:'入金済',
        sent:'発送済',
        deliveried:'配達済',
        cancel:'キャンセルされました'
    }
  return (
    <div className={classes.rootacording}>
        {orders.length==0 && (<div className={classes.message} align='center'>注文履歴がありません</div>)}
        {orders.length>0 && (
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell align="center" className={classes.message}>商品</StyledTableCell>
                    <StyledTableCell align="center" className={classes.message}>お客様情報</StyledTableCell>
                    <StyledTableCell align="center" className={classes.message}>配送状況</StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>

                </TableRow>
                </TableHead>
                <TableBody>
                {orders.map((order) => (
                
                    <StyledTableRow key={order.orderId}>
                    <StyledTableCell component="th" scope="row" align="right">
                    <CardMedia
                        className={classes.media}
                        image="https://img.cpcdn.com/recipes/4911988/800x800c/aa46163e885ab2571f2e3e70afb0ff6f?u=15300935&p=1518681059"
                        title="Contemplative Reptile"
                    />
                    </StyledTableCell>
                    <StyledTableCell align="left">
                        <div>{order.product.productName} ({order.product.productSize}) × {order.product.quantity}個</div>
                        <div>トッピング：{order.product.choseToppings.toppingName} ({order.product.choseToppings.topppingsize})</div>
                        <div>小計 {order.product.amount}円</div>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                    {(order.status==0 || order.status==1) && (
                        <>
                        <div>注文日: {order.orderDate}</div>
                        <div>{order.destinationZipcode}</div>
                        <div>{order.destinationAddress}</div>
                        <div>{order.destinationTel}</div>
                        </>
                        )}
                        </StyledTableCell>
                    {/* {orders.filter()=>( */}
                    <StyledTableCell align="left">
                        {order.status >=0 && order.status <9 && (
                        <div>配達予定日: {order.destinationTime} </div>
                        )}
                        <div className={classes.message} align='center'>
                            {order.status===0 && (<span className={classes.red}>{message.unpaid}</span>)}
                            {order.status===1 && message.paid}
                            {order.status===2 && message.sent}
                            {order.status===3 && message.deliveried}
                            {order.status===9 && (<span className={classes.red}>{message.cancel}</span>)}
                        </div>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                    {order.status===0 && (
                    <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    align="right"
                >キャンセル
                </Button>
                    )}
                    </StyledTableCell>
                      </StyledTableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            )}
    </div>
    )
}

export default OrderHistory;

