import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/loginContext";
import "./Header.css";
import ricklogo from './../../../assets/rick.png'
export default function Header() {
  const Auth = useContext(AuthContext);
  console.log(Auth.authenticator);

  function HandleLogout() {
    Auth.setAuthenticator(false);
    console.log(Auth.authenticator);
  }
  return (
    <div>

        <div className="head">
        <div className="hello-div">
        <a href="/"> <img src={ricklogo}  className="rick-logo" alt="logo"/> </a>
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
      </div>
    </div>
  );
}
