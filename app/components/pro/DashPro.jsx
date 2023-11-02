import { useSession } from "next-auth/react";
import React from "react";
import HeroPro from "./HeroPro";
import { useDispatch } from "react-redux";
import SignOutButton from "./SignOut";

function DashPro(credential) {
  const reduxCredential = {
    loginCredential: credential.credential.loginCredential,
    loginGoogle: credential.credential.loginGoogle,
  };
  // mengirim login session
  const dispatch = useDispatch();

  // To dispatch an action:
  dispatch({ type: "SESSION_STATUS", payload: reduxCredential });

  return (
    <div className="flex flex-row items-center justify-between">
      <HeroPro />
      <div className="">
        <SignOutButton credential={reduxCredential} />
      </div>
    </div>
  );
}

export default DashPro;
