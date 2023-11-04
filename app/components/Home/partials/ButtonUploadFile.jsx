import React from "react";

function ButtonUploadFile({ startProgress, handleUpload }) {
  return (
    <button
      disabled={startProgress === 1 ? true : false}
      onClick={handleUpload}
      className={`flex w-full  flex-row bg-[#ADC4CE] justify-center items-center p-2 mt-2 ${
        startProgress == 1 ? "cursor-not-allowed" : "cursor-pointer"
      }  rounded-lg`}
    >
      {startProgress == 1 ? `Uploading please wait...` : `Upload`}
    </button>
  );
}

export default ButtonUploadFile;
