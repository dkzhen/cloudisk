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
      const ref = "images";
      const dataFirestore = await fetchDataFirestore(ref);
      dataFirestore.sort(
        (a, b) => new Date(b.lastmodified) - new Date(a.lastmodified)
      );
      setDatas(dataFirestore);
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
      ) : (
        <div className="w-full flex justify-center items-center bg-[#9DB2BF] mt-[2px] rounded-md p-2 mb-4">
          No data available
        </div>
      )}
    </div>
  );
}

export default FileCard;
