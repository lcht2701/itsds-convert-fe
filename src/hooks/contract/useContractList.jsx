import { useState, useCallback } from "react";
import ContractService from "@/servers/ContractService";

const useContractList = (currentPage) => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContractList = useCallback(async () => {
    setLoading(true);
    try {
      const response = await ContractService.getPaginatedList(currentPage);
      setContracts(response.result.data);
      return response.result.pagination;
    } catch (error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  return {
    contracts,
    loading,
    fetchContractList,
  };
};

export default useContractList;
