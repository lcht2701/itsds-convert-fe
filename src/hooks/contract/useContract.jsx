import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CompanyService from "@/servers/CompanyService";

const useCompany = (id) => {
  const [loading, setLoading] = useState(!!id);
  const [company, setCompany] = useState(null);
  const navigate = useNavigate();

  const fetchCompany = async () => {
    setLoading(true);
    try {
      const response = await CompanyService.getDetail(id);
      setCompany(response.result);
    } catch (error) {
      console.error("Error fetching company:", error);
    } finally {
      setLoading(false);
    }
  };

  const addCompany = async (data) => {
    console.log(data);
    try {
      await CompanyService.add(data);
      navigate(-1);
    } catch (error) {
      console.error("Add failed:", error);
    }
  };

  const updateCompany = async (data) => {
    console.log(data);
    try {
      await CompanyService.update(id, data);
      navigate(-1);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCompany();
    }
  }, [id]);

  return {
    company,
    loading,
    addCompany,
    updateCompany,
  };
};

export default useCompany;
