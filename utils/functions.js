const convertSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const shortenFileName = (name, maxLength) => {
  if (name.length <= maxLength) return name;
  const frontChars = Math.floor((maxLength - 3) / 2);
  const backChars = Math.ceil((maxLength - 3) / 2);
  return (
    name.substr(0, frontChars) + "..." + name.substr(name.length - backChars)
  );
};

const fetchDataFirestore = async (getDocs, collection, db) => {
  const querySnapshot = await getDocs(collection(db, "images"));
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({
      name: doc.data().name,
      size: doc.data().size,
      url: doc.data().url,
      lastmodified: doc.data().lastmodified,
    });
  });
  return data;
};
let typeImage;
const getTypeImage = (item) => {
  switch (true) {
    case /\.png|webp|giv$/.test(item):
      return (typeImage = `png-canva.png`);
    case /\.jpg|jpeg|bmp|tiff|heif$/.test(item):
      return (typeImage = `jpg-canva.png`);
    case /\.pdf$/.test(item):
      return (typeImage = `pdf-canva.png`);
    case /\.doc|docx$/.test(item):
      return (typeImage = `doc-canva.png`);
    case /\.txt$/.test(item):
      return (typeImage = `txt-canva.png`);
    case /\.xls$/.test(item):
      return (typeImage = `xls-canva.png`);
    case /\.xlsx$/.test(item):
      return (typeImage = `xlsx-canva.png`);
    case /\.csv$/.test(item):
      return (typeImage = `csv-canva.png`);
    case /\.fla$/.test(item):
      return (typeImage = `fla-canva.png`);
    case /\.ipynb$/.test(item):
      return (typeImage = `ipynb-canva.png`);
    case /\.java$/.test(item):
      return (typeImage = `java-canva.png`);
    case /\.mp3$/.test(item):
      return (typeImage = `mp3-canva.png`);
    case /\.mp4$/.test(item):
      return (typeImage = `mp4-canva.png`);
    case /\.ppt|pptx$/.test(item):
      return (typeImage = `ppt-canva.png`);
    case /\.sql$/.test(item):
      return (typeImage = `sql-canva.png`);
    case /\.svg$/.test(item):
      return (typeImage = `svg-canva.png`);
    case /\.xml$/.test(item):
      return (typeImage = `xml-canva.png`);
    case /\.zip|rar|7zip|tar|gz$/.test(item):
      return (typeImage = `zip-canva.png`);
    default:
      return (typeImage = `file-canva.png`);
  }
};
export {
  convertSize,
  shortenFileName,
  fetchDataFirestore,
  getTypeImage,
  typeImage,
};
