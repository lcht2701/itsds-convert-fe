import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryService from "@/servers/CategoryService";
import { handleNullInputField } from "@/utils/HandleNullInputField";

const useCategory = (id) => {
  const [loading, setLoading] = useState(!!id);
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchCategory = async () => {
        setLoading(true);
        try {
          const response = await CategoryService.getDetail(id);
          setCategory(response.result);
        } catch (error) {
          console.error("Error fetching category:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCategory();
    }
  }, [id]);

  const addCategory = async (data) => {
    data = handleNullInputField(data);
    console.log(data);
    try {
      await CategoryService.add(data);
      navigate("/manager/category");
    } catch (error) {
      console.error("Add failed:", error);
    }
  };

  const updateCategory = async (data) => {
    data = handleNullInputField(data);
    try {
      await CategoryService.update(id, data);
      navigate("/manager/category");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return { category, loading, addCategory, updateCategory };
};

export default useCategory;
