"use client";
import React, { useEffect, useState } from "react";
import StorageCard from "./partials/StorageCard";
import { StorageInfo } from "@/app/utils/constants";
function Storage({ dataReceived }) {
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

  return (
    <div
      className={`w-full flex ${
        dataReceived == 1
          ? "flex-wrap"
          : "flex-row justify-between md:pr-[70px] pr-0"
      } md:gap-10 gap-4 mt-5`}
    >
      {dataReceived == 1
        ? StorageInfo.map((storage) => (
            <StorageCard
              key={storage.id}
              name={storage.name}
              capacity={storage.capacity}
              type={storage.type}
              image={storage.image}
              id={storage.id}
            />
          ))
        : StorageInfo.slice(0, itemsToShow).map((storage) => (
            <StorageCard
              key={storage.id}
              name={storage.name}
              capacity={storage.capacity}
              type={storage.type}
              image={storage.image}
              id={storage.id}
            />
          ))}
    </div>
  );
}

export default Storage;
