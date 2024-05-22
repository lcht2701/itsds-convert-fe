import ServiceService from "@/servers/ServiceService";
import React, { useCallback, useState } from "react";

const useServiceList = (currentPage) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = useCallback(async () => {
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

  return { services, loading, fetchList };
};

export default useServiceList;
