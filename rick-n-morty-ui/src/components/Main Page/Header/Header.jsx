import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/loginContext";
import "./Header.css";
import ricklogo from "./../../../assets/rick.png";
import { Button, Grid, Typography } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function Header() {
  const Auth = useContext(AuthContext);
  const [isDark, setIsDark] = useState(true);
  function handleMode() {
    setIsDark((prev) => !prev);
  }

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });
  console.log(Auth.authenticator);

  function HandleLogout() {
    Auth.setAuthenticator(false);
    console.log(Auth.authenticator);
  }

  return (
    <div>
      {/* <div className="head">
        <div className="hello-div">
          <a href="/">
            {" "}
            <img src={ricklogo} className="rick-logo" alt="logo" />{" "}
          </a>
          <div className="h-content">Docs</div>
          <div className="h-content">About</div>
          <div className="h-content">Support-us</div>

          <div className="logout-div">
            {Auth.authenticator ? (
              <div className="logout" onClick={HandleLogout}>
                Logout
              </div>
            ) : (
              <div> </div>
            )}
          </div>
        </div>
      </div> */}

      <Grid container padding={1} display="flex" alignItems="center" gap={4}>
        <Grid items>
          <a href="/">
            {" "}
            <img src={ricklogo} alt="logo" height="50vh" />
          </a>
        </Grid>
        <Grid>
          <Typography>Docs</Typography>
        </Grid>
        <Grid>
          <Typography>About</Typography>
        </Grid>
        <Grid>
          <Typography>Support-us</Typography>
        </Grid>
        <Grid>
          <Button variant="secondary" onClick={handleMode}>
            {isDark ? (
              <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <main>
                  <DarkModeIcon />
                </main>
              </ThemeProvider>
            ) : (
              <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <main>
                  <LightModeIcon />
                </main>
              </ThemeProvider>
            )}
          </Button>
        </Grid>

        <Grid style={{ marginLeft: "auto" }}>
          {Auth.authenticator ? (
            <Button onClick={HandleLogout} variant="contained">
              Logout
            </Button>
          ) : (
            <div> </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
