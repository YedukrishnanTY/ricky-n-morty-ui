import "./App.css";
import Footer from "./components/Footer/Footer";
import { AuthContextProvider } from "./contexts/loginContext";
import MainPage from "./components/Main Page/MainPage";
import CssBaseline from "@mui/material/CssBaseline";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import { Button } from "@mui/material";
import { deepOrange, grey , amber } from "@mui/material/colors";
function App() {
  const [isDark, setIsDark] = useState(true);
  function handleMode() {
    setIsDark((prev) => !prev);
  }

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#263238",
        paper: "#263238",
      },
      text: {
        primary: "#fff",
        secondary: grey[500],
      },
    },
  });
  const lightTheme = createTheme({
    palette: {
      primary: amber,
      divider: amber[200],
      mode: "light",
      text: {
        primary: grey[900],
        secondary: grey[800],
      },
    },
  });

  return (
    <>
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

      <AuthContextProvider>
        <MainPage />
      </AuthContextProvider>
      <Footer />
    </>
  );
}

export default App;
