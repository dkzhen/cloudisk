import React from "react";
import { useSelector } from "react-redux";

function HeroPro() {
  // get from dashboard use redux
  const sessionName = useSelector((state) => state.sessionName);

  return (
    <div className="flex flex-col md:mt-8 ">
      <div className="md:text-5xl text-3xl font-Lora font-bold hidden md:block ">
        Cloudisk.
      </div>
      <div className="font-AmerType font-medium text-xl md:text-2xl">
        Hi , Welcome To {sessionName}.
      </div>
    </div>
  );
}

export default HeroPro;
