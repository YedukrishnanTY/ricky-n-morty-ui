import React, { useContext } from "react";
import Content from "./Content/Content";
import Form from "./Form/Form";
import { AuthContext } from "../../contexts/loginContext";
import Header from "./Header/Header";
import Image from "./Image/Image";
export default function MainPage() {
  const Auth = useContext(AuthContext);
  console.log(Auth.authenticator);
  return (
    <>
      <Header />
      <Image />
      {Auth.authenticator ? (
        <>
          <Content />
        </>
      ) : (
        <Form />
      )}
    </>
  );
}
