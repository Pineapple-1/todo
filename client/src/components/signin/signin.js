import React, { useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import api from "../../api/index";
import Alert from "@mui/material/Alert";
import { Redirect } from "react-router-dom";

export default function SignIn({ setToken, Token }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [error, setError] = useState(false);

  useEffect(() => {
    if (Token) {
      return <Redirect to="/feed" />;
    }
  }, [Token]);

  async function getToken(e) {
    e.preventDefault();
    const login = {
      username: email,
      password: pass,
    };
    const response = await api
      .post("login/", login)
      .catch((error) => setError(true));

    console.log(response?.data);
    if (response) {
      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("email", email);
      let Token = localStorage.getItem("token");
      setToken(Token);
    }
  }

  return Token ? (
    <Redirect to="" />
  ) : (
    <>
    
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={getToken} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>

              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          {error ? (
            <Alert
              severity="error"
              style={{ width: "110%", marginTop:"10px" }}
              onClose={() => {
                setError(false);
              }}
            >
              Wrong Credientials
            </Alert>
          ) : null}
        </Box>
      </Container>

    </>
  );
}
