import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Login } from "./pages/auth/Login";
import ManagerLayout from "./layouts/ManagerLayout";
import { HomeManager } from "./pages/home/HomeManager";
import NotFound from "./pages/error/NotFound";
import PublicRoute from "./routes/PublicRoute";
import CategoryList from "./pages/category/CategoryList";
import CreateCategory from "./pages/category/AddCategory";
import UpdateCategory from "./pages/category/UpdateCategory";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="" element={<Navigate to="/login" replace />} />
      <Route
        path="login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route path="/manager" element={<ManagerLayout />}>
        <Route index element={<Navigate to="/manager/home" replace />} />
        <Route path="home" element={<HomeManager />} />
        <Route path="category" element={<CategoryList />}></Route>
        <Route path="category/add" element={<CreateCategory />} />
        <Route path="category/update/:id" element={<UpdateCategory />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);

export default router;
