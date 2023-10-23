"use client";
import { useState } from "react";
import { SideBar, Navbar } from "../components/Home";
import { onScrolling } from "@/utils/functions";
import NotFound404 from "../components/NotFound404";

function Setting() {
  const [scrolling, setScrolling] = useState(false);
  const [navClick, setnavClick] = useState(false);

  onScrolling(setScrolling);

  const handleClick = () => {
    setnavClick(!navClick);
  };

  return (
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
      <section>
        <NotFound404 />
      </section>
    </main>
  );
}

export default Setting;
