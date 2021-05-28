import React, { useCallback } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/styles';
import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import HistoryIcon from '@material-ui/icons/History';
import { ShoppingCart } from '@material-ui/icons';
import { useHistory } from 'react-router';
import { signIn, signOut } from '../../redux/users/operations';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
    container: {
        width: 200,
    }
});

const ClosableDrawer = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const link = useCallback((path) => {
        history.push(path)
    },[])

    return (
        <Drawer
            variant="temporary"
            anchor="right"
            open={props.open}
            onClose={(e) => props.onClose(e)}
            ModalProps={{keepMounted: true}}
        >
            <div className={classes.container}>
                <List>
                    {props.isSignedIn && (
                        <ListItem button onClick={() => dispatch(signOut())}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="ログアウト" />
                        </ListItem>
                    )}
                    {!props.isSignedIn && (
                        <ListItem button onClick={() => dispatch(signIn())}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="ログイン" />
                        </ListItem>
                    )}
                    <Divider />
                    <ListItem button onClick={() => link('/cart')}>
                        <ListItemIcon>
                            <ShoppingCart />
                        </ListItemIcon>
                        <ListItemText primary="カート" />
                    </ListItem>
                    <Divider />
                    <ListItem button onClick={() => link('/order/history')}>
                        <ListItemIcon>
                            <HistoryIcon />
                        </ListItemIcon>
                        <ListItemText primary="注文履歴" />
                    </ListItem>
                    <Divider />
                </List>
            </div>
        </Drawer>

    )
};

export default ClosableDrawer;