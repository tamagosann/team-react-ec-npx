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


const useStyles = makeStyles((theme) => ({
  position:{
      align:'center'
  },
  table: {
    minWidth: 500,
  },
  media: {
    width: 250,
    height: 180,
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
  gray:{
      color:'#808080'
  },
  silver:{
      color:'#C0C0C0'
  },
  message: {
    fontWeight: 'bold',
    fontSize: '16px',
    position: 'relative',
  },
  message2: {
    fontWeight: 'bold',
    fontSize: '20px',
    position: 'relative',
  },
  back:{
      backgroundColor:'#B0C4DE',
      fontWeight:'bold',
      fontSize:'16px',
  },
  rootsticky: {
    width: '95%',
    margin: theme.spacing(5),
    // width: theme.spacing(20),
    // height: theme.spacing(16),

  },
  container: {
    maxHeight: 750,
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
                    toppingName: 'ホイップ',
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

    const message={
        unpaid:'未入金',
        paid:'入金済',
        sent:'発送済',
        deliveried:'配達済',
        cancel:'キャンセルされました'
    }
  return (
    <div>
        {orders.length===0 && (<div className={classes.message} align='center'>注文履歴がありません</div>)}
        {orders.length>0 && (
            <Paper className={classes.rootsticky}>
            <TableContainer component={Paper} className={classes.container}>
            <Table stickyHeader aria-label="sticky table" className={classes.table} aria-label="customized table">
                <TableHead>
                <TableRow align='center'>
                    <StyledTableCell  className={classes.back}></StyledTableCell>
                    <StyledTableCell align="center" className={classes.back}>商品</StyledTableCell>
                    <StyledTableCell align="center" className={classes.back}>お客様情報</StyledTableCell>
                    <StyledTableCell align="center" className={classes.back}>配送状況</StyledTableCell>
                    <StyledTableCell align="center" className={classes.back}></StyledTableCell>

                </TableRow>
                </TableHead>
                <TableBody>
                {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
                    <>
                 {order.status>=0 && order.status <10 && (
                    <StyledTableRow key={order.orderId}>
                    <StyledTableCell component="th" scope="row" align="center">
                    <CardMedia
                        className={classes.media}
                        image="https://img.cpcdn.com/recipes/4911988/800x800c/aa46163e885ab2571f2e3e70afb0ff6f?u=15300935&p=1518681059"
                        title="Contemplative Reptile"
                    />
                    </StyledTableCell>
                    <StyledTableCell>
                        {order.status>=0 && order.status<9 && (
                        <>
                        <TableRow>
                            <StyledTableCell className={classes.message}>{order.product.productName}</StyledTableCell>
                            <StyledTableCell align="right">{ order.product.productSize }</StyledTableCell>
                            <StyledTableCell align="left" className={classes.message2}>× {order.product.quantity}</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell>+ {order.product.choseToppings.toppingName}</StyledTableCell>
                            <StyledTableCell align="right">{ order.product.choseToppings.topppingsize }</StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell align="right">小計</StyledTableCell>
                            <StyledTableCell align="right" className={classes.message}>{ order.product.amount } 円</StyledTableCell>
                        </TableRow>
                        </>
                        )}
                        {order.status ===9 && (
                        <>
                        {/* <div className={classes.silver}>{order.product.productName} ({order.product.productSize}) × {order.product.quantity}個</div>
                        <div className={classes.silver}>トッピング：{order.product.choseToppings.toppingName} ({order.product.choseToppings.topppingsize})</div>
                        <div className={classes.silver}>小計 {order.product.amount} 円</div> */}
                        <TableRow>
                            <StyledTableCell className={classes.message +' '+classes.silver}>{order.product.productName}</StyledTableCell>
                            <StyledTableCell align="right" className={classes.silver}>{ order.product.productSize }</StyledTableCell>
                            <StyledTableCell align="left" className={classes.message2 +' '+classes.silver}>× {order.product.quantity}</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell className={classes.silver}>+ {order.product.choseToppings.toppingName}</StyledTableCell>
                            <StyledTableCell align="right" className={classes.silver}>{ order.product.choseToppings.topppingsize }</StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell align="right" className={classes.silver}>小計</StyledTableCell>
                            <StyledTableCell align="right" className={classes.message +' '+classes.silver}>{ order.product.amount } 円</StyledTableCell>
                        </TableRow>
                        </>
                        )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                    {(order.status===0 || order.status===1) && (
                        <>
                        {/* <div>注文日: {order.orderDate}</div>
                        <div>{order.destinationZipcode}</div>
                        <div>{order.destinationAddress}</div>
                        <div>{order.destinationTel}</div> */}
                        <TableRow>
                            <StyledTableCell className={classes.position}>注文日 :</StyledTableCell>
                            <StyledTableCell>{order.orderDate}</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell align='center' colSpan={2}>〒 {order.destinationZipcode}</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell align='center' colSpan={2}>{order.destinationAddress}</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell align='center' colSpan={2}>TEL: {order.destinationTel}</StyledTableCell>
                        </TableRow>
                        </>
                        )}
                        </StyledTableCell>
                    {/* {orders.filter()=>( */}
                    <StyledTableCell align="center">
                        {order.status >=0 && order.status <9 && (
                        <div>配達予定日: {order.destinationTime} </div>
                        )}
                        <div className={classes.message} align='center'>
                            {order.status===0 && (<span className={classes.red}>{message.unpaid} <div>{order.product.amount}円(税込)</div></span>)}
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
                      )}
                      </>
                ))}
               
                </TableBody>
            </Table>
            </TableContainer>
            </Paper>
            )}
    </div>
    )
}

export default OrderHistory;

