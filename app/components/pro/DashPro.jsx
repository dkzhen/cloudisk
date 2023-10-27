import { signOut, useSession } from "next-auth/react";
import React from "react";
import HeroPro from "./HeroPro";
import { useDispatch } from "react-redux";

function DashPro() {
  const session = useSession();
  const sessionStatus = session?.data?.user?.name;
  const sessionName = session?.data?.user?.name;
  const dispatch = useDispatch();
  dispatch({ type: "SESSION_NAME", payload: sessionName });
  return (
    <>
      <HeroPro />
      {/* <div className="">
        <button
          onClick={() => {
            signOut();
          }}
        >
          Logout
        </button>
      </div> */}
    </>
  );
}

export default DashPro;
