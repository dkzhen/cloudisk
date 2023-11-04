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

const getTypeImage = (item) => {
  const extension = item.split(".").pop().toLowerCase();

  if (extensionMap.hasOwnProperty(extension)) {
    return extensionMap[extension];
  }

  return "file-canva.png";
};

import { useEffect } from "react";
import { extensionMap } from "./constants";
// sm :1 ,md :2 ,lg :3
const responsiveDesign = (setItemsToShow) => {
  useEffect(() => {
    function updateItemsToShow() {
      if (window.innerWidth >= 1024) {
        setItemsToShow(3);
      } else if (window.innerWidth >= 768) {
        setItemsToShow(2);
      } else {
        setItemsToShow(1);
      }
    }

    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);

    return () => {
      window.removeEventListener("resize", updateItemsToShow);
    };
  }, []);
};

const onScrolling = (setScrolling) => {
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
};

export {
  convertSize,
  shortenFileName,
  getTypeImage,
  responsiveDesign,
  onScrolling,
};
