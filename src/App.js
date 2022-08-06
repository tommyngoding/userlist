import logo from "./logo.svg";
import "./App.css";
import { FilterForm } from "./FilterForm";
import { UserTable } from "./UserTable";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async (filter = "") => {
    const response = await fetch(
      `https://randomuser.me/api/?page=1&pageSize=10&results=10${filter}`
    );
    const result = await response.json();
    setUsers(result.results);
  };

  const filterOnChange = (val, field) => {
    let filterStr = "";
    filterStr = field.length > 0 ? `&${field}=${val}` : "";
    fetchUsers(filterStr);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <FilterForm filterOnChange={filterOnChange} />
      <UserTable users={users} />
    </div>
  );
}

export default App;
