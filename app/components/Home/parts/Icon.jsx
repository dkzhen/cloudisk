import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
function Icon({ svg, path }) {
  const pathname = usePathname();
  return (
    <Link
      href={`${path}`}
      className={`p-3 text-black ${
        path == pathname ? "bg-[#ADC4CE]" : "bg-white"
      }  rounded-2xl `}
    >
      <img src={`/${svg}`} alt="Home SVG" width={20} height={20} />
    </Link>
  );
}

export default Icon;
