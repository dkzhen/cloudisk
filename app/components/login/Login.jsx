"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [statusError, setStatusError] = useState("");
  const handleButtonGoogle = () => {
    setLoadingGoogle(true);
    signIn("google").then(() => {
      setLoadingGoogle(false);
    });
  };
  const handleButtonClick = () => {
    setLoadingEmail(true);
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        console.log("Login successfully");
        setLoadingEmail(false);
      })
      .catch((error) => {
        setStatusError(error.code);
        setLoadingEmail(false);
        setTimeout(() => {
          setStatusError("");
        }, 5000);
      });
  };
  //
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
                <h2 className="md:mb-8 text-2xl text-cyan-900 dark:text-white font-bold">
                  Log in to unlock the premium features.
                </h2>
              </div>
              <div className="mt-5 md:mt-10 grid space-y-2 md:space-y-4">
                <button
                  onClick={handleButtonGoogle}
                  className="group h-12 px-6 border-2 mb-5 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                >
                  <div className="relative flex items-center space-x-4 justify-center">
                    <Image
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      className="absolute left-0 w-5"
                      alt="google logo"
                      width={0}
                      height={0}
                    />
                    <span className="block w-max font-semibold tracking-wide text-black dark:text-white text-sm transition duration-300 group-hover:text-blue-600 group-focus:text-blue-600 group-active:text-blue-600  sm:text-base">
                      {loadingGoogle ? "Loading..." : "Continue with Google"}
                    </span>
                  </div>
                </button>
                <h2 className="mb-8 text-xl text-black dark:text-white  font-bold">
                  Log in account
                </h2>

                <div className="w-full">
                  <div className="text-red-600 -mt-3 pb-3">
                    {statusError === "auth/invalid-email"
                      ? "Invalid Email"
                      : statusError === "auth/user-not-found"
                      ? "User not found"
                      : statusError === "auth/wrong-password"
                      ? "Wrong password"
                      : ""}
                  </div>
                  <div className="relative h-10 w-full min-w-[200px]">
                    <input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="peer h-full w-full rounded-[7px] border border-blue-gray-200  border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-black dark:text-white   outline outline-0 transition-all placeholder-shown:border-gray-400 dark:placeholder-shown:border-white placeholder-shown:border-t-gray-400 dark:placeholder-shown:border-t-white  focus:border-2 focus:border-blue-600 dark:focus:border-blue-600 dark:focus:border-t-transparent focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                    />
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-black dark:peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-600 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-white">
                      Email
                    </label>
                  </div>
                </div>
                <div className="w-full">
                  <div className="relative h-10 w-full min-w-[200px]">
                    <input
                      type="password"
                      className="peer h-full w-full rounded-[7px] border border-blue-gray-200  border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-black dark:text-white   outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 dark:placeholder-shown:border-white placeholder-shown:border-t-gray-400 dark:placeholder-shown:border-t-white  focus:border-2 focus:border-blue-600 dark:focus:border-blue-600 dark:focus:border-t-transparent focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                      onChange={(e) => setPass(e.target.value)}
                    />
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-black dark:peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-600 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-white dark:border-white">
                      Password
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleButtonClick}
                  className="group  h-10 px-3 border-2 border-gray-300 rounded-lg transition duration-300 hover:border-blue-400 flex items-center justify-center focus:bg-blue-50 active:bg-blue-100"
                >
                  <div className="relative flex items-center space-x-4 justify-center">
                    <span className="block w-max font-semibold tracking-wide text-gray-600 dark:text-white text-sm transition duration-300 group-hover:text-blue-600 sm:text-base group-focus:text-blue-600 group-active:text-blue-600">
                      {loadingEmail ? "Loading.." : "Log in"}
                    </span>
                  </div>
                </button>
                <div className="h-2"></div>
                <Link
                  href={"/"}
                  className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 flex items-center justify-center focus:bg-blue-50 active:bg-blue-100"
                >
                  <div className="relative flex items-center space-x-4 justify-center">
                    <span className="block w-max font-semibold tracking-wide text-gray-700 dark:text-white text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                      Back to Home
                    </span>
                  </div>
                </Link>
              </div>
              <div className="mt-5 space-y-4 py-3 text-gray-600 dark:text-gray-400 text-center">
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
