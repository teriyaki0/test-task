import styles from "./DataListPage.module.scss";

import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RowType } from "../types/RowType";

import axios from "axios";
import Filter from "../components/filter/Filter";
import Table from "../components/table/Table";
import Pagination from "../components/pagination/Pagination";
import AdditionalInfo from "../components/additional-info/AdditionalInfo";

const DataListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("page") || "") || 1;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(page);
  const [itemsPerPage] = useState(17);
  const [selectedRow, setSelectedRow] = useState<RowType | null>(null);
  const [filterText, setFilterText] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  }>({
    key: "",
    direction: "",
  });

  useEffect(() => {
    const api = process.env.NODE_ENV === 'production' ? 
    (process.env.API_URL ? process.env.API_URL : "http://localhost:3000/data") : 
    "http://localhost:3000/data";  
     axios
      .get(api)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    navigate(`/?page=${currentPage}`);
    setSelectedRow(null);
  }, [currentPage, navigate]);

  const applyFiltersAndSort = (dataToFilter: RowType[]) => {
    let filteredData = dataToFilter.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(filterText.toLowerCase())
      )
    );

    return filteredData;
  };

  const filteredAndSortedData = applyFiltersAndSort(data);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleRowClick = (row: RowType) => {
    setSelectedRow(row);
  };

  const handleFilter = (searchText: string) => {
    setFilterText(searchText);
    setCurrentPage(1);
  };
  const sortData = (dataToSort: RowType[], key: string, direction: string) => {
    return dataToSort.slice(0).sort((a: any, b: any) => {
      if (key === "_id" || key === "phone") {
        const valueA = key === "phone" ? +a[key].replace(/\D/g, "") : a[key];
        const valueB = key === "phone" ? +b[key].replace(/\D/g, "") : b[key];
        return (valueA - valueB) * (direction === "ascending" ? 1 : -1);
      } else {
        return (
          (a[key] as string).localeCompare(b[key] as string) *
          (direction === "ascending" ? 1 : -1)
        );
      }
    });
  };
  const handleHeaderClick = (key: string) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    let sortableData: RowType[] = [...filteredAndSortedData];

    if (sortConfig.key) {
      sortableData = sortData(
        sortableData,
        sortConfig.key,
        sortConfig.direction
      );
    }

    const uniqueData = sortableData.reduce(
      (acc: RowType[], current: RowType) => {
        const isDuplicate = acc.some((item) => item._id === current._id);
        if (!isDuplicate) {
          acc.push(current);
        }
        return acc;
      },
      []
    );

    const slicedUniqueData = uniqueData.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

    return slicedUniqueData;
  }, [filteredAndSortedData, sortConfig, indexOfFirstItem, indexOfLastItem]);

  return (
    <div className={styles.root}>
      <div>
        <Filter onFilter={handleFilter} />
        <div className={styles.table}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <Table
              data={sortedData}
              onRowClick={handleRowClick}
              onHeaderClick={handleHeaderClick}
            />
          )}
          {selectedRow && <AdditionalInfo selectedRow={selectedRow} />}
        </div>
      </div>
      {filteredAndSortedData.length < 18 ? (
        ""
      ) : (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredAndSortedData.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default DataListPage;
