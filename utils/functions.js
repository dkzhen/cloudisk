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
export { convertSize, shortenFileName };
