import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ServiceService from "@/servers/ServiceService";

const useService = (id) => {
  const [loading, setLoading] = useState(!!id);
  const [service, setService] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchService = async () => {
        setLoading(true);
        try {
          const response = await ServiceService.getDetail(id);
          setService(response.result);
        } catch (error) {
          console.error("Error fetching service:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchService();
    }
  }, [id]);

  const addService = async (data) => {
    console.log(data);
    try {
      await ServiceService.add(data);
      navigate(-1);
    } catch (error) {
      console.error("Add failed:", error);
    }
  };

  const updateService = async (data) => {
    try {
      await ServiceService.update(id, data);
      navigate(-1);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return { service, loading, addService, updateService };
};

export default useService;
