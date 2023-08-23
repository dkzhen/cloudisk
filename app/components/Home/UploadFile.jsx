import React from "react";
import UploadFileCard from "./parts/UploadFileCard";

function UploadFile() {
  return (
    <div className="flex gap-5 flex-col pr-6 ">
      <div className="w-full">
        <UploadFileCard />
      </div>
    </div>
  );
}

export default UploadFile;
