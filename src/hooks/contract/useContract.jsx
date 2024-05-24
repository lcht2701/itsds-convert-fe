import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContractService from "@/servers/ContractService";

const useContract = (id) => {
  const [loading, setLoading] = useState(!!id);
  const [contract, setContract] = useState(null);
  const navigate = useNavigate();

  const fetchContract = async () => {
    setLoading(true);
    try {
      const response = await ContractService.getDetail(id);
      setContract(response.result);
    } catch (error) {
      console.error("Error fetching Contract:", error);
    } finally {
      setLoading(false);
    }
  };

  const addContract = async (data) => {
    console.log(data);
    try {
      await ContractService.add(data);
      navigate(-1);
    } catch (error) {
      console.error("Add failed:", error);
    }
  };

  const updateContract = async (data) => {
    console.log(data);
    try {
      await ContractService.update(id, data);
      navigate(-1);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchContract();
    }
  }, [id]);

  return {
    contract,
    loading,
    addContract,
    updateContract,
  };
};

export default useContract;
