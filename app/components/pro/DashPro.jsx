import React from "react";
import HeroPro from "./HeroPro";
import { useDispatch } from "react-redux";
import SignOutButton from "./SignOut";
import { Divider, Footer } from "../Home";
import SettingPro from "./SettingPro";
import FilePro from "./FilePro";

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
    <div className="flex-flex-col">
      <div className="flex flex-row items-center justify-between mb-4">
        <HeroPro />
        <SignOutButton credential={reduxCredential} />
      </div>
      <Divider content={"Setting"} />
      <div className="text-sm mt-2 italic text-red-600">
        Note: Reload the page if the action doesnt work!
      </div>
      <SettingPro />
      <Divider content={"Files"} />
      <FilePro />
      <Footer />
    </div>
  );
}

export default DashPro;
