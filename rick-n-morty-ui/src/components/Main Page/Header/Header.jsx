import React, { useContext } from 'react'
import { AuthContext } from '../../../contexts/loginContext';
export default function Header() {


  const Auth = useContext(AuthContext);
  console.log(Auth.authenticator)

  function HandleLogout() {
    Auth.setAuthenticator(false);
    console.log(Auth.authenticator)
  }
  return (
    <div>
      <div className='head'>
        <div className='rick-image'>Hello </div>
       {Auth.authenticator ? <div className='logout' onClick={HandleLogout}>Logout</div> : <div> </div> }
      </div>
    </div>

  )
}
