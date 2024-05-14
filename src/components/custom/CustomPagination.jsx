import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const CustomPagination = ({ pagination, onChangePage }) => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="text-xs text-muted-foreground">
        Showing{" "}
        <strong>
          {pagination.from}-{pagination.to}
        </strong>{" "}
        of <strong>{pagination.total}</strong> products
      </div>
      <div>
        {pagination.has_pages && (
          <Pagination>
            <PaginationContent>
              <PaginationPrevious
                onClick={() => onChangePage(pagination.prev)}
              />
              <PaginationNext onClick={() => onChangePage(pagination.next)} />
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default CustomPagination;
