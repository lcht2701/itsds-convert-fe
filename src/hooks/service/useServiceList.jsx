import ServiceService from "@/servers/ServiceService";
import React, { useCallback, useState } from "react";

const useServiceList = (currentPage) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServiceList = useCallback(async () => {
    setLoading(true);
    try {
      var response = await ServiceService.getPaginatedList(currentPage);
      setServices(response.result.data);
      return response.result.pagination;
    } catch (error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  const fetchServiceSelectList = async () => {
    try {
      var response = await ServiceService.getSelectList();
      console.log("Get select list", response.result);
      setServices(response.result);
    } catch (error) {
      console.log("Error fetching select list: ", error);
    }
  };

  return { services, loading, fetchServiceSelectList, fetchServiceList };
};

export default useServiceList;
