import React, { useState, useEffect } from "react";
import { writeLimit, getLimit } from "@/app/api/controllers/LimitUpload";

function SettingPro() {
  const [limit, setLimit] = useState(null);

  // Function to handle the toggle change
  const handleToggleChange = async (e) => {
    // Update the limit based on the toggle state
    if (e.target.checked) {
      await writeLimit(50, 1);
    } else {
      await writeLimit(0, 1);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getLimit(1);
        // Gunakan data di sini
        setLimit(data);
      } catch (error) {
        console.error(error);
      }
    }
    const interval = setInterval(() => {
      fetchData(); // Mengambil data secara berkala
    }, 1000); // Contoh polling setiap 5 detik

    return () => {
      clearInterval(interval); // Membersihkan interval saat komponen tidak lagi digunakan
    };
  }, []);

  return (
    <div className="flex flex-wrap mr-5 mt-4">
      <div className="flex flex-row items-center  justify-between w-full  md:w-[50%] lg:w-[25%] border border-[#f4e9d9] rounded-lg px-6 py-3">
        <p>Limit upload file </p>
        <label className="relative inline-flex items-center mr-5 cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={limit === 50} // Check the checkbox based on the limit state
            onChange={handleToggleChange} // Handle the toggle change
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-white  dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 ">
            {limit == null ? "Loading.." : "50MB"}
          </span>
        </label>
      </div>
    </div>
  );
}

export default SettingPro;
