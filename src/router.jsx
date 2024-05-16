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
import AddCategory from "./pages/category/AddCategory";
import UpdateCategory from "./pages/category/UpdateCategory";
import ServiceList from "./pages/service/ServiceList";
import AddService from "./pages/service/AddService";
import UpdateService from "./pages/service/UpdateService";
import Profile from "./pages/setting/Profile";
import TicketSolutionList from "./pages/ticketSolution/TicketSolutionList";
import AddTicketSolution from "./pages/ticketSolution/AddTicketSolution";
import UpdateTicketSolution from "./pages/ticketSolution/UpdateTicketSolution";
import TicketSolutionDetail from "./pages/ticketSolution/TicketSolutionDetail";

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
        <Route path="ticket-solution" element={<TicketSolutionList />} />
        <Route path="ticket-solution/add" element={<AddTicketSolution />} />
        <Route
          path="ticket-solution/update/:id"
          element={<UpdateTicketSolution />}
        />
        <Route
          path="ticket-solution/detail/:id"
          element={<TicketSolutionDetail />}
        />
        <Route path="category" element={<CategoryList />} />
        <Route path="category/add" element={<AddCategory />} />
        <Route path="category/update/:id" element={<UpdateCategory />} />
        <Route path="service" element={<ServiceList />} />
        <Route path="service/add" element={<AddService />} />
        <Route path="service/update/:id" element={<UpdateService />} />
        <Route path="setting/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);

export default router;
