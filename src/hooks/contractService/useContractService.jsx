import ContractServiceService from "@/servers/ContractServiceService";

const useContractService = (contractId) => {
  const addContract = async (data) => {
    console.log(data);
    try {
      await ContractServiceService.add(contractId, data);
    } catch (error) {
      console.error("Add failed:", error);
    }
  };

  return {
    addContract,
  };
};

export default useContractService;
