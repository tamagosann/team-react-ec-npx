import React, { useCallback, useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CardMedia from "@material-ui/core/CardMedia";
//buttonのimport
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../redux/users/selectors";
import { fetchOrderHistory, orderStatusChange } from "../redux/users/operations";
import { WbIridescentRounded } from "@material-ui/icons";
import { PrimaryButton, SecondaryButton, TextInput } from "../components/UIKit";
import { Container, FormControl, Hidden, InputLabel, MenuItem, Select } from "@material-ui/core";

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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const useStyles = makeStyles((theme) => ({
  position: {
    align: "center",
  },
  table: {
    minWidth: 500,
  },
  media: {
    width: 130,
    height: 100,
  },
  rootpaper: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(5),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  rootacording: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  button: {
    margin: theme.spacing(1),
  },
  red: {
    color: "red",
  },
  message: {
    fontWeight: "bold",
    fontSize: "20px",
    position: "relative",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const AdminOrderHistory = () => {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const orderHistory = getOrderHistory(selector);
  const dispatch = useDispatch();
  console.log(orderHistory);

  const [adminLogin, setAdminLogin] = useState(false);
  const [password, setPassword] = useState('');

  const inputPassword = useCallback((e) => {
    setPassword(e.target.value)
    console.log(password)
  },[setPassword, password]);

  const adminLoginClick = () => {
    if(password === '123456') {
        setAdminLogin(true)
    } else {
        alert('パスワードが違います。')
    }
  }

  useEffect(() => {
    dispatch(fetchOrderHistory());
  }, []);

  const progressData = [
    1,2,3,4,9
  ]
  const message = {
    unpaid: "未入金",
    paid: "入金済",
    sent: "発送済",
    deliveried: "配達済",
    cancel: "キャンセル済",
  };

  const getStatusInJapanese = useCallback((status) => {
    if(status === 1) {
        return '未入金'
    } else if(status === 2) {
        return '入金済'
    } else if (status === 3) {
        return '発送済'
    } else if (status === 4) {
        return '配送済'
    } else if (status === 9) {
        return 'キャンセル'
    }
  },[])

  const [shippingStatus, setShippingStatus] = useState('')

  const handleChangeStatus = (event) => {
    setShippingStatus(event.target.value);
    console.log(shippingStatus)      
  }

  if(adminLogin) {
    return (
      <div className={classes.rootacording}>
          {orderHistory.length === 0 && (
            <div className={classes.message} align="center">
              注文履歴がありません
            </div>
          )}
          {orderHistory.length > 0 && (
            <TableContainer component={Paper} style={{width: 800, overflowX: 'scroll', margin: '0 auto'}}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell align="center" className={classes.message}>
                      商品
                    </StyledTableCell>
                    <StyledTableCell align="center" className={classes.message}>
                      お客様情報
                    </StyledTableCell>
                    <StyledTableCell align="center" className={classes.message}>
                      配送状況
                    </StyledTableCell>
                    {/* <StyledTableCell align="center"></StyledTableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderHistory.map((order) => (
                    <StyledTableRow key={order.orderId}>
                      {/* <Hidden xsDown> */}
                      <StyledTableCell component="th" scope="row" align="right">
                        <CardMedia
                          className={classes.media}
                          image={order.url}
                          title="Contemplative Reptile"
                        />
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <div className={"text-history-products"}>
                          {order.productName} {order.productSize} ×{" "}
                          {order.quantity}個
                        </div>
                        <div className={"text-history-products"}>
                          トッピング：{order.toppingName}
                        </div>
                        <div className={"text-center history-product-price"}><span>小計 {order.amount.toLocaleString()}円</span></div>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {(order.status !== 9) && (
                          <>
                            <div className={"text-history"}>注文日: {order.orderDate}</div>
                            <div className={"text-history"}>郵便番号: {order.destinationZipcode}</div>
                            <div className={"text-history"}>お届け先住所: {order.destinationAddress}</div>
                            <div className={"text-history"}>電話番号: {order.destinationTel}</div>
                          </>
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {order.status !== 9 && (
                          <div className={"text-history mb20"}>配達予定日: {order.destinationDate} </div>
                        )}
                        <div className={classes.message} align="center">
                          {order.status === 1 && (
                            <span className={classes.red}>{message.unpaid}</span>
                          )}
                          {order.status === 2 && message.paid}
                          {order.status === 3 && message.sent}
                          {order.status === 4 && message.deliveried}
                          {order.status === 9 && (
                            <span className={classes.red}>{message.cancel}</span>
                          )}
                        </div>
                        <FormControl className={classes.formControl}>
                          <InputLabel>注文状況変更</InputLabel>
                          <Select value={shippingStatus} onChange={(e) => handleChangeStatus(e)}>
                            {progressData.map(data => {
                              return <MenuItem key={data} value={data}>{getStatusInJapanese(data)}</MenuItem>
                            })}
                          </Select>
                        </FormControl>
                        <div className={'text-center'}>
                            <PrimaryButton label={'決定'} onClick={() => dispatch(orderStatusChange(order.orderId, shippingStatus))}/>
                        </div>
                      </StyledTableCell>
                      {/* </Hidden> */}
                      <Hidden xsUp>
                        私の事は探さないで下さい
                      </Hidden> 
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
    );
  } else {
    return (
        <Container maxWidth="sm">
            <Paper variant="outlined" component="div" style={{ padding: 20, marginTop: 40,}} >
                <div className="text-center">
                    <TextInput fullWidth={false} label={'パスワード'} multiline={false} 
                        required={true} rows={1} value={password} type={"password"} onChange={inputPassword}
                    />
                </div>
                <div className="text-center" style={{marginTop: 30}}>
                    <PrimaryButton label={'管理者としてログイン'} onClick={adminLoginClick}/>
                </div>
            </Paper>
        </Container>
    )
  }
};

export default AdminOrderHistory;
