import {
  getDatabase,
  ref,
  child,
  set,
  onValue,
  get,
  update,
} from "firebase/database";
const db = getDatabase();

export async function writeLimit(limitUpload, id) {
  try {
    // Coba untuk mengambil data di bawah node "limit/id"
    const dbRef = ref(getDatabase());
    get(child(dbRef, `limit/${id}`))
      .then(async (snapshot) => {
        if (snapshot.exists()) {
          const updates = {};
          updates["/limit/" + id] = limitUpload;
          await update(ref(db), updates);
        } else {
          console.log("No data available");
          await set(ref(db, "limit/" + id), {
            limit: limitUpload,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error("Terjadi kesalahan saat menulis data:", error);
  }
}

export async function getLimit(id) {
  const starCountRef = ref(db, "limit/" + id);

  return new Promise((resolve, reject) => {
    onValue(starCountRef, (snapshot) => {
      if (snapshot.exists()) {
        resolve(snapshot.val());
      } else {
        reject(new Error("Data not found"));
      }
    });
  });
}
