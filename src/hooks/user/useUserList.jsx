import { useState, useCallback } from "react";
import UserService from "@/servers/UserService";

const useUserList = (currentPage) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserList = useCallback(async () => {
    setLoading(true);
    try {
      const response = await UserService.getPaginatedList(currentPage);
      setUsers(response.result.data);
      return response.result.pagination;
    } catch (error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  const fetchOwnerSelectList = async () => {
    try {
      var response = await UserService.getOwnerList();
      console.log("Get select list", response.result);
      setUsers(response.result);
    } catch (error) {
      console.log("Error fetching select list: ", error);
    }
  };

  return {
    users,
    loading,
    fetchUserList,
    fetchOwnerSelectList,
  };
};

export default useUserList;
