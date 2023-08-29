"use client";
import Image from "next/image";
import { SideBar } from "../components/Home";
import FileUploader from "./FileUploader";

function Stat() {
  return (
    <main>
      <aside className="fixed">
        <SideBar />
      </aside>
      <div className="ml-28">
        <h1>File Uploader</h1>
        {/* <FileUploader /> */}
        {/* <img />
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/zhen-702f1.appspot.com/o/3695752.webp"
          alt="hqlo"
          width={40}
          height={40}
        /> */}
      </div>
    </main>
  );
}

export default Stat;
