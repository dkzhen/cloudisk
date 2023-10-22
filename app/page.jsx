"use client";

import { Provider, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import {
  Navbar,
  SideBar,
  Storage,
  Files,
  Divider,
  Hero,
  UploadFile,
  Footer,
  Info,
} from "./components/Home";
import store from "./store";
export default function Home() {
  const [scrolling, setScrolling] = useState(false);
  const [dataDivider, setDataDivider] = useState("0");

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };
  const handleDividerReceived = (data) => {
    setDataDivider(data);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Provider store={store}>
      <main>
        <aside className="fixed">
          <SideBar />
        </aside>
        <nav
          className={`sticky top-0 bg-white h-14 md:h-0 ${
            scrolling ? "pt-[4px] md:pt-0" : ""
          } `}
        >
          <Navbar />
        </nav>
        <section className="flex flex-col ml-5 md:ml-28">
          <Hero />
          <Divider content="Information" id="4" />
          <Info />
          <Divider content="Upload File" id="3" />
          <UploadFile />
          <Divider
            content="Available Storage"
            id="1"
            dataDivider={handleDividerReceived}
          />
          <Storage dataReceived={dataDivider} />
          <Divider content="Recent Files" id="2" />
          <span className="md:pr-16 ">
            <Files />
          </span>
          <Footer />
        </section>
      </main>
    </Provider>
  );
}
