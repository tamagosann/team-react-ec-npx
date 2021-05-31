import React, { useCallback, useEffect } from "react";
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
import { SecondaryButton } from "../components/UIKit";
import { Hidden } from "@material-ui/core";
import { CANCEL, DELIVERED, PAID, SENT, UNPAID } from "../common/status";

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
    color: "#f50057",
  },
  message: {
    fontWeight: "bold",
    fontSize: "18px",
    position: "relative",
  },
}));

const OrderHistory = () => {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const orderHistory = getOrderHistory(selector);
  const dispatch = useDispatch();
  console.log(orderHistory);

  useEffect(() => {
    dispatch(fetchOrderHistory());
  }, []);

  const getStatusInJapanese = useCallback((status) => {
    if(status === UNPAID) {
        return <span className={classes.red}>未入金</span>
    } else if(status === PAID) {
        return '入金済'
    } else if (status === SENT) {
        return '発送済'
    } else if (status === DELIVERED) {
        return '配送済'
    } else if (status === CANCEL) {
        return <span className={classes.red}>キャンセル済</span>
    }
  },[])

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
                    {(order.status !== CANCEL) && (
                      <>
                        <div className={"text-history"}>注文日: {order.orderDate}</div>
                        <div className={"text-history"}>郵便番号: {order.destinationZipcode}</div>
                        <div className={"text-history"}>お届け先住所: {order.destinationAddress}</div>
                        <div className={"text-history"}>電話番号: {order.destinationTel}</div>
                      </>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {order.status !== CANCEL && (
                      <div className={"text-history mb20"}>配達予定日: {order.destinationDate} </div>
                    )}
                    <div className={classes.message} align="center">
                      {getStatusInJapanese(order.status)}
                    </div>
                      {order.status === UNPAID && (
                        <div className={"mt-20"}>
                          <SecondaryButton label={"注文をキャンセルする"} onClick={() => dispatch(orderStatusChange(order.orderId, CANCEL))} />
                        </div>
                      )}
                  </StyledTableCell>
                  {/* </Hidden> */}
                  <Hidden xsUp>
                    a
                  </Hidden> 
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default OrderHistory;
