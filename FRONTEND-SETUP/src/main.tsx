import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./routes/homePage/HomePage.js";
import DashboardPage from "./routes/dashboardPage/DashboardPage.js";
import ChatPage from "./routes/ChatPage/ChatPage.js";
import RootLayout from "./layouts/rootLayout/RootLayout.js";
import DashboardLayout from "./layouts/dashboardLayout/DashboardLayout.js";
import SignInPage from "./routes/SignInPage/SignInPage.js";
import SignUpPage from "./routes/SignUpPage.tsx/SignUpPage.js";
import { Toaster } from "react-hot-toast";
import AppContextProvider from "./context/AppContextProvider.js";
import UserMiddleware from "./middleware/UserMiddleware.js";
import LoginModal from "./components/LoginModal.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        element: <UserMiddleware />, // Add middleware here
        children: [
          {
            element: <DashboardLayout />,
            children: [
              {
                path: "dashboard",
                element: <DashboardPage />,
              },
              {
                path: "chats/:id",
                element: <ChatPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  // {
  //   path:'/',
  //   element:<HomePage/>
  // },
  // {
  //   path:'/dashboard',
  //   // element:<DashboardPage/>,
  //   children:[

  //     {
  //       path:'/dashboard',
  //       element:<DashboardPage/>
  //     },
  //     {
  //       path:'/dashboard/chat/:id',
  //       element:<ChatPage/>,
  //     }
  //   ]
  // },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>

    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <AppContextProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </AppContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
