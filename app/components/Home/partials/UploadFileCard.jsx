import React, { useState, useEffect } from "react";
import { StorageInfo } from "@/app/utils/constants";
import ButtonUploadFile from "./ButtonUploadFile";
import { convertSize, shortenFileName } from "@/app/utils/functions";
import ButtonProgressBar from "./ButtonProgressBar";
import { storage } from "@/app/api/config/FirebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { getLimit } from "@/app/api/controllers/LimitUpload";
import { writeDataFirestore } from "@/app/api/controllers/Firestore";

function UploadFileCard() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedStorage, setSelectedStorage] = useState(StorageInfo[0]);
  const [showStorageOptions, setShowStorageOptions] = useState(false);
  const [files, setFiles] = useState([]);
  const [progressBar, setProgressBar] = useState(0);
  const [progressSuccess, setProgressSuccess] = useState(0);
  const [startProgress, setStartProgress] = useState(0);
  const [maxSizeFile, setMaxSizeFile] = useState("low");
  const [limit, setLimit] = useState(null);
  const dispatch = useDispatch();
  const maxSize = limit === 50 ? 50000000 : 1073741824;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getLimit(1);
        // Gunakan data di sini
        setLimit(data);
      } catch (error) {
        console.error(error);
      }
    }

    const interval = setInterval(() => {
      fetchData(); // Mengambil data secara berkala
    }, 1000); // Contoh polling setiap 5 detik

    return () => {
      clearInterval(interval); // Membersihkan interval saat komponen tidak lagi digunakan
    };
  }, []);

  const handleFileStorage = (storage) => {
    setSelectedStorage(storage);
    setShowStorageOptions(false);
  };
  const handleFileChange = (event) => {
    setMaxSizeFile("low");
    setProgressSuccess(0);
    setFiles(event.target.files);
    const files = event.target.files;
    const newSelectedFiles = [];

    for (const element of files) {
      newSelectedFiles.push({
        name: shortenFileName(element.name, 30), // Convert and shorten name here
        type: element.type,
        size: convertSize(element.size),
        sizeOriginal: element.size,
      });
    }

    setSelectedFiles(newSelectedFiles);
    if (newSelectedFiles.some((file) => file.sizeOriginal > maxSize)) {
      setMaxSizeFile("high");
    }
  };

  const handleUpload = async () => {
    const selectedFile = selectedFiles;
    dispatch({ type: "SELECTED_FILE", payload: selectedFile });
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
        // upload storage
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
          },
          (error) => {
            console.log("Error: ", error.code);
          },
          () => {
            const fileLength = files.length;
            if (files[fileLength - 1].name === file.name) {
              setProgressSuccess(1);
            }
            setProgressBar(0);
            getDownloadURL(uploadTask.snapshot.ref)
              .then(async (downloadURL) => {
                try {
                  // from controller
                  const docRef = "images";
                  await writeDataFirestore(
                    file.name,
                    downloadURL,
                    file.size,
                    docRef
                  );
                } catch (e) {
                  console.error("Error adding document: ", e);
                }

                // Move to the next file
                uploadFileAtIndex(index + 1);
              })
              .catch((error) => {
                console.log("Error: ", error.code);
              });
          }
        );
      };

      // Start uploading the first file
      uploadFileAtIndex(0);
    }
  };
  useEffect(() => {
    let intervalId;

    const checkProgress = () => {
      if (progressSuccess === 0) {
        intervalId = setTimeout(checkProgress, 5000); // Menjalankan kembali checkProgress setiap 5 detik
      } else if (progressSuccess === 1) {
        const dataShare = 1;
        dispatch({ type: "SET_SHARED_VARIABLE", payload: dataShare });
        clearInterval(intervalId); // Menghentikan perulangan jika progressSuccess menjadi 1
      }
    };

    checkProgress(); // Memanggil checkProgress untuk memulai perulangan

    return () => {
      // Membersihkan interval jika komponen unmount atau progressSuccess berubah
      clearInterval(intervalId);
    };
  }, [progressSuccess]);

  return (
    <div className="flex md:flex-row flex-col gap-3">
      <label
        htmlFor="upload"
        className="flex flex-col cursor-pointer justify-center mr-5 md:mr-0 border-2 border-dashed border-[#9DB2BF] mt-5 w-full md:w-96 h-52 items-center rounded-lg p-3"
      >
        <div className="flex flex-col justify-center items-center">
          <Image
            src={"/cloud-computing.png"}
            alt={"upload"}
            width={64}
            height={64}
          />
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
                <p
                  className={`font-semibold ${
                    file.sizeOriginal > maxSize
                      ? "line-through"
                      : "no-underline"
                  } `}
                >
                  {file.name}
                </p>
                <p
                  className={`${
                    file.sizeOriginal > maxSize ? "text-red-500" : "text-black"
                  } flex justify-between`}
                >
                  <span>Size: {file.size}</span>{" "}
                  {file.sizeOriginal > maxSize ? (
                    <span>maximum file size 50MB</span>
                  ) : (
                    ""
                  )}
                </p>
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
          {selectedFiles.map((file, index) => {
            if (file.sizeOriginal > maxSize) {
              console.error(
                `File ${file.name} terlalu besar. Ukuran maksimum adalah 50MB.`
              );
              return (
                <div key={index}>
                  {/* Display an error message for files larger than 50MB */}
                  <p>
                    {/* Error: File {file.name} is too large. Maximum size is 50MB. */}
                  </p>
                </div>
              );
            }
            // No return statement here to skip files that meet the else condition.
          })}

          {/* Upload code goes here (outside of the map function) */}
          <div>
            {/* Your code for uploading files that are not larger than 50MB */}
            <div className={`${maxSizeFile == "low" ? "block" : "hidden"}`}>
              {" "}
              <h2 className="text-lg font-medium">Selected Storage:</h2>
              <span
                onClick={() => setShowStorageOptions(!showStorageOptions)}
                className={`flex flex-row justify-between items-center p-2 mt-2 cursor-pointer bg-slate-100 rounded-lg ${
                  showStorageOptions ? "bg-blue-100" : ""
                }`}
              >
                <div className="flex justify-start items-center gap-2">
                  <Image
                    src={"/" + selectedStorage.image}
                    alt={selectedStorage.name}
                    width={40}
                    height={40}
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
                        <Image
                          src={"/" + storage.image}
                          alt={storage.name}
                          width={40}
                          height={40}
                        />

                        <p>{storage.name}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadFileCard;
