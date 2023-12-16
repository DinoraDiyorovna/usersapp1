import React from "react";
import App from "./App";
import "./index.css";
import { SignIn } from "./pages/SignIn";
import { Users } from "./pages/Users";
import ReactDOM from "react-dom/client";
//  import "./fonts/index.css";

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/users" element={<Users />} />
    </>
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
