import React, { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../../contexts/loginContext";

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
          <input
            type="text"
            placeholder="Name"
            ref={emailInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" onClick={handleSubmit} />

          {user.alertBox}
        </div>
      </div>
    </div>
  );
}
