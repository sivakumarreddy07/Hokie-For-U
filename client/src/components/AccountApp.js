import React from "react";
import AuthGuard from "./AuthGuard";

const AccountApp = () => {
  return (
    <div className='app-account'>
      You have successfully logged in!
    </div>
  )
}

export default AuthGuard(AccountApp);
