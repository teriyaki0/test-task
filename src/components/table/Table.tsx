import { FC, useState } from "react";
import { RowType } from "../../types/RowType";
import styles from "./Table.module.scss";

type TableProps = {
  data: RowType[];
  onRowClick?: (row: RowType) => void;
  onHeaderClick: (key: string) => void;
};

const TableComponent: FC<TableProps> = ({
  data,
  onRowClick,
  onHeaderClick,
}) => {
  const [selectedRow, setSelectedRow] = useState<RowType | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  }>({
    key: "",
    direction: "",
  });

  const handleRowClick = (row: RowType) => {
    setSelectedRow(row);
    if (onRowClick) {
      onRowClick(row);
    }
  };

  const handleHeaderClick = (key: string) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    onHeaderClick(key);
  };

  const renderTableHeader = () => {
    return (
      <tr className={styles.table__row}>
        <th
          className={styles.table__header}
          onClick={() => handleHeaderClick("_id")}
        >
          ID⇅
        </th>
        <th
          className={styles.table__header}
          onClick={() => handleHeaderClick("firstName")}
        >
          First Name⇅
        </th>
        <th
          className={styles.table__header}
          onClick={() => handleHeaderClick("lastName")}
        >
          Last Name⇅
        </th>
        <th
          className={styles.table__header}
          onClick={() => handleHeaderClick("email")}
        >
          Email⇅
        </th>
        <th
          className={styles.table__header}
          onClick={() => handleHeaderClick("phone")}
        >
          Phone⇅
        </th>
      </tr>
    );
  };

  const renderTableData = () => {
    return data.map((row: RowType) => (
      <tr
        key={row._id}
        onClick={() => handleRowClick(row)}
        className={row._id === selectedRow?._id ? styles.selectedRow : styles.table__row} 
      >
        <td className={styles.table__cell}>{row._id}</td>
        <td className={styles.table__cell}>{row.firstName}</td>
        <td className={styles.table__cell}>{row.lastName}</td>
        <td className={styles.table__cell}>{row.email}</td>
        <td className={styles.table__cell}>{row.phone}</td>
      </tr>
    ));
  };

  return (
    <div className={styles.root}>
      <table className={styles.table}>
        <thead>{renderTableHeader()}</thead>
        <tbody>{renderTableData()}</tbody>
      </table>
    </div>
  );
};

export default TableComponent;
