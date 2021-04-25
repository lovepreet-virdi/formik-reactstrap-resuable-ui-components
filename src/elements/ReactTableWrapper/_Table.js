import React from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useSortBy,
  useExpanded,
  useRowSelect,
  usePagination,
  useResizeColumns,
} from "react-table";
import { Row, Col } from "reactstrap";
import { StyledToolPanel, StyledToolbar, CardStyles } from "./TableStyles";
import SearchInput from "./controls/SearchInput";
import ShowHideColumnToolBar from "./controls/ShowHideColumnToolBar";
import CheckBox from "./controls/CheckBox";
import RadioButton from "./controls/RadioButton";
import _TableBody from "./_TableBody";
import _Pagination from "./_Pagination";
import SingleActionComponent, {
  BulkActionComponent,
} from "./SingleActionComponent";
import "./Styles.css";
// import { BaseAction } from "../../Fullfillment/ManageOrders/Actions";
// import { bulkActionsArray } from "../../Fullfillment/ManageOrders/Actions/Actionslist";

// <======= Table (Main table) =============>
function _Table(props) {

  let {
    columns,
    data,
    search = false,
    selectRows = false,
    selectColumns = false,
    pageCount: controlledPageCount,
    actions = [], // render actions on row
    subRowActions = [], // render actions on expanded row/ sub-row
    tableClasses = "table table-hover",
    viewOn,
    rowSet = {}, // getting all row data which got expanded
    selectRowsType = "checkbox",
    updateMyData = {},
    skipPageReset,
    selectedRowIds = {},
    selectedRowsCallback = () => { },
    getAllRows = () => { },
  } = props;


  const tableProps = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        selectedRowIds: selectedRowIds,
        hiddenColumns: ["description"],
      },
      manualPagination: true,
      pageCount: controlledPageCount,
      autoResetPage: skipPageReset,
      autoResetSelectedRows: false,
      updateMyData,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    useResizeColumns,
    hooks => {
      // return if selecting row is false
      // if (!selectRows) return [];
      if (selectRows) {
        // adding checkbox to header and rows
        hooks.visibleColumns.push(columns => [
          {
            id: "selection",
            Header: function Header({ getToggleAllRowsSelectedProps }) {
              if (selectRowsType === "radio") return null;
              return (
                <div>
                  <CheckBox {...getToggleAllRowsSelectedProps()} />
                </div>
              );
            },
            Cell: function Cell({ row }) {
              if (row.original?.status != "Open" && viewOn == "dashboard")
                return null; //hiding checkbox for dashboard receipt

              return selectRowsType === "radio" ? (
                <RadioButton
                  onClick={() => {
                    tableProps.toggleAllRowsSelected(false);
                    tableProps.toggleRowSelected(row.id);
                  }}
                  {...row.getToggleRowSelectedProps()}
                />
              ) : (
                <CheckBox {...row.getToggleRowSelectedProps()} />
              );
            },
          },
          ...columns,
        ]);
      }

      // adding sub column actions to table
      if (subRowActions.length > 0) {
        hooks.visibleColumns.push(columns => [
          ...columns,
          {
            Header: "Actions",
            id: "actions",
            Cell: function Cell({ row }) {
              return (
                <SingleActionComponent
                  rowData={row}
                  actions={subRowActions}
                  parentRow={rowSet}
                />
              );
            },
          },
        ]);
      }

      if (actions.length > 0) {
        hooks.visibleColumns.push(columns => [
          ...columns,
          {
            Header: "Actions",
            id: "actions",
            Cell: function Cell({ row }) {
              return (
                <SingleActionComponent
                  rowData={row}
                  actions={actions}
                  parentRow={rowSet}
                />
              );
            },
          },
        ]);
      }
      return [];
    }
  );

  // Return All Rows
  getAllRows && getAllRows(tableProps?.data);

  const mergingObjects = { ...tableProps, ...props };

  const toolbarActions = () => {
    const selectedRows = tableProps?.selectedFlatRows;
    selectedRowsCallback && selectedRowsCallback(selectedRows);

    if (selectedRows?.length && actions.length > 0) {
      return (
        <>
          {/* <Collapse isOpen={isToolPanelOpen}> */}
          <StyledToolbar>
            {/* <--------Bulk Actions---------> */}
            <BulkActionComponent rowData={selectedRows} actions={actions} />
          </StyledToolbar>
          {/* </Collapse> */}
        </>
      );
    }

    return (
      <>

        <div className="d-flex mt-3">
          {/* <-------Show/Hide Columns----------> */}
          {selectColumns && (
            <>
              <ShowHideColumnToolBar {...tableProps} />
            </>
          )}
          {/* <----------Global Search-----------> */}
          {search && (
            <SearchInput
              globalFilter={tableProps.globalFilter}
              setGlobalFilter={tableProps.setGlobalFilter}
            />
          )}
        </div>


      </>
    );
  };

  return (
    <>
      <CardStyles>
        {/* <---------Action Panel---------> */}
        <div className={search || selectColumns ? "d-flex" : "d-none"}>
          {/* ------- toolbar ------ */}
          <StyledToolPanel className="form-inline w-100 mb-3">
            <div className="form-group justify-content-between align-items-center w-100">{toolbarActions()}</div>
          </StyledToolPanel>

        </div>

        {/* <----------------Table-----------------> */}
        <Row className="mb-0">
          <Col>
            <div className="table-responsive p-2">

              <table {...tableProps.getTableProps()} className={tableClasses}>
                {/* <-------Table headers section------> */}
                <_TableBody {...mergingObjects} />
              </table>
            </div>
          </Col>
        </Row>
        {/* <-------Pagination section-------> */}
        <_Pagination {...mergingObjects} />
      </CardStyles>
    </>
  );
}

export default _Table;
