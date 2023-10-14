import {  createContext, useState } from "react";

export const AuthContext = createContext({
  authenticator: false,
  handleLogin: () => {},
  alertBox : "",
  setAuthenticator : ""
});

export const AuthContextProvider = ({ children }) => {
  const [authenticator, setAuthenticator] = useState(false);
  const [alertBox, setAlertBox] = useState("");
  function handleLogin(email, password) {
    if (email === "yedu345@gmail.com" && password === "RickAndMorty") {
      setAuthenticator(true);
      console.log(authenticator)
    } else if (email === "" || password === "") {
      console.log("Enter The Password and Email");
      setAlertBox("Please Enter The Password and Email")
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      console.log("Invalid email address");
      setAlertBox("Invalid email address")
    } else if (password.length <= 8) {
      console.log("Password length should be atleast 8");
      setAlertBox("Password length should be atleast 8")
    } 
  }

  return (
    <AuthContext.Provider value={{ authenticator, handleLogin , alertBox , setAuthenticator}}>
      {children}
    </AuthContext.Provider>
  );
};
