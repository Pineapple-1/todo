import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


const style = {
  textDecoration: "none",
  marginRight:"10px",
  color: '#ffffff',
  m:3
};

export default function NavBar({Token}) {

  return (
    <div >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{flexGrow:1}}>
            <Link sx={style}  href="/"> TODO</Link>
          </Typography>
             {Token ? <Link sx={style}  underline="none" href="/redirect" variant="body2">Signout</Link>:
             <>
             <Link sx={style} underline="none" href="/signin" variant="body2">SignIn</Link>
             <Link sx={style}  underline="none" href="/signup" variant="body2">SignUp</Link></>}

             
            
        </Toolbar>
      </AppBar>
    </div>
  );
}