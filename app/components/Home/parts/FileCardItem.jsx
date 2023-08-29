import Image from "next/image";
import React from "react";

function FileCardItem({ name, size, lastModified, url }) {
  const [downloadUrl, setDownloadUrl] = useState(url);
  const handleDownload = () => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const downloadUrl = URL.createObjectURL(blob);
        setDownloadUrl(downloadUrl);

        const anchor = document.createElement("a");
        anchor.href = downloadUrl;
        anchor.download = name;
        anchor.style.display = "none";
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
      });
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
