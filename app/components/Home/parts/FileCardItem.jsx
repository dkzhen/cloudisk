import { getTypeImage, typeImage } from "@/utils/functions";
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
        isExpanded ? "h-24" : "h-16"
      }
      } rounded-md mt-[2px] bg-[#9DB2BF] cursor-pointer`}
      onClick={handleWrap}
    >
      {isExpanded ? (
        // wrap onclick
        <div className="flex flex-row justify-between w-full ">
          <div className="pl-3 flex-row flex items-center justify-start">
            <Image
              src={`/icons/${typeImage}`}
              alt="type"
              width={40}
              height={40}
            />
            <div className="flex flex-col items-start ">
              <p className="ml-4">{nameOriginal}</p>
              <div className="flex flex-row justify-between items-center space-x-4 ml-4">
                <p>Size: {size}</p>
                <p>Date: {lastModified}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center mr-[87px] ">
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
