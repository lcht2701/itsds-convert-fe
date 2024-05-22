import { useState, useCallback } from "react";
import CompanyMemberService from "@/servers/CompanyMemberService";

const useCompanyMemberList = (companyId, currentPage) => {
  const [companyMembers, setCompanyMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompanyMemberList = useCallback(async () => {
    setLoading(true);
    try {
      const response = await CompanyMemberService.getPaginatedList(
        companyId,
        currentPage
      );
      setCompanyMembers(response.result.data);
      return response.result.pagination;
    } catch (error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  return {
    companyMembers,
    loading,
    fetchCompanyMemberList,
  };
};

export default useCompanyMemberList;
