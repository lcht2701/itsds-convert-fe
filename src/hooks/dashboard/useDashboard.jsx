import DashboardService from "@/servers/DashboardService";
import { useCallback, useState } from "react";

const useDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchCustomerDashboard = useCallback(async (userId) => {
    setLoading(true);
    try {
      const response = await DashboardService.getCustomerService(userId);
      setData(response.result);
    } catch (error) {
      console.error("Error fetching dashboard:", error);
    } finally {
      setLoading(false);
    }
  });

  const fetchCompanyAdminDashboard = useCallback(async (userId) => {
    setLoading(true);
    try {
      const response = await DashboardService.getCompanyAdminService(userId);
      setData(response.result);
    } catch (error) {
      console.error("Error fetching dashboard:", error);
    } finally {
      setLoading(false);
    }
  });

  const fetchTechnicianDashboard = useCallback(async (userId) => {
    setLoading(true);
    try {
      const response = await DashboardService.getTechnicianService(userId);
      setData(response.result);
    } catch (error) {
      console.error("Error fetching dashboard:", error);
    } finally {
      setLoading(false);
    }
  });

  const fetchManagerDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const response = await DashboardService.getManagerService();
      setData(response.result);
    } catch (error) {
      console.error("Error fetching dashboard:", error);
    } finally {
      setLoading(false);
    }
  });

  return {
    data,
    loading,
    fetchCustomerDashboard,
    fetchCompanyAdminDashboard,
    fetchTechnicianDashboard,
    fetchManagerDashboard,
  };
};

export default useDashboard;
