import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  ButtonGroup,
  Container,
  FormControl,
  FormGroup,
  FormHelperText,
  AppBar,
  Toolbar,
  Typography,
  TextField,
} from "@material-ui/core";
import List from "./List";
import { auth } from "./firebaseSetup";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const user = useContext(AuthContext);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const classes = useStyles();
  const [err, setErr] = useState(false)
  const [errMsg, setErrMsg] = useState("")

  const createAccount = async () => {
    console.log(emailRef.current!.value);

    try {
      await auth.createUserWithEmailAndPassword(
        emailRef.current!.value,
        passRef.current!.value
      );
      setErr(false)
    } catch (error) {
      console.log(error.message);
      setErrMsg(error.message)
      setErr(true)
    }
  };

  const signIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(
        emailRef.current!.value,
        passRef.current!.value
      );
      setErr(false)
    } catch (error) {
      console.error(error);
      setErrMsg(error.message)
      setErr(true)
    }
  };

  const signOut = async () => {
    await auth.signOut();
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Todo List
          </Typography>
          {user && (
            <Button onClick={signOut} color="inherit">
              Log out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {!user ? (
        <Container maxWidth="sm">
          <FormGroup>
            <FormControl>
              <TextField error={err} inputRef={emailRef} label="Email" />
              <FormHelperText id="helper">
                El correo con el que te registraste
              </FormHelperText>
            </FormControl>
            <FormControl>
              <TextField error={err} inputRef={passRef} label="Password" />
              <FormHelperText id="helper">
                No mustres tu contraseña a nadie
              </FormHelperText>
            </FormControl>
            <label style={{visibility: err ? "visible":"hidden"}}>{errMsg}</label>
            <ButtonGroup>
              <Button
                onClick={createAccount}
                color="primary"
                variant="outlined"
              >
                Sign up
              </Button>
              <Button onClick={signIn} color="primary" variant="contained">
                Login
              </Button>
            </ButtonGroup>
          </FormGroup>
        </Container>
      ) : (
        <List />
      )}
    </>
  );
}

export default App;
