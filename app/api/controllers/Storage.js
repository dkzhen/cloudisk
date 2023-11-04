import { getStorage, ref, deleteObject } from "firebase/storage";

const storage = getStorage();

export const deleteStorage = async () => {
  const desertRef = ref(storage, "images/results.pdf");
  await deleteObject(desertRef)
    .then(() => {
      // File deleted successfully
      console.log("File Storage deleted successfully");
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      console.error(error);
    });
};
