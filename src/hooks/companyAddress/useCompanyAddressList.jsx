import { useState, useCallback } from "react";
import CompanyAddressService from "@/servers/CompanyAddressService";

const useCompanyAddressList = (companyId, currentPage) => {
  const [companyAddresses, setCompanyAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompanyAddressList = useCallback(async () => {
    setLoading(true);
    try {
      const response = await CompanyAddressService.getPaginatedList(
        companyId,
        currentPage
      );
      setCompanyAddresses(response.result.data);
      return response.result.pagination;
    } catch (error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  return {
    companyAddresses,
    loading,
    fetchCompanyAddressList,
  };
};

export default useCompanyAddressList;
