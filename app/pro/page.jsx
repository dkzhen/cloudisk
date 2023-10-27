"use client";
import React, { useState } from "react";
import { SideBar, Navbar } from "../components/Home";
import { onScrolling } from "@/utils/functions";
import { useSession } from "next-auth/react";
import Login from "../components/login/Login";
import AccessDenied from "../components/login/AccessDenied";
import DashPro from "../components/pro/DashPro";
import { Provider } from "react-redux";
import store from "../store";

function Setting() {
  const [scrolling, setScrolling] = useState(false);
  const [navClick, setnavClick] = useState(false);

  onScrolling(setScrolling);

  const handleClick = () => {
    setnavClick(!navClick);
  };

  const session = useSession();
  const sessionStatus = session?.data?.user?.name;
  const sessionEmail = session?.data?.user?.email;
  const emailAllowed = process.env.NEXT_PUBLIC_EMAIL_ALLOWED;

  return (
    <Provider store={store}>
      <main>
        <aside className="fixed">
          <SideBar />
        </aside>
        <nav
          className={`sticky top-0 ${
            navClick == false ? "bg-white" : "bg-[#eff2f4] pt-2"
          } h-14 md:h-0 ${scrolling ? "pt-[4px] md:pt-0" : ""} `}
        >
          <Navbar handleClickNav={handleClick} nav={navClick} />
        </nav>
        <section className="ml-44">
          {!sessionStatus ? (
            <div className="ml-44">
              <Login />
            </div>
          ) : sessionEmail !== emailAllowed ? (
            <AccessDenied />
          ) : (
            <DashPro />
          )}
        </section>
      </main>
    </Provider>
  );
}

export default Setting;
