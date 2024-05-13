import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Login } from "./pages/auth/Login";
import ManagerLayout from "./layouts/ManagerLayout";
import { HomeManager } from "./pages/manager/Home";
import NotFound from "./pages/error/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="manager" element={<ManagerLayout />}>
        <Route index element={<HomeManager />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);

export default router;
