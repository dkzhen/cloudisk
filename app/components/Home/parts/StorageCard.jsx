import Image from "next/image";
import React from "react";

function StorageCard({ name, capacity, type, image, id }) {
  return (
    <div className="flex flex-col justify-start mr-5 md:mr-0 bg-[#9DB2BF] w-96 h-52 items-start rounded-lg p-3">
      <div className="flex flex-row gap-3 justify-center items-center ">
        <Image
          src={`/${image}`}
          className=" bg-white rounded-lg"
          alt={"logo-storage"}
          width={56}
          height={56}
        />
        <span className="text-lg font-bold">
          {name} {id}
        </span>
      </div>
      <div className="flex flex-row justify-between mt-8 mb-3 w-full px-3">
        <div>40 {type}</div>
        <div>
          {capacity} {type}
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-lg overflow-hidden">
        <div className="bg-red-500 h-4 w-[60%]"></div>
      </div>
      <div className="font-Dancing text-sm font-normal mt-2">
        Storage is powered by {name}{" "}
      </div>
    </div>
  );
}

export default StorageCard;
