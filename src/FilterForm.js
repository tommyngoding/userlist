import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

export const FilterForm = ({ filterOnChange }) => {
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("all");

  const searchOnChange = (e) => {
    setSearch(e.target.value);
  };

  const searchBtnOnClick = () => {
    filterOnChange({ keyword: search });
  };

  const resetOnClick = () => {
    setSearch("");
    setGender("all");
    filterOnChange({ gender: "", keyword: "" });
  };

  const genderOnChange = (e) => {
    setGender(e.target.value);
    filterOnChange({ gender: e.target.value });
  };

  return (
    <>
      <div style={{ marginRight: "10px" }}>
        <div style={{ display: "flex" }}>
          <label htmlFor="search">Search</label>
        </div>
        <div>
          <input
            type="text"
            id="search"
            name="search"
            value={search}
            onChange={searchOnChange}
            placeholder="Search..."
            style={{ width: "170px" }}
          />
          <button
            data-testid="filter-keyword"
            style={{
              backgroundColor: "#47b8f5",
              border: "1px solid #47b8f5 ",
              color: "white",
            }}
            onClick={searchBtnOnClick}
          >
            <SearchOutlined />
          </button>
        </div>
      </div>

      <div>
        <div style={{ display: "flex" }}>
          <label htmlFor="genders">Gender</label>
        </div>
        <div>
          <select
            name="genders"
            id="genders"
            value={gender}
            onChange={genderOnChange}
            style={{ marginRight: "10px", width: "170px", height: "28px" }}
          >
            <option value="all">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <button onClick={resetOnClick} style={{ backgroundColor: "white" }}>
            Reset Filter
          </button>
        </div>
      </div>
    </>
  );
};
