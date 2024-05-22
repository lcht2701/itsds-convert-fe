import { useState, useCallback } from "react";
import CategoryService from "@/servers/CategoryService";

const useCategoryList = (currentPage) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategoryList = useCallback(async () => {
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

  const fetchCategorySelectList = async () => {
    try {
      var response = await CategoryService.getSelectList();
      console.log("Get select list", response.result);
      setCategories(response.result);
    } catch (error) {
      console.log("Error fetching select list: ", error);
    }
  };

  return {
    categories,
    loading,
    fetchCategoryList,
    fetchCategorySelectList,
  };
};

export default useCategoryList;
