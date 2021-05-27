import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import { useSelector, useDispatch } from 'react-redux';
import { getUsername } from '../../redux/users/selectors';
import { PrimaryButton, SecondaryButton } from '../UIKit'
import { signIn, signOut } from '../../redux/users/operations';
import { ShoppingCart } from '@material-ui/icons';
import { useHistory } from 'react-router';
import ClosableDrawer from './ClosableDrawer';
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  mr20: {
    marginRight: 20,
  },
  menu: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const username = getUsername(selector);
  const history = useHistory();

  const link = useCallback((path) => {
    history.push(path)
  },[history]);

  const [open, setOpen] = useState(false);
  const handleDrawerToggle = useCallback((event) => {
      if(event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
      }
      setOpen(!open);
  }, [setOpen, open])

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap onClick={() => link('/')}>
            ECサイト！ 
          </Typography>
          <div className={classes.grow} />
            { username && (
              <div className={classes.mr20 + ' ' + classes.menu}>ようこそ、{username}様！</div>
            )}
            <div className={classes.mr20 + ' ' + classes.menu}>
              <IconButton color="inherit" onClick={() => link('/cart')}>
                <Badge badgeContent={props.cartLength} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
            {username && (
              <div className={classes.mr20 + ' ' + classes.menu}>
                <PrimaryButton label={'注文履歴'} onClick={() => link('./order/history')}/>
              </div>
            )}
            {!username && (
              <div className={classes.menu}>
                <PrimaryButton label={'ログイン'} onClick={() => dispatch(signIn())}/>
              </div>
            )}
            {username && (
              <div className={classes.menu}>
                <SecondaryButton label={'ログアウト'} onClick={() => dispatch(signOut())}/>
              </div>
            )}
          <div className={classes.drawer}>
            <IconButton onClick={(event) => handleDrawerToggle(event)}>
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <ClosableDrawer open={open} onClose={handleDrawerToggle} isSignedIn={username}/>
    </div>
  );
}
export default Header;