"use client";
import React, { useEffect, useState } from "react";
import FileCardItem from "./FileCardItem";
import { shortenFileName, convertSize } from "@/app/utils/functions";
import { useSelector } from "react-redux";
import { fetchDataFirestore } from "@/app/api/controllers/Firestore";

function FileCard() {
  const [datas, setDatas] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(1);
  const sharedVariable = useSelector((state) => state.sharedVariable);
  const [searchText, setSearchText] = useState("");
  const [searchToShow, setSearchToShow] = useState([]);
  const [quotaLimit, setQuotaLimit] = useState(false);

  // responsive design
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

  // fetch data from Firestore
  useEffect(() => {
    const getData = async () => {
      try {
        const ref = "images";
        const dataFirestore = await fetchDataFirestore(ref);
        dataFirestore.sort(
          (a, b) => new Date(b.lastmodified) - new Date(a.lastmodified)
        );
        setDatas(dataFirestore);
        setQuotaLimit(true);
        // console.log("firebase");
      } catch (error) {
        setQuotaLimit(false);
        // console.error("Firebase Quota exceeded.");
      }
    };
    getData();

    // Call getNewData only when sharedVariable changes to 1
    if (sharedVariable === 1) {
      console.log(sharedVariable);
    }
  }, [sharedVariable]);
  // filter datas

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchText(searchTerm);

    // Membersihkan spasi dan tanda baca dari searchTerm
    const cleanedSearchTerm = searchTerm.replace(/[\W_]+/g, "");
    // Simpan data yang sesuai dengan pencarian dalam state dataToShow
    setSearchToShow(
      datas.filter((item) => {
        const cleanedName = item.name.toLowerCase().replace(/[\W_]+/g, "");
        return cleanedName.includes(cleanedSearchTerm);
      })
    );
  };

  return (
    <div className="w-full flex flex-col mb-4 ">
      <input
        type="search"
        placeholder="Search..."
        className="flex-grow px-2 h-12 mt-4 focus:outline-none bg-[#d7e9f4] rounded-md"
        value={searchText}
        onChange={handleSearchChange}
      />

      <div className="flex flex-row items-center justify-between h-8 mt-5 font-bold bg-[#9DB2BF] rounded-md">
        <div className="pl-3 flex flex-row gap-3 w-[50%] md:w-[50%] ">
          <span>Name</span>
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
        searchText.length > 0 ? (
          searchToShow.map((item) => (
            <FileCardItem
              key={item.docID}
              name={shortenFileName(item.name, itemsToShow == 1 ? 14 : 30)}
              size={convertSize(item.size)}
              nameOriginal={item.name}
              lastModified={item.lastmodified}
              url={item.url}
              docID={item.docID}
            />
          ))
        ) : (
          datas.map((item) => (
            <FileCardItem
              key={item.docID}
              name={shortenFileName(item.name, itemsToShow == 1 ? 14 : 30)}
              nameOriginal={item.name}
              size={convertSize(item.size)}
              lastModified={item.lastmodified}
              url={item.url}
              docID={item.docID}
            />
          ))
        )
      ) : quotaLimit ? (
        <div className="w-full flex justify-center items-center bg-[#9DB2BF] mt-[2px] rounded-md p-2 mb-4">
          No data available
        </div>
      ) : (
        <div
          className="flex items-center p-4 mb-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 mr-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Warning!</span> Firebase Quota
            exceeded.
          </div>
        </div>
      )}
    </div>
  );
}

export default FileCard;
