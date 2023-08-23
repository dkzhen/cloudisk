// FileUploader.js
import React, { useState } from "react";
import { db, storage } from "@/config/FirebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore/lite";

const FileUploader = () => {
  const [files, setFiles] = useState([]);
  const [progressBar, setProgressBar] = useState(0);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
    console.log(process.env.API_KEY);
  };
  let totalProgress = 0;
  const handleUpload = async () => {
    if (files.length > 0) {
      try {
      } catch (error) {}
      for (const file of files) {
        const metadata = {
          contentType: file.type,
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, "images/" + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const individualProgress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            // Calculate the updated total progress
            totalProgress = (totalProgress + individualProgress) / files.length;
            console.log("Total Upload Progress: " + totalProgress + "%");
            setProgressBar(totalProgress);
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");

                break;
            }
          },
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
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
            // Upload completed successfully, now we can get the download URL\
            console.log(files[fileLength - 1].name);
            if (files[fileLength - 1].name === file.name) {
              console.log("Download sukses");
            }
            setProgressBar(0);
            getDownloadURL(uploadTask.snapshot.ref)
              .then(async (downloadURL) => {
                console.log("File available at", downloadURL);
                try {
                  const docRef = await addDoc(collection(db, "images"), {
                    name: file.name,
                    url: downloadURL,
                    size: file.size,
                  });
                  console.log("Document written with ID: ", docRef.id);
                } catch (e) {
                  console.error("Error adding document: ", e);
                }
                // Insert url into an <img> tag to "download"
              })
              .catch((error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
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
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple />
      <button onClick={handleUpload}>Upload</button>
      <div>Progress {progressBar}%</div>
    </div>
  );
};

export default FileUploader;
