import { useState, useEffect, useCallback } from "react";
import CategoryService from "@/servers/CategoryService";

const useCategoryList = (currentPage) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = useCallback(async () => {
    setLoading(true);
    try {
      const response = await CategoryService.getPaginatedList(currentPage);
      setCategories(response.result.data);
      return response.result.pagination;
    } catch (error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  return {
    categories,
    loading,
    fetchList,
  };
};

export default useCategoryList;
