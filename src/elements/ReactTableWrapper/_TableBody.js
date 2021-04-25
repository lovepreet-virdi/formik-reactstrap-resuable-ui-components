import React, { Fragment } from "react";
import {
  SortingIcons,
  TableHeaderStyle,
  TableBodyStyle,
  TableDefines,
} from "./TableStyles";
// import { edit_reciept } from "../../../reduxUtils/actions/receiving";
import { withRouter } from "react-router-dom";
import ReactTooltip from "react-tooltip";

// <---------------sorting icons----------------->
const showSortingIcons = column => {
  if (
    column.id == "selection" ||
    column.id == "expander" ||
    column.id == "actions" ||
    column.id == "status"
  )
    return null;
  if (column.isSorted) {
    return column.isSortedDesc ? (
      <>
        {" "}
        <i className="fa fa-sort-desc" aria-hidden="true"></i>
      </>
    ) : (
      <>
        {" "}
        <i className="fa fa-sort-asc" aria-hidden="true"></i>
      </>
    );
  }
  return (
    <SortingIcons>
      {" "}
      <i className="fa fa-sort" aria-hidden="true"></i>
    </SortingIcons>
  );
};

// <===========Table Header and Body============>
const _TableBody = ({
  data,
  columns,
  selectRows = false,
  renderRowSubComponent,
  headerGroups,
  getTableBodyProps,
  prepareRow,
  visibleColumns,
  rows,
  viewRowOnClick = { redirectTo: "/" },
  history,
  isChild = false,
}) => {
  const editOnRowClick = (row, redirectTo) => {
    const { idReceiving } = row;
    if (redirectTo != "") {
      const param = {
        idReceiving: idReceiving,
      };
      // dispatch(edit_reciept(param));
      history.push(redirectTo);
    }
  };

  return (
    <>
      {/* <-------------Table Header---------------> */}
      <TableHeaderStyle isChildTable={isChild}>
        {headerGroups.map((headerGroup, headerGroupIndex) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex}>
            {headerGroup.headers.map((column, columnIndex) => (
              <th
                key={columnIndex}
                {...column.getHeaderProps(column.getSortByToggleProps())}
                style={
                  column.id == "selection" || column.id == "expander"
                    ? // || column.id == "status"
                      { width: "30px", maxWidth: "30px", minWidth: "30px" }
                    : null
                }
              >
                {column.render("Header")}
                {/* sorting icons */}
                {showSortingIcons(column)}
              </th>
            ))}
          </tr>
        ))}
      </TableHeaderStyle>

      {/* <--------------Table body------------> */}
      {rows.length > 0 ? (
        <TableBodyStyle {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Fragment key={i}>
                <tr
                  {...row.getRowProps()}
                  className={row?.original?.status}
                  key={i}
                  data-tip={
                    row?.original?.description ? row?.original?.description : ""
                  }
                  data-for="row-hover"
                >
                  {row.cells.map((cell, cellIndex) => {
                    return (
                      <td
                        key={cellIndex}
                        {...cell.getCellProps()}
                        // row on click to open the receipt in edit mode
                        onClick={() =>
                          cell?.column?.id != "actions" &&
                          cell?.column?.id != "selection" &&
                          viewRowOnClick?.redirectTo != "/"
                            ? editOnRowClick(
                                row?.original,
                                viewRowOnClick?.redirectTo
                              )
                            : {}
                        }
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
                {row.isExpanded ? (
                  <tr>
                    <td colSpan={visibleColumns.length}>
                      {renderRowSubComponent(data[row.index])}
                    </td>
                  </tr>
                ) : null}
                {/* adding tooltip according to the description column if coming */}
                <ReactTooltip
                  place="right"
                  type="dark"
                  effect="float"
                  id="row-hover"
                />
              </Fragment>
            );
          })}
        </TableBodyStyle>
      ) : (
        <tr>
          <TableDefines colSpan="100%">No Records Found</TableDefines>
        </tr>
      )}
    </>
  );
};

export default withRouter(_TableBody);
