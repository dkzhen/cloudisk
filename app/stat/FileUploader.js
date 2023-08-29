// // FileUploader.js
// import React, { useState, useEffect } from "react";
// import { db, storage } from "@/config/FirebaseConfig";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { collection, addDoc } from "firebase/firestore/lite";
// import axios from "axios";

// const FileUploader = () => {
//   const [files, setFiles] = useState([]);
//   const [downloadLink, setDownloadLink] = useState([]);
//   const [progressBar, setProgressBar] = useState(0);

//   const handleFileChange = (e) => {
//     setFiles(e.target.files);
//   };
//   const accessToken =
//     "sl.BktnZGl656LOlptXKZWNR4lg7se_jplcxdI1GSmIwq-X5q81gnUVT5hQLLF0veMGdWIK_OsAbWIJls6kZutOXQgiqd6a3EMcwcoIe3ijx27v1J4zqWuG5oeH5UMBYBs21MvD88_IOrs11jjYfFKhz0M";

//   const generateSharableLink = async (path) => {
//     const headers = {
//       Authorization: `Bearer ${accessToken}`,
//       "Content-Type": "application/json",
//     };
//     try {
//       const response = await axios.post(
//         "https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings",
//         {
//           path,
//           settings: {
//             requested_visibility: { ".tag": "public" },
//           },
//         },
//         { headers }
//       );
//       console.log("url download: ", response.data.url);
//       return response.data.url;
//     } catch (error) {
//       console.error("Error generating sharable link:", error);
//       return null;
//     }
//   };
//   let totalProgress = 0;
//   const handleUpload = () => {
//     for (let i = 0; i < files.length; i++) {
//       console.log(files[i]);

//       const headers = {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/octet-stream",
//         "Dropbox-API-Arg": JSON.stringify({
//           path: `/file/${files[i].name}`,
//           mode: "add",
//           autorename: true,
//           mute: false,
//         }),
//       };

//       axios
//         .post("https://content.dropboxapi.com/2/files/upload", files[i], {
//           headers,
//         })
//         .then(async (response) => {
//           const downloadLink = await generateSharableLink(
//             response.data.path_display
//           );
//           setDownloadLink(downloadLink);
//           console.log("File uploaded:", response.data);
//         })
//         .catch((error) => {
//           console.error("Error uploading file:", error);
//         });
//     }
//   };

//   const [spaceUsage, setSpaceUsage] = useState(null);

//   useEffect(() => {
//     const fetchSpaceUsage = async () => {
//       const headers = {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       };

//       try {
//         const response = await axios.post(
//           "https://api.dropboxapi.com/2/users/get_space_usage",
//           {},
//           { headers }
//         );
//         setSpaceUsage(response.data);
//         console.log("Space usage:", response.data);
//       } catch (error) {
//         console.error("Error fetching space usage:", error);
//       }
//     };

//     fetchSpaceUsage();
//   }, [accessToken]);

//   // const handleUpload = async () => {
//   //   if (files.length > 0) {
//   //     try {
//   //     } catch (error) {}
//   //     for (const file of files) {
//   //       const metadata = {
//   //         contentType: file.type,
//   //       };

//   //       // Upload file and metadata to the object 'images/mountains.jpg'
//   //       const storageRef = ref(storage, "images/" + file.name);
//   //       const uploadTask = uploadBytesResumable(storageRef, file, metadata);

//   //       // Listen for state changes, errors, and completion of the upload.
//   //       uploadTask.on(
//   //         "state_changed",
//   //         (snapshot) => {
//   //           // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//   //           const individualProgress =
//   //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

//   //           // Calculate the updated total progress
//   //           totalProgress = (totalProgress + individualProgress) / files.length;
//   //           console.log("Total Upload Progress: " + totalProgress + "%");
//   //           setProgressBar(totalProgress);
//   //           switch (snapshot.state) {
//   //             case "paused":
//   //               console.log("Upload is paused");
//   //               break;
//   //             case "running":
//   //               console.log("Upload is running");

//   //               break;
//   //           }
//   //         },
//   //         (error) => {
//   //           // A full list of error codes is available at
//   //           // https://firebase.google.com/docs/storage/web/handle-errors
//   //           switch (error.code) {
//   //             case "storage/unauthorized":
//   //               // User doesn't have permission to access the object
//   //               break;
//   //             case "storage/canceled":
//   //               // User canceled the upload
//   //               break;
//   //             case "storage/unknown":
//   //               // Unknown error occurred, inspect error.serverResponse
//   //               break;
//   //           }
//   //         },
//   //         () => {
//   //           const fileLength = files.length;
//   //           // Upload completed successfully, now we can get the download URL\
//   //           console.log(files[fileLength - 1].name);
//   //           if (files[fileLength - 1].name === file.name) {
//   //             console.log("Download sukses");
//   //           }
//   //           setProgressBar(0);
//   //           getDownloadURL(uploadTask.snapshot.ref)
//   //             .then(async (downloadURL) => {
//   //               console.log("File available at", downloadURL);
//   //               try {
//   //                 const docRef = await addDoc(collection(db, "images"), {
//   //                   name: file.name,
//   //                   url: downloadURL,
//   //                   size: file.size,
//   //                 });
//   //                 console.log("Document written with ID: ", docRef.id);
//   //               } catch (e) {
//   //                 console.error("Error adding document: ", e);
//   //               }
//   //               // Insert url into an <img> tag to "download"
//   //             })
//   //             .catch((error) => {
//   //               // A full list of error codes is available at
//   //               // https://firebase.google.com/docs/storage/web/handle-errors
//   //               switch (error.code) {
//   //                 case "storage/object-not-found":
//   //                   // File doesn't exist
//   //                   break;
//   //                 case "storage/unauthorized":
//   //                   // User doesn't have permission to access the object
//   //                   break;
//   //                 case "storage/canceled":
//   //                   // User canceled the upload
//   //                   break;
//   //                 case "storage/unknown":
//   //                   // Unknown error occurred, inspect the server response
//   //                   break;
//   //               }
//   //             });
//   //         }
//   //       );
//   //     }
//   //   }
//   // };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} multiple />
//       <button onClick={handleUpload}>Upload</button>
//       <div>Progress {progressBar}%</div>
//       <div>Link {downloadLink}</div>
//       <div>Link {spaceUsage}</div>
//       <a href={downloadLink}>Download</a>
//     </div>
//   );
// };

// export default FileUploader;
