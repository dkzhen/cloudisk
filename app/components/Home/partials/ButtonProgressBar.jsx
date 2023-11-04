import React from "react";

function ButtonProgressBar({ startProgress, progress, progressSuccess }) {
  return (
    startProgress == 1 && (
      <div className="flex w-full flex-row striped-background justify-start items-center h-10 mt-2 cursor-pointer  rounded-lg">
        <div
          style={{ width: progressSuccess === 0 && `${progress}%` }}
          className={`${
            progressSuccess === 1 ? "bg-green-400" : "bg-[#adc4ce]"
          } ${progressSuccess === 1 && "w-full"} h-full rounded-lg flex ${
            progressSuccess === 1 ? `justify-center` : "justify-start"
          } items-center transition-width duration-300 ease-in-out`}
        >
          {progressSuccess == 0 && (
            <div className="ml-2  bg-white max-w-20 px-2 rounded-xl justify-center items-center flex">
              {progress}%
            </div>
          )}

          {progressSuccess == 1 && <div>Upload Completed</div>}
        </div>
      </div>
    )
  );
}

export default ButtonProgressBar;
