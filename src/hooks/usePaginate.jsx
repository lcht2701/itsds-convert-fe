import { useState, useCallback } from "react";

const usePaginate = (initialPage = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [paginationData, setPaginationData] = useState({});

  const onChangePage = useCallback((pageNumber) => {
    if (pageNumber !== null) setCurrentPage(pageNumber);
  }, []);

  return {
    currentPage,
    paginationData,
    setPaginationData,
    onChangePage,
  };
};

export default usePaginate;
