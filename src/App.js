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
    filterStr +=
      currentFilter.gender.length > 0 ? `&gender=${currentFilter.gender}` : "";
    filterStr +=
      currentFilter.keyword.length > 0
        ? `&keyword=${currentFilter.keyword}`
        : "";
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

  return (
    <div className="App">
      <FilterForm filterOnChange={filterOnChange} />
      <UserTable users={users} />
      <Pagination
        pageSize={pageSize}
        results={results}
        pageNumberOnClick={pageNumberOnClick}
        currentPage={currentPage}
      />
    </div>
  );
}

export default App;
