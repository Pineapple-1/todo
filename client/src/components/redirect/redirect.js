import React,{useEffect} from "react";
import gif from "../../assets/robot.gif";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Container from '@mui/material/Container';
import Styles from "./redirect.module.css";

export const Redirect = ({ setToken }) => {
  useEffect(() => {
    let token = localStorage.clear("Token");
    setToken(token);
  });

  return (
    <div>
      <Container>
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <div className={Styles.space}>
              <h2>Looks Like You Forgot To Log In.</h2>{" "}
            </div>
            <div className={Styles.underline}>
            <Link href ="/signin" underline="none">
              <h3>Sign in</h3>
            </Link>
            </div>
           
          </Grid>
          <Grid item>
            {" "}
            <div className={Styles.gif}>
              <img src={gif} alt="gif" />
            </div>{" "}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
