import React, { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../../contexts/loginContext";
import "./Form.css";
export default function Form() {
  const user = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailInput = useCallback((inputElement) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  const handleSubmit = (event) => {
    user.handleLogin(email, password);
  };

  return (
    <div className="form">
      <div className="form-card">
        <div className="form-details">
          <div className="form-content">
            <label>Name:</label>
            <input
              type="text"
              placeholder="Name"
              ref={emailInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password :</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="submit"
              onClick={handleSubmit}
              value="Login"
              className="login"
            />
            <div className="err">{user.alertBox}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
