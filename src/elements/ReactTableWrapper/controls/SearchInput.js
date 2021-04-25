import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import { Input } from "reactstrap";
import { SearchDivStyle } from "../TableStyles";

const SearchInput = ({ globalFilter, setGlobalFilter }) => {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <SearchDivStyle className="ml-2 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6">
      <span className="fa fa-search form-control-search"></span>
      <Input
        type="text"
        name="search"
        id="search"
        placeholder="Search"
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </SearchDivStyle>
  );
};

export default SearchInput;
