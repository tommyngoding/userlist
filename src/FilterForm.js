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
      <label htmlFor="search">Search</label>
      <input
        type="text"
        id="search"
        name="search"
        value={search}
        onChange={searchOnChange}
        placeholder="Search..."
      />
      <button data-testid="filter-keyword" onClick={searchBtnOnClick}>
        Search
      </button>
      <label htmlFor="genders">Gender</label>

      <select
        name="genders"
        id="genders"
        value={gender}
        onChange={genderOnChange}
      >
        <option value="all">All</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <button onClick={resetOnClick}>Reset Filter</button>
    </>
  );
};
