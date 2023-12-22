import { FC } from "react";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number} onClick={() => paginate(number)}>
            <button>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
