import { FC } from "react";
import styles from './Pagination.module.scss'
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
    <div className={styles.root}>
      <ul className={styles.list}>
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
