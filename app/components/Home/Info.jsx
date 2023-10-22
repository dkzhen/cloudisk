import Image from "next/image";
import React from "react";

function Info() {
  const rules = [
    {
      icon: "info.svg",
      information: "Don't upload important files here",
    },
    {
      icon: "info.svg",
      information: "Don't upload files that violate the law ",
    },
    {
      icon: "info.svg",
      information: "Don't upload file dangerous.",
    },
    { icon: "info.svg", information: "Don't upload files that are too large" },
    { icon: "info.svg", information: "Don't be nosy or mischievous" },
    { icon: "info.svg", information: "Maximum upload file size is 50MB" },
    { icon: "info.svg", information: "Upload traffic limit is 1GB/day" },
    { icon: "info.svg", information: "Refresh after uploading files" },
    { icon: "info.svg", information: "Report if there are bugs or errors" },
  ];

  return (
    <div className="mr-5 md:mr-0">
      <div className="mt-8 border-2 border-dashed rounded-lg h-[360px] w-full md:w-96 p-3  border-[#9DB2BF]">
        {rules.map((rule, index) => (
          <div key={index} className="flex items-center space-x-2 space-y-3">
            <Image
              src={`/${rule.icon}`}
              width={30}
              height={30}
              alt={rule.information}
            />
            <span>{rule.information}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Info;
