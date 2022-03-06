import React, { useState, useEffect } from "react";
import  AppBar  from "./components/navbar/navbar";
import Router from "./components/router/router";
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: ["Lato", "sans-serif"].join(","),
  },
  palette:{
    primary:{
      main:'#0B4B36'
    }
}
});

function App() {
  const [Token, setToken] = useState(localStorage.getItem("token"));
  const [email, setEmail] = useState("");
  useEffect(() => {
    let Token = localStorage.getItem("token");
    setToken(Token);
  }, [Token]);

  return (
    <div className="App">
      <CssBaseline/>
      <ThemeProvider theme={theme}>
        <AppBar Token={Token} />
        <Router setToken={setToken} Token={Token}  setEmail= {setEmail} email={email}/>
      </ThemeProvider>
    </div>
  );
}

export default App;
