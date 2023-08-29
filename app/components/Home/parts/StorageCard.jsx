import Image from "next/image";
import React, { useState, useEffect } from "react";
import { db } from "@/config/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore/lite";
import { convertSize, fetchDataFirestore } from "@/utils/functions";

function StorageCard({ name, capacity, type, image, id }) {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const dataFirestore = await fetchDataFirestore(getDocs, collection, db);
      setDatas(dataFirestore);
    };
    getData();
  }, []);
  let totalSize = 0;
  const gbBytes = 1073741824;
  let capSize = capacity * gbBytes;
  for (const array of datas) {
    const arraySize = array.size;
    totalSize += arraySize;
  }
  let persentase = (totalSize / capSize) * 100;
  const roundPersentase = Math.round(persentase);

  return (
    <div className="flex flex-col justify-start mr-5 md:mr-0 bg-[#9DB2BF] w-96 h-52 items-start rounded-lg p-3">
      <div className="flex flex-row gap-3 justify-center items-center ">
        <Image
          src={`/${image}`}
          className=" bg-white rounded-lg w-[56px] h-[56px]"
          alt={"logo-storage"}
          width={56}
          height={56}
        />
        <span className="text-lg font-bold">
          {name} {id}
        </span>
      </div>
      <div className="flex flex-row justify-between mt-8 mb-3 w-full px-3">
        <div>{convertSize(totalSize)}</div>
        <div>
          {capacity} {type}
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-lg overflow-hidden">
        <div
          className="bg-red-500 h-4 "
          style={{ width: `${roundPersentase}%` }}
        ></div>
      </div>
      <div className="font-Dancing text-sm font-normal mt-2">
        Storage is powered by {name}{" "}
      </div>
    </div>
  );
}

export default StorageCard;
