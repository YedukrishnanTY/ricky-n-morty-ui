import React, { useContext, useEffect } from 'react'
import Content from './Content/Content'
import Form from './Form/Form'
import { AuthContext } from '../../contexts/loginContext';
import Header from './Header/Header';

export default function MainPage() {
    const Auth = useContext(AuthContext);
      console.log(Auth.authenticator)
  return (
    <>
    <Header />
    {Auth.authenticator? <> <Content />  </>: <Form />}
    </>
  )
}
