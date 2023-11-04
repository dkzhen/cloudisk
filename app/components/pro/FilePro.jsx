import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchDataFirestore } from "@/app/api/controllers/Firestore";
import FileProItem from "./partials/FileProItem";
function FilePro() {
  const [datas, setDatas] = useState([]);
  const sharedVariable = useSelector((state) => state.sharedVariable);
  const [searchText, setSearchText] = useState("");
  const [searchToShow, setSearchToShow] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const dataDelete = useSelector((state) => state.onSuccess);

  useEffect(() => {
    const getData = async () => {
      const ref = "images";
      const dataFirestore = await fetchDataFirestore(ref);
      dataFirestore.sort(
        (a, b) => new Date(b.lastmodified) - new Date(a.lastmodified)
      );
      setDatas(dataFirestore);
    };
    getData();

    // Call getNewData only when sharedVariable changes to 1
    if (sharedVariable === 1) {
      console.log(sharedVariable);
    }
  }, [sharedVariable]);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchText(searchTerm);

    // Membersihkan spasi dan tanda baca dari searchTerm
    const cleanedSearchTerm = searchTerm.replace(/[\W_]+/g, "");
    // Simpan data yang sesuai dengan pencarian dalam state dataToShow
    setSearchToShow(
      datas.filter((item) => {
        const cleanedName = item.name.toLowerCase().replace(/[\W_]+/g, "");
        return cleanedName.includes(cleanedSearchTerm);
      })
    );
  };

  return (
    <div className="w-full border-b-2 border-[#F8F0E5] pr-5 flex flex-col mr-5 md:pr-16">
      <div className="w-full flex flex-col mb-4 ">
        <input
          type="search"
          placeholder="Search..."
          className="flex-grow px-2 h-12 mt-4 focus:outline-none bg-[#eceff0] rounded-md"
          value={searchText}
          onChange={handleSearchChange}
        />

        <div className="flex flex-row items-center justify-between h-12 mt-3 font-bold bg-[#fdfdfd] rounded-md mb-2">
          <div className="pl-3 flex flex-row gap-3 w-[75%] ">
            <p></p>
          </div>
          <div className="w-[25%] flex justify-center md:justify-end space-x-3 md:space-x-7">
            <div
              onClick={async () => {
                showAll === true ? setShowAll(!showAll) : "";
                setLoading(true);
                const dataFirestore = await fetchDataFirestore("images");
                dataFirestore.sort(
                  (a, b) => new Date(b.lastmodified) - new Date(a.lastmodified)
                );
                setDatas(dataFirestore);
                setTimeout(() => {
                  setLoading(false);
                }, 1000);
              }}
              className="cursor-pointer p-2 rounded-lg hover:bg-[#f6efef]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-green-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
                />
              </svg>
            </div>
            <div
              onClick={() => {
                setLoading(true);
                setShowAll(!showAll);
                setTimeout(() => {
                  setLoading(false);
                }, 1000);
              }}
              className="md:mr-5 mr-5 cursor-pointer p-2 rounded-lg hover:bg-[#f6efef]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                />
              </svg>
            </div>
          </div>
        </div>
        {dataDelete === true ? (
          <div
            className="mt-4 flex items-center p-4 mb-4 text-sm  bg-gray-800 text-green-400 rounded-lg"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 mr-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Success!</span> delete file
              successfully
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="flex flex-row  justify-between h-8 md:h-full lg:h-8 items-center mt-3 font-bold bg-[#9DB2BF] rounded-md mb-2">
          <div className="pl-3 flex flex-row gap-3 w-[75%] ">
            <p>Name</p>
          </div>
          <div className="w-[25%] flex justify-between items-center ">
            <div className="pr-3 hidden md:block">Last Modified</div>
            <div className="md:mr-10">Action</div>
          </div>
        </div>
        {!loading ? (
          datas.length >= 1 ? (
            searchText.length > 0 ? (
              (showAll ? searchToShow : searchToShow.slice(0, 10)).map(
                (item) => (
                  <FileProItem
                    key={item.docID}
                    nameOriginal={item.name}
                    url={item.url}
                    size={item.size}
                    lastModified={item.lastmodified}
                    docID={item.docID}
                  />
                )
              )
            ) : (
              (showAll ? datas : datas.slice(0, 10)).map((item) => (
                <FileProItem
                  key={item.docID}
                  nameOriginal={item.name}
                  lastModified={item.lastmodified}
                  docID={item.docID}
                  url={item.url}
                  size={item.size}
                />
              ))
            )
          ) : (
            <div className="w-full flex justify-center items-center bg-[#9DB2BF] mt-[2px] rounded-md p-2 mb-4">
              No data available
            </div>
          )
        ) : (
          <div className="w-full flex justify-center items-center bg-[#9DB2BF] mt-[2px] rounded-md p-2 mb-4">
            Loading
          </div>
        )}
      </div>
    </div>
  );
}

export default FilePro;
