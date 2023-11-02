import { signOut as logoutGoogle } from "next-auth/react";
import { signOut as logoutCredential, getAuth } from "firebase/auth";
import React from "react";

function SignOutButton(credential) {
  const auth = getAuth();
  const logOutEmailPass = () => {
    logoutCredential(auth)
      .then(() => {
        console.log("Signing out successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const LoginCredential = credential.credential.loginCredential;

  return (
    <button
      className="px-3 py-2 mr-5 mt-4 bg-red-700 rounded-lg text-white"
      onClick={() => {
        if (LoginCredential != null) {
          logOutEmailPass();
        } else {
          logoutGoogle();
        }
      }}
    >
      Logout
    </button>
  );
}

export default SignOutButton;
