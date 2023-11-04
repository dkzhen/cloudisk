"use client";
import { StorageInfo } from "@/app/utils/constants";
import React, { useState } from "react";

function Divider({ content, id, dataDivider }) {
  const [expanded, setExpanded] = useState(false);

  const handleStorageButton = () => {
    dataDivider(expanded ? (id = "3") : id);
    setExpanded(!expanded);
  };

  return (
    <div className="flex flex-row justify-between font-semibold mt-8 items-center ">
      <div className="text-lg">{content}</div>
      {id != 1 ? (
        ""
      ) : StorageInfo.length >= 3 ? (
        <div
          onClick={handleStorageButton}
          className="flex flex-row items-center md:gap-2 gap-5 mr-5 md:mr-16 text-sm hover:cursor-pointer hover:px-2 hover:bg-[#ADC4CE] hover:rounded-lg"
        >
          {expanded ? "See Less" : "See More"}{" "}
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="md:w-6 md:h-6 w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  expanded
                    ? "M4.5 15.75l7.5-7.5 7.5 7.5"
                    : "M19.5 8.25l-7.5 7.5-7.5-7.5"
                }
              />
            </svg>
          </span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Divider;
