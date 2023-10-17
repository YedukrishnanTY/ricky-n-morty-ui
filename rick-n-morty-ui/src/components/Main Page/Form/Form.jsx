import React, { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../../contexts/loginContext";
import "./Form.css";
import { Button, Alert, Box, TextField, Typography } from "@mui/material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

export default function Form() {
  const user = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailInput = useCallback((input) => {
    if (input) {
      input.focus();
    }
  }, []);

  const handleSubmit = () => {
    user.handleLogin(email, password);
  };

  return (
    <div className="form">
      <Box
        sx={{
          borderRadius: "9px",
        }}
        display="flex"
        justifyContent="center"
        flexDirection="column"
        padding="2% 4%"
        gap={3}
      >
        <Typography
          variant="h5"
          gutterBottom
          display="flex"
          justifyContent="center"
          fontFamily="Montserrat"
        >
          Login
        </Typography>

        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="text"
          placeholder="Email"
          InputRef={emailInput}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          lg={12}
          sx={{ p: 1 }}
        />

        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          lg={12}
          sx={{ p: 1 }}
        />
        <Button
          aria-label="fingerprint"
          variant="text"
          onClick={handleSubmit}
          value="Login"
          endIcon={<VpnKeyIcon />}
          size="small"
        >
          Login
        </Button>

        {user.alertBox && (
          <Alert variant="outlined" severity="error">
            {user.alertBox}
          </Alert>
        )}
      </Box>
    </div>
  );
}
