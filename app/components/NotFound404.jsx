import Link from "next/link";
import React from "react";

function NotFound404() {
  return (
    <section class="bg-white  ">
      <div class="container flex items-center min-h-screen md:ml-44 ml-0 px-6  mx-auto">
        <div>
          <p class="text-sm font-medium text-blue-500 ">404 error</p>
          <h1 class="mt-3 text-2xl font-semibold text-gray-800  md:text-3xl">
            We can’t find that page
          </h1>
          <p class="mt-4 text-gray-500 ">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>

          <div class="flex items-center mt-6 gap-x-3">
            <Link
              href={"/"}
              class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 rtl:rotate-180"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>Go back</span>
            </Link>

            <Link
              href={"https://github.com/dkzhen"}
              class="w-1/2 px-5 py-2 text-sm tracking-wide flex justify-center text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 "
            >
              <span className="hidden md:block rounded-md px-2 py-1  hover:text-gray-50">
                Developed by Zhen🐳
              </span>
              <span className="md:hidden rounded-md px-2 py-1  hover:text-gray-50">
                by Zhen🐳
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NotFound404;
