"use client";
import React, { useEffect, useState } from "react";
import { SideBar, Navbar } from "@/app/components/Home";
import { useSession } from "next-auth/react";
import Login from "@/app/components/login/Login";
import AccessDenied from "@/app/components/login/AccessDenied";
import DashPro from "@/app/components/pro/DashPro";
import { Provider } from "react-redux";
import store from "@/app/utils/ReduxStore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Setting() {
  const [scrolling, setScrolling] = useState(false);
  const [navClick, setNavClick] = useState(false);
  const [loginCredential, setLoginCredential] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    setNavClick(!navClick);
  };
  const session = useSession();
  const loginGoogle = session?.data?.user?.name;
  const sessionEmail = session?.data?.user?.email;
  const emailAllowed = process.env.NEXT_PUBLIC_EMAIL_ALLOWED;

  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setLoginCredential(uid);
      } else {
        const uid = auth.currentUser;
        setLoginCredential(uid);
      }
    });

    // Cleanup subscription when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);
  const credential = { loginCredential, loginGoogle };

  return (
    <Provider store={store}>
      <main>
        <aside className="fixed">
          <SideBar />
        </aside>
        <nav
          className={`sticky top-0 ${
            !navClick ? "bg-white" : "bg-[#eff2f4] pt-2"
          } h-14 md:h-0 ${scrolling ? "pt-[4px] md:pt-0" : ""} `}
        >
          <Navbar handleClickNav={handleClick} nav={navClick} />
        </nav>
        <section className="flex flex-col ml-5 md:ml-28">
          {
            loginGoogle === undefined && loginCredential === null ? (
              <Login />
            ) : loginGoogle !== null || loginCredential !== null ? (
              sessionEmail === undefined ? (
                <DashPro credential={credential} />
              ) : sessionEmail !== emailAllowed ? (
                <AccessDenied />
              ) : (
                <DashPro credential={credential} />
              )
            ) : null // Render nothing if none of the conditions are met
          }
        </section>
      </main>
    </Provider>
  );
}

export default Setting;
