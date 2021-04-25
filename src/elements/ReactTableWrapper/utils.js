import React from "react";
import rowCollapsedIn from "../../assets/images/react-table-icons/expand--row-up.svg";
import rowCollapsedOut from "../../assets/images/react-table-icons/expand--row-down.svg";
import { formatDate } from "../../utilities/HelperFunctions";
import { bindDownloadColumn } from "./bindColumns.js";

// table column/ header
export const EnhancedTableHeader = ({
  expandRows = false,
  tableHeaders = [],
}) => {
  let resultSet = tableHeaders.map(column => bindColumns(column, expandRows)); //adding columns for columns
  // expand row
  if (expandRows) {
    resultSet.unshift(expandRow());
  }
  return resultSet;
};

// table sub-column/sub-header
export const EnhancedTableSubHeader = ({ tableSubHeaders }) =>
  tableSubHeaders.map(column => bindColumns(column)); //adding columns for sub-columns

// converting object keys to readable text. Like `isReadableText` to `Is Readable Text`
export const makeHeaderReadable = word => {
  const str = word.replace(/([a-zA-Z])([A-Z])([a-z])/g, "$1 $2$3");
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// expand row function
const expandRow = () => ({
  id: "expander",
  Header: () => null,
  Cell: function Cell({ row }) {
    return (
      <span {...row.getToggleRowExpandedProps()}>
        {row.isExpanded ? (
          <img
            src={rowCollapsedIn}
            className="collapse-icon-height"
            alt="Collapse in"
          />
        ) : (
          <img
            src={rowCollapsedOut}
            className="collapse-icon-height"
            alt="Collapse in"
          />
        )}
      </span>
    );
  },
});

// Render Bulk Action Grid
export const bulkActionPanel = (selectedRows, actions) => {
  return actions.map(({ isAllowed = true, ...action }) => {});
};

export const receiptStatusIcons = {
  Open: <i className="fa fa-circle text-success" />,
  Received: <i className="fa fa-circle text-danger" />,
  Pending: <i className="fa fa-circle text-primary" />,
};

const bindColumns = (column, expandRows = false) => {
  if (typeof column === "object") {
    const { type = "", id = "", ...rest } = column;
    const Header = rest.Header ? rest.Header : makeHeaderReadable(id);
    let accessor = id;
    if (type == "date") {
      accessor = o => formatDate(o[id]);
    }
    // Added for QC Listing Page
    if (type == "boolean") {
      accessor = o => (o[id] ? "Yes" : "");
    }
    return { id, Header, accessor, ...rest };
  }
  // if (typeof column === "object") return column; //to run with default props of table header
  if (column === "download") return bindDownloadColumn(column);
  return {
    Header: makeHeaderReadable(column),
    accessor: column,
    isExpanded: expandRows,
    // totalWidth,
  };
};


export const genString = () => Math.random().toString(36).substring(2, 7);
