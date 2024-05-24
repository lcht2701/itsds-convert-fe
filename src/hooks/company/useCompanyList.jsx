import { useState, useCallback } from "react";
import CompanyService from "@/servers/CompanyService";

const useCompanyList = (currentPage) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompanyList = useCallback(async () => {
    setLoading(true);
    try {
      const response = await CompanyService.getPaginatedList(currentPage);
      setCompanies(response.result.data);
      return response.result.pagination;
    } catch (error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  const fetchCompanySelectList = async () => {
    try {
      var response = await CompanyService.getSelectList();
      console.log("Get select list", response.result);
      setCompanies(response.result);
    } catch (error) {
      console.log("Error fetching select list: ", error);
    }
  };

  return {
    companies,
    loading,
    fetchCompanyList,
    fetchCompanySelectList,
  };
};

export default useCompanyList;
