"use client";
import React, { useState } from "react";
import StorageCard from "./parts/StorageCard";
import { StorageInfo } from "@/utils/constants";
import { responsiveDesign } from "@/utils/functions";
function Storage({ dataReceived }) {
  const [itemsToShow, setItemsToShow] = useState(1);

  responsiveDesign(setItemsToShow);

  return (
    <div
      className={`w-full flex ${
        dataReceived == 1
          ? "flex-wrap"
          : "flex-row justify-between md:pr-[70px] pr-0"
      } md:gap-10 gap-4 mt-5`}
    >
      {dataReceived == 1
        ? StorageInfo.map((storage, index) => (
            <StorageCard
              key={index}
              name={storage.name}
              capacity={storage.capacity}
              type={storage.type}
              image={storage.image}
              id={storage.id}
            />
          ))
        : StorageInfo.slice(0, itemsToShow).map((storage, index) => (
            <StorageCard
              key={index}
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
