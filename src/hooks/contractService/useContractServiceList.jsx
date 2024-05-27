import { useState, useCallback } from "react";
import ContractServiceService from "@/servers/ContractServiceService";

const useContractServiceList = (contractId, currentPage) => {
  const [contractServices, setContractServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContractServicesList = useCallback(async () => {
    setLoading(true);
    try {
      const response = await ContractServiceService.getPaginatedList(
        contractId,
        currentPage
      );
      setContractServices(response.result.data);
      return response.result.pagination;
    } catch (error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  const fetchContractServicesSelectList = async () => {
    try {
      var response = await ContractServiceService.getSelectList(contractId);
      console.log("Get select list", response.result);
      setContractServices(response.result);
    } catch (error) {
      console.log("Error fetching select list: ", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    contractServices,
    loading,
    fetchContractServicesList,
    fetchContractServicesSelectList,
  };
};

export default useContractServiceList;
