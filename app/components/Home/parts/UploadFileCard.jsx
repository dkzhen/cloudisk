import React, { useState } from "react";
import { StorageInfo } from "@/utils/constants";
import ButtonUploadFile from "./ButtonUploadFile";
import { convertSize, shortenFileName } from "@/utils/functions";
import ButtonProgressBar from "./ButtonProgressBar";
import { db, storage } from "@/config/FirebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore/lite";

function UploadFileCard() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedStorage, setSelectedStorage] = useState(StorageInfo[0]);
  const [showStorageOptions, setShowStorageOptions] = useState(false);
  const [files, setFiles] = useState([]);
  const [progressBar, setProgressBar] = useState(0);
  const [progressSuccess, setProgressSuccess] = useState(0);
  const [startProgress, setStartProgress] = useState(0);

  const handleFileStorage = (storage) => {
    setSelectedStorage(storage);
    setShowStorageOptions(false);
  };
  const handleFileChange = (event) => {
    setProgressSuccess(0);
    setFiles(event.target.files);
    const files = event.target.files;
    const newSelectedFiles = [];

    for (let i = 0; i < files.length; i++) {
      newSelectedFiles.push({
        name: shortenFileName(files[i].name, 30), // Convert and shorten name here
        type: files[i].type,
        size: convertSize(files[i].size),
      });
    }

    setSelectedFiles(newSelectedFiles);
  };
  const handleUpload = async () => {
    setStartProgress(1);
    setProgressSuccess(0);
    if (files.length > 0) {
      const uploadFileAtIndex = async (index) => {
        if (index >= files.length) {
          setTimeout(() => {
            setProgressSuccess(0);
            setStartProgress(0);
            setSelectedFiles([]);
          }, 3000);
          return;
        }

        const file = files[index];
        const metadata = {
          contentType: file.type,
        };
        const storageRef = ref(storage, "images/" + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const individualProgress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            const totalProgress =
              (individualProgress + index * 100) / files.length;
            console.log("Total Upload Progress: " + totalProgress + "%");
            setProgressBar(Math.floor(totalProgress));
            switch (snapshot.state) {
              case "paused":
                // console.log("Upload is paused");
                break;
              case "running":
                // console.log("Upload is running");
                break;
            }
          },
          (error) => {
            switch (error.code) {
              case "storage/unauthorized":
                // User doesn't have permission to access the object
                break;
              case "storage/canceled":
                // User canceled the upload
                break;
              case "storage/unknown":
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          },
          () => {
            const fileLength = files.length;
            if (files[fileLength - 1].name === file.name) {
              setProgressSuccess(1);
              // console.log("Upload success for file: " + file.name);
            }
            setProgressBar(0);
            getDownloadURL(uploadTask.snapshot.ref)
              .then(async (downloadURL) => {
                // console.log("File available at", downloadURL);
                try {
                  const docRef = await addDoc(collection(db, "images"), {
                    name: file.name,
                    url: downloadURL,
                    size: file.size,
                  });
                  // console.log("Document written with ID: ", docRef.id);
                } catch (e) {
                  console.error("Error adding document: ", e);
                }

                // Move to the next file
                uploadFileAtIndex(index + 1);
              })
              .catch((error) => {
                switch (error.code) {
                  case "storage/object-not-found":
                    // File doesn't exist
                    break;
                  case "storage/unauthorized":
                    // User doesn't have permission to access the object
                    break;
                  case "storage/canceled":
                    // User canceled the upload
                    break;
                  case "storage/unknown":
                    // Unknown error occurred, inspect the server response
                    break;
                }
              });
          }
        );
      };

      // Start uploading the first file
      uploadFileAtIndex(0);
    }
  };

  return (
    <div className="flex md:flex-row flex-col gap-3">
      <label
        htmlFor="upload"
        className="flex flex-col cursor-pointer justify-center mr-5 md:mr-0 border-2 border-dashed border-[#9DB2BF] mt-5 w-full md:w-96 h-52 items-center rounded-lg p-3"
      >
        <div className="flex flex-col justify-center items-center">
          <img src="/cloud-computing.png" alt="upload" className="w-16 h-16" />
          <p>Upload Files</p>
        </div>
        <input
          type="file"
          id="upload"
          multiple
          hidden
          onChange={handleFileChange}
        />
      </label>
      {selectedFiles.length == 0 ? (
        ""
      ) : (
        <div className="w-full md:w-96 mt-3 ">
          <h2 className="text-lg font-medium">Selected Files:</h2>
          <ul className="mt-2 space-y-1 max-h-[180px] border-2 border-dashed border-[#9DB2BF]  overflow-y-scroll bg-slate-100 rounded-lg p-2">
            {selectedFiles.slice(0, 3).map((file, index) => (
              <li key={index}>
                <p className="font-semibold">{file.name}</p>
                <p>Size: {file.size}</p>
              </li>
            ))}
            {selectedFiles.length > 3 && (
              <li className="font-medium text-[#666666]">
                + {selectedFiles.length - 3} more files
              </li>
            )}
          </ul>
        </div>
      )}
      {selectedFiles.length > 0 && (
        <div className="w-full md:w-96 mt-3">
          <h2 className="text-lg font-medium">Selected Storage:</h2>
          <span
            onClick={() => setShowStorageOptions(!showStorageOptions)}
            className={`flex flex-row justify-between items-center p-2 mt-2 cursor-pointer bg-slate-100 rounded-lg ${
              showStorageOptions ? "bg-blue-100" : ""
            }`}
          >
            <div className="flex justify-start items-center gap-2">
              <img
                src={selectedStorage.image}
                alt={selectedStorage.name}
                className="w-10 h-10"
              />
              <p>{selectedStorage.name}</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 ${
                showStorageOptions ? "transform rotate-180" : ""
              }`}
            >
              <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
          {!showStorageOptions && (
            <ButtonUploadFile
              handleUpload={handleUpload}
              startProgress={startProgress}
            />
          )}
          {!showStorageOptions && (
            <ButtonProgressBar
              progress={progressBar}
              progressSuccess={progressSuccess}
              startProgress={startProgress}
            />
          )}
          {showStorageOptions && (
            <ul className="mt-2 space-y-2 overflow-auto h-[118px]  overflow-y-scroll bg-slate-100 rounded-lg p-2">
              {StorageInfo.map((storage, index) => (
                <li
                  key={index}
                  onClick={() => handleFileStorage(storage)}
                  className={`cursor-pointer ${
                    selectedStorage === storage ? "font-semibold" : ""
                  }`}
                >
                  <div className="flex justify-start items-center gap-2">
                    <img
                      src={storage.image}
                      alt={storage.name}
                      className="w-10 h-10"
                    />
                    <p>{storage.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default UploadFileCard;
