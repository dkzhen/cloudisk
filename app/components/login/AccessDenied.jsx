"use client";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AccessDenied() {
  return (
    <div className="fixed grid place-items-center backdrop-blur-sm top-0 right-0 left-0 z-50 w-full inset-0 h-modal h-full justify-center items-center">
      <div className="relative container m-auto px-6">
        <div className="m-auto md:w-7/12">
          <div className="rounded-xl bg-white dark:bg-gray-800 shadow-xl">
            <div className="p-8">
              <div className="space-y-4">
                <Image
                  src="https://www.svgrepo.com/show/475643/dribbble-color.svg"
                  loading="lazy"
                  className="w-10"
                  width={0}
                  height={0}
                  alt="logo"
                />
                <h2 className="mb-8 text-2xl text-cyan-900 dark:text-white font-bold">
                  Sorry you are not allowed to log in. Please contact developer.
                </h2>
              </div>
              <div className="mt-10 grid space-y-4">
                <Link
                  onClick={() => {
                    signOut();
                  }}
                  href={"/"}
                  className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 flex items-center justify-center focus:bg-blue-50 active:bg-blue-100"
                >
                  <div className="relative flex items-center space-x-4 justify-center">
                    <span className="block w-max font-semibold tracking-wide text-gray-700 dark:text-white text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                      Log in other account
                    </span>
                  </div>
                </Link>
              </div>
              <div className="mt-14 space-y-4 py-3 text-gray-600 dark:text-gray-400 text-center">
                <p className="text-xs">
                  By continuing, you agree to our risks and our rules. This
                  space only superusers can log in. Created 2023 - All Reserved
                  Designed by Zhen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
