"use client";
import React, { useEffect, useState } from "react";
import FileCardItem from "./FileCardItem";
import { db } from "@/config/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore/lite";
import {
  shortenFileName,
  convertSize,
  fetchDataFirestore,
} from "@/utils/functions";

function FileCard() {
  const [datas, setDatas] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(1);

  useEffect(() => {
    function updateItemsToShow() {
      if (window.innerWidth >= 1024) {
        setItemsToShow(3);
      } else if (window.innerWidth >= 768) {
        setItemsToShow(2);
      } else {
        setItemsToShow(1);
      }
    }

    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);

    return () => {
      window.removeEventListener("resize", updateItemsToShow);
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      const dataFirestore = await fetchDataFirestore(getDocs, collection, db);
      setDatas(dataFirestore);
    };
    getData();
  }, []);

  return (
    <div className="w-full flex flex-col mb-4 ">
      <div className="flex flex-row items-center justify-between h-8 mt-5 font-bold bg-[#9DB2BF] rounded-md">
        <div className="pl-3 flex flex-row gap-3 w-[50%] md:w-[50%] ">
          <p>Name</p>
        </div>
        <div className="flex flex-row items-center lg:justify-between justify-center md:w-[50%] ">
          <div>Size</div>
          <div className="hidden lg:block">Last Modified</div>
        </div>
        <div className="w-[25%] flex justify-center">
          <div className="pr-3">Action</div>
        </div>
      </div>
      {datas.length >= 1 ? (
        datas.map((item, index) => (
          <FileCardItem
            key={index}
            name={shortenFileName(item.name, itemsToShow == 1 ? 14 : 30)}
            size={convertSize(item.size)}
            lastModified={item.lastmodified}
            url={item.url}
          />
        ))
      ) : (
        <div className="w-full flex justify-center items-center bg-[#9DB2BF] mt-[2px] rounded-md p-2 mb-4">
          No data available
        </div>
      )}
    </div>
  );
}

export default FileCard;
