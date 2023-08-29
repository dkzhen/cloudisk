import Image from "next/image";
import React from "react";

function FileCardItem({ name, size, lastModified, url }) {
  const handleDownload = () => {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = name; // Nama file yang akan diunduh
    anchor.style.display = "none"; // Menyembunyikan elemen anchor
    document.body.appendChild(anchor); // Menambahkan elemen anchor ke dalam dokumen

    anchor.click(); // Simulasi klik pada elemen anchor

    document.body.removeChild(anchor); // Menghapus elemen anchor setelah selesai
  };
  return (
    <div className="flex flex-row items-center justify-between h-12 rounded-md mt-[2px] bg-[#9DB2BF]">
      <div className="pl-3 flex flex-row gap-3 w-[53%] md:w-[50%]  ">
        <Image src={"/drive.png"} alt="type" width={30} height={30} />
        <p>{name}</p>
      </div>
      <div className="flex flex-row items-center place-items-end justify-center lg:justify-between   md:w-[50%]  ">
        <div className="">{size}</div>
        <div className="hidden lg:block">{lastModified}</div>
      </div>
      <div className="w-[25%] flex justify-center ">
        <button
          onClick={handleDownload}
          className="pr-3 bg-blue-300 p-2 rounded-lg"
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default FileCardItem;
