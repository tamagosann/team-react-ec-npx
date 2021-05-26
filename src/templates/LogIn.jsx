import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { TextInput, PrimaryButton } from "../components/UIKit";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

const LogIn = () => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <form className={classes.form}>
          <TextInput 
            fullWidth={true} label={'メールアドレス'} margin='dense' multiline={false}
            required={true} rows={1} value={''} type={'email'} onChange={() => {}}
          />
          <TextInput 
            fullWidth={true} label={'パスワード'} margin='dense' multiline={false}
            required={true} rows={1} value={''} type={'password'} onChange={() => {}}
          />
          <PrimaryButton
            label={'ログイン'}
            onClick={() => {}}
          /> 
        </form>
      </div>
    </Container>
  );
};

export default LogIn;
