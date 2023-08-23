"use client";
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
        <FileUploader />
        <img
          src="https://firebasestorage.googleapis.com/v0/b/zhen-702f1.appspot.com/o/3695752.webp"
          alt=""
        />
      </div>
    </main>
  );
}

export default Stat;
