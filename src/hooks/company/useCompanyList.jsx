import { useState, useCallback } from "react";
import CompanyService from "@/servers/CompanyService";

const useCompanyList = (currentPage) => {
  const [companies, setCompanys] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompanyList = useCallback(async () => {
    setLoading(true);
    try {
      const response = await CompanyService.getPaginatedList(currentPage);
      setCompanys(response.result.data);
      return response.result.pagination;
    } catch (error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  return {
    companies,
    loading,
    fetchCompanyList,
  };
};

export default useCompanyList;
