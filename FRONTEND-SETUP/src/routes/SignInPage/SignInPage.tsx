import React from "react";
import "./SignInPage.css";
import { Link } from "react-router-dom";

const SignInPage = () => {
  return (
    <section className="w-full max-w-full ">
      <div className="flex flex-col md:flex-row min-h-screen relative    ">
        {/* Left Section start  */}

        <div className="bg-[#1c1733] md:w-1/2 relative overflow-hidden  text-white pl-[5%] 3xl:pl-[9%]">
          <div
            className=" w-fit  pt-[10%]"
            //    className=" w-fit mx-auto  pt-[10%]"
          >
            <div className="z-10 relative">
              <h2 className="text-2xl font-bold mb-6">
                <img
                  src="/logo.png"
                  alt="app-logo"
                  className="max-w-[32px] w-full h-[32px]"
                />
              </h2>

              <div className="mt-20 md:mt-32">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
                  Sign in to
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">CORTEX AI</h2>
                <p className="max-w-md opacity-90 text-sm lg:text-base">
                  CORTEX AI helps you think faster, write better, and get answers
                  instantly. Ask questions, generate ideas, and solve problems —
                  all in one place.
                </p>
              </div>
            </div>

            {/* Decorative Icons */}
            <svg
              className="text-white/20 absolute bottom-10 left-10 w-24 h-24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
            </svg>
          </div>
        </div>

        {/* Right Section */}
        <div className="p-8 md:p-12 md:w-1/2 flex items-center justify-center bg-white">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
            <div className="text-right mb-4">
              <span className="text-gray-500">No Account?</span>{" "}
              <Link to={"/sign-up"} className="text-gray-800 font-medium">
                Sign up
              </Link>
            </div>

            <div className="mb-8">
              <p className="text-gray-600 mb-1">
                Welcome to{" "}
                <span className="text-blue-500 font-bold">CORTEX AI</span>
              </p>
              <h1 className="text-4xl font-bold text-gray-800 ">Sign in</h1>
            </div>

            {/* Social Buttons */}
            <div className="flex flex-col space-y-4 mb-8">
              {/* <button className="flex items-center justify-center gap-2 h-12 border border-gray-200 rounded-md hover:bg-gray-50">
              Sign in with Google
            </button> */}

              {/* <div className="flex gap-4">
              <button className="flex-1 h-12 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-600"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3" />
                </svg>
              </button>

              <button className="flex-1 h-12 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-800"
                >
                  <path d="M9 7c-3 0-4 3-4 5.5 0 3 2 7.5 5 7.5 1.5 0 2.5-.5 3.5-1.5" />
                  <path d="M9 12h13" />
                  <path d="M15 7c3 0 4 3 4 5.5 0 3-2 7.5-5 7.5-1.5 0-2.5-.5-3.5-1.5" />
                </svg>
              </button>
            </div> */}
            </div>

            {/* Form */}
            <form>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Enter your username or email address
                  </label>
                  <input
                    id="email"
                    type="text"
                    placeholder="Username or email address"
                    className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Enter your Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="text-right">
                    <a href="#" className="text-blue-500 text-sm">
                      Forgot Password
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
