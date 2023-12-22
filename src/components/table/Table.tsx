import { FC, useState } from "react";
import { RowType } from "../../types/RowType";

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
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: string }>({
    key: '',
    direction: ''
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
      <tr>
        <th onClick={() => handleHeaderClick("_id")}>ID</th>
        <th onClick={() => handleHeaderClick("firstName")}>First Name</th>
        <th onClick={() => handleHeaderClick("lastName")}>Last Name</th>
        <th onClick={() => handleHeaderClick("email")}>Email</th>
        <th onClick={() => handleHeaderClick("phone")}>Phone</th>
      </tr>
    );
  };

  const renderTableData = () => {
    return data.map((row: RowType) => (
      <tr key={row._id} onClick={() => handleRowClick(row)}>
        <td>{row._id}</td>
        <td>{row.firstName}</td>
        <td>{row.lastName}</td>
        <td>{row.email}</td>
        <td>{row.phone}</td>
      </tr>
    ));
  };

  return (
    <div>
      <table>
        <thead>{renderTableHeader()}</thead>
        <tbody>{renderTableData()}</tbody>
      </table>
    </div>
  );
};

export default TableComponent;



