import { getTypeImage } from "@/app/utils/functions";
import Image from "next/image";
import React, { useState } from "react";
import ModalDelete from "../../Home/partials/ModalDelete";
import {
  deleteDataFirestore,
  writeDataFirestore,
} from "@/app/api/controllers/Firestore";

function FileProItem({ nameOriginal, url, size, lastModified, docID }) {
  const [openModal, setOpenModal] = useState(false);

  let typeImage = getTypeImage(nameOriginal);

  const handleDelete = async () => {
    setOpenModal(false);
    try {
      await writeDataFirestore(nameOriginal, url, size, "delete");
      await deleteDataFirestore(docID);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="bg-[#9DB2BF] w-full mb-2 p-2 rounded-lg flex flex-row justify-between ">
        <div className="w-[75%] flex-row flex items-center space-x-2">
          {" "}
          <Image
            src={`/icons/${typeImage}`}
            alt="type"
            width={30}
            height={30}
          />
          <div className="h-full w-[75%] overflow-hidden">{nameOriginal}</div>
        </div>
        <div className="flex flex-row justify-between space-x-3 items-center  w-[25%] md:mr-5  ">
          <div className="ml-5 hidden md:block">{lastModified}</div>
          <div className="flex flex-row justify-center space-x-2 md:space-x-3">
            <div
              className="cursor-pointer"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {openModal ? (
        <ModalDelete
          dataModal={(data) => {
            setOpenModal(data);
          }}
          onConfirm={handleDelete}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default FileProItem;
