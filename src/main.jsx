import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  Routes,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Login } from "./pages/auth/Login";
import { HomeManager } from "./pages/manager/Home";
import NotFound from "./pages/error/NotFound";
import ManagerLayout from "./layouts/ManagerLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="manager" element={<ManagerLayout />}>
        <Route index element={<HomeManager />} />
        {/* Here you can add more nested routes inside the manager path */}
        {/* <Route path="dashboard" element={<Dashboard />} />
         <Route path="tickets" element={<Tickets />} /> */}
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
