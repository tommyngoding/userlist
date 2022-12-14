import logo from "./logo.svg";
import "./App.css";
import { FilterForm } from "./FilterForm";
import { UserTable } from "./UserTable";
import { useEffect, useState } from "react";
import { Pagination } from "./Pagination";

function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilter, setCurrentFilter] = useState({
    keyword: "",
    gender: "",
  });
  const [ascendingSort, setAscendingSort] = useState({
    email: null,
    name: null,
    gender: null,
    registereddate: null,
  });

  const pageSize = 5;
  const results = 10;

  const fetchUsers = async (
    filters = null,
    page = 1,
    pageSize = 10,
    results = 10
  ) => {
    const response = await fetch(
      `https://randomuser.me/api/?page=${page}&pageSize=${pageSize}&results=${results}${generateFilterStr(
        filters ? filters : currentFilter
      )}`
    );
    const result = await response.json();
    setUsers(result.results);
  };

  const generateFilterStr = (currentFilter) => {
    let filterStr = "";
    for (const key in currentFilter) {
      if (currentFilter[key].length > 0) {
        filterStr += `&${key}=${currentFilter[key]}`;
      }
    }
    // filterStr +=
    //   currentFilter.gender.length > 0 ? `&gender=${currentFilter.gender}` : "";
    // filterStr +=
    //   currentFilter.keyword.length > 0
    //     ? `&keyword=${currentFilter.keyword}`
    //     : "";
    return filterStr;
  };

  const filterOnChange = (filterObj) => {
    let currFilter = currentFilter;
    currFilter = {
      ...currFilter,
      ...filterObj,
    };
    setCurrentFilter(currFilter);
    setCurrentPage(1);
    fetchUsers(currFilter, 1, pageSize, results);
  };

  const pageNumberOnClick = (page) => {
    setCurrentPage(page);
    if (currentPage !== page) {
      fetchUsers(null, page, pageSize, results);
    }
  };

  useEffect(() => {
    fetchUsers(null, currentPage, pageSize, results);
  }, []);

  const columnHeaderOnClick = (column) => {
    fetchUsers(
      {
        sortBy: column,
        sortOrder: ascendingSort[column] ? "descend" : "ascend",
      },
      1,
      pageSize,
      results
    );
    setAscendingSort({
      ...ascendingSort,
      [column]: !ascendingSort[column],
    });
  };

  return (
    <div className="App">
      <div className="filter-container">
        <FilterForm filterOnChange={filterOnChange} />
      </div>

      <UserTable
        users={users}
        columnHeaderOnClick={columnHeaderOnClick}
        ascendingSort={ascendingSort}
      />
      <div className="pagination-container">
        <Pagination
          pageSize={pageSize}
          results={results}
          pageNumberOnClick={pageNumberOnClick}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default App;
