import React from "react";
import { Link } from "react-router-dom";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 7; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 6; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 3; i <= currentPage + 3; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center mt-6 space-x-4">
      <Link
        to={`/recipes/${currentPage - 1}`}
        className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
          currentPage === 1 ? "disabled:opacity-50" : ""
        }`}
        aria-disabled={currentPage === 1}
      >
        &#8592;
      </Link>

      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-4 py-2 text-gray-500">
            ...
          </span>
        ) : (
          <Link
            key={index}
            to={`/recipes/${page}`}
            className={`px-4 py-2 rounded-md ${
              currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {page}
          </Link>
        )
      )}

      <Link
        to={`/recipes/${currentPage + 1}`}
        className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
          currentPage === totalPages ? "disabled:opacity-50" : ""
        }`}
        aria-disabled={currentPage === totalPages}
      >
        &#8594;
      </Link>
    </div>
  );
};
