import { getTypeImage, shortenFileName, typeImage } from "@/utils/functions";
import Image from "next/image";

import React, { useState } from "react";

function FileCardItem({ name, size, lastModified, url, nameOriginal }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDownload = () => {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = name; // Nama file yang akan diunduh
    anchor.target = "_blank"; // Menyembunyikan elemen anchor
    anchor.click(); // Simulasi klik pada elemen anchor
  };

  const handleWrap = () => {
    setIsExpanded(!isExpanded); // Toggle state isExpanded
  };

  getTypeImage(name);

  return (
    <div
      className={`flex flex-row items-center justify-between ${
        isExpanded ? "h-full md:h-24 " : "h-16"
      }
      } rounded-md mt-[2px] bg-[#9DB2BF] cursor-pointer w-full`}
      onClick={handleWrap}
    >
      {isExpanded ? (
        // wrap onclick
        <div className="flex flex-row justify-between  w-screen ">
          <div className="pl-3 flex-row flex items-center justify-start">
            <Image
              src={`/icons/${typeImage}`}
              alt="type"
              width={40}
              height={40}
            />
            <div className="flex flex-col  items-start my-3 md:my-0 ">
              <p className="ml-2  md:ml-4">
                {nameOriginal.length > 30 ? (
                  <>
                    {nameOriginal.slice(0, 30)} {/* 30 karakter pertama */}
                    <span>{nameOriginal.slice(30)}</span>{" "}
                    {/* Sisanya dalam <span> */}
                  </>
                ) : (
                  <div>{nameOriginal}</div>
                )}
              </p>

              <div className="md:flex md:flex-row md:justify-between md:items-center md:space-x-4 md:ml-4 ml-2">
                <p>Size: {size}</p>
                <p>Date: {lastModified}</p>
                <button
                  onClick={handleDownload}
                  className="block md:hidden mt-2 pr-3 bg-blue-300 p-2 rounded-lg"
                >
                  Download{" "}
                </button>
              </div>
            </div>
          </div>
          <div className="hidden md:flex justify-center mr-[87px] h-12 ">
            <button
              onClick={handleDownload}
              className="hidden md:block pr-3 bg-blue-300 p-2 rounded-lg"
            >
              Download
            </button>
            <button onClick={handleDownload} className="md:hidden">
              <Image src={`/download.svg`} width={30} height={30} alt={`img`} />
            </button>
          </div>
        </div>
      ) : (
        // normal
        <>
          <div className="pl-3 flex flex-row gap-3 w-[53%] md:w-[50%]">
            <Image
              src={`/icons/${typeImage}`}
              alt="type"
              width={40}
              height={40}
            />
            <p>{name}</p>
          </div>
          <div className="flex flex-row items-center place-items-end justify-center lg:justify-between md:w-[50%]">
            <div className="text-sm md:text-base">{size}</div>
            <div className="hidden lg:block">{lastModified}</div>
          </div>
          <div className="w-[25%] flex justify-center">
            <button
              onClick={handleDownload}
              className="hidden md:block pr-3 bg-blue-300 p-2 rounded-lg"
            >
              Download
            </button>
            <button onClick={handleDownload} className="md:hidden">
              <Image src={`/download.svg`} width={30} height={30} alt={`img`} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default FileCardItem;
