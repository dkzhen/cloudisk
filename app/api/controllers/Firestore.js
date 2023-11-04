import { db } from "@/app/api/config/FirebaseConfig";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
} from "firebase/firestore/lite";

export const fetchDataFirestore = async (ref) => {
  const querySnapshot = await getDocs(collection(db, ref));
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({
      docID: doc.id,
      name: doc.data().name,
      size: doc.data().size,
      url: doc.data().url,
      lastmodified: doc.data().lastmodified,
    });
  });
  return data;
};

export const deleteDataFirestore = async (docID) => {
  const docRef = doc(db, "images", docID);

  try {
    // Attempt to delete the document.
    await deleteDoc(docRef);
    console.log("Document successfully deleted.");
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

export const writeDataFirestore = async (name, downloadURL, size, ref) => {
  const datenow = new Date();
  const dateFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = datenow.toLocaleDateString("en-US", dateFormatOptions);
  await addDoc(collection(db, ref), {
    name: name,
    url: downloadURL,
    size: size,
    lastmodified: formattedDate,
  });
};
