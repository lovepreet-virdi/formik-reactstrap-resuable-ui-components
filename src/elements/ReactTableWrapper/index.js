import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { TableRootStyles } from "./TableStyles";
import { postRequest, graphRequest } from "./APIAxios";
import CustomTable from "./_Table";
import { EnhancedTableHeader, EnhancedTableSubHeader, baseUrl } from "./utils";
import { responseConstants as RESPONSE_TYPE } from "./responseConstants";
import propTypes from "prop-types";
import useDeepCompareEffect from "./hooks/useDeepCompareEffect";
import CustomLoader from "../CustomLoader";

const nop = () => { };

// <=================Table=================>
function ReactTableWrapper(props) {
  
  const {
    subColumnIndex = "",
    selectRows = false,
    selectColumns = false,
    search = false,
    viewOn = "",
    viewRowOnClick = { redirectTo: "/" },
    refresh = 0,
    actions = [],
    subRowActions = [],
    controlledPagination = true,
    records = [],
    fetchRecords = {
      variables: {},
      query: "",
      params: {},
      endpoint: "",
      path: "",
      subIndexObj: "",
      requestType: "graph",
    },
    selectRowsType = "checkbox",
    selectedRowIds = {},
    selectedRowsCallback = () => { },
    getAllRows = () => { },
    showPagination = true,
    isExtractParentLogic = false,
    extractParentLogic = (data) => data,
    defaultPageCount = 10,
  } = props;
  const [requestParams, setRequestParams] = useState(fetchRecords);
  const columns = useMemo(() => EnhancedTableHeader(props), [records]);
  const [data, setData] = useState(records);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(100000); //page count
  const fetchIdRef = useRef(0);
  const [skipPageReset, setSkipPageReset] = useState(false);

  const updateMyData = (rowIndex, columnId, value) => {
    setSkipPageReset(true);
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  //updating on new records
  useEffect(() => {
    if (!controlledPagination) {
      if (records.length >= 0) setData(records);
    }
  }, [records]);

  // if new variables are coming then we are updating
  useDeepCompareEffect(() => {
    setRequestParams({ ...requestParams, params: fetchRecords.params });
  }, [fetchRecords.params]);

  // if new params are coming then we are updating
  useDeepCompareEffect(() => {
    setRequestParams({
      ...requestParams,
      variables: fetchRecords.variables,
    });
  }, [fetchRecords.variables]);

  // <---------------calling api to pull data--------------------->
  const fetchData = useCallback(
    ({ pageSize, pageIndex }) => {
      const {
        variables,
        query,
        params,
        endpoint,
        path,
        subIndexObj,
        requestType,
      } = requestParams;
      const fetchId = ++fetchIdRef.current;
      setLoading(true);
      if (fetchId === fetchIdRef.current) {
        if (requestType === "graph") {
          const param = {
            ...variables,
            pageSize,
            startRowIndex: pageIndex,
          };
          graphRequest(query, param)
            .then(res => {
              if (isExtractParentLogic) {
                setData(extractParentLogic(res));
                setPageCount(
                  Math.ceil(
                    extractParentLogic(res)[0]?.totalCount /
                      defaultPageCount
                  ) || 0
                );
              } else {
                const responseIndex = RESPONSE_TYPE[viewOn];
                setData(res?.data?.data[responseIndex] || []);
                setPageCount(
                  Math.ceil(
                    res?.data?.data[responseIndex][0]?.totalCount /
                      defaultPageCount
                  ) || 0
                );
              }
            })
            .catch(err => {
              setData([]);
              setPageCount(0);
            })
            .finally(() => setLoading(false));
        } else {
          const p = {
            ...params,
            startIndex: pageIndex,
            pageSize: pageSize,
            startRowIndex: pageIndex,
            endIndex: pageSize,
            StartRowIndex: pageIndex,
            PageSize: pageSize,
          };
          postRequest(baseUrl(endpoint) + path, p)
            .then(res => {
              const result = res?.data?.data;

              if (Array.isArray(result)) {
                setData(res?.data?.data || []);
                setPageCount(
                  Math.ceil(
                    res?.data?.data[0]?.totalCount / defaultPageCount
                  ) || 0
                );
                // setPageCount(res?.data?.data?.totalCount);
              } else {
                setData(res?.data?.data[subIndexObj] || []);
                setPageCount(
                  Math.ceil(res?.data?.data?.totalCount / defaultPageCount) || 0
                );
                // setPageCount(res?.data?.data?.totalCount);
              }
            })
            .catch(err => {
              setData([]);
              setPageCount(0);
            })
            .finally(() => setLoading(false));
        }
      }
    },
    [requestParams.variables, requestParams.params, refresh]
  );

  // <---------------sub-component/child-component-------------->
  const renderRowSubComponent = useCallback(row => {
    return (
      <CustomTable
        columns={EnhancedTableSubHeader(props)}
        data={row[subColumnIndex]}
        selectRows={false}
        // selectColumns={false}
        subRowActions={subRowActions}
        fetchData={nop}
        isChild={true}
        viewOn={viewOn}
        rowSet={row}
        showPagination={false}
        
      />
    );
  }, []);

  // <---------------render-------------->
  return (
    <TableRootStyles>
      <CustomLoader isLoading={loading} />
      <CustomTable
        columns={columns}
        data={data}
        renderRowSubComponent={renderRowSubComponent}
        selectRows={selectRows}
        selectColumns={selectColumns}
        fetchData={controlledPagination ? fetchData : nop}
        actions={actions}
        search={search}
        pageCount={pageCount}
        viewOn={viewOn}
        viewRowOnClick={viewRowOnClick}
        selectRowsType={selectRowsType}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
        selectedRowIds={selectedRowIds}
        selectedRowsCallback={selectedRowsCallback}
        getAllRows={getAllRows}
        showPagination={showPagination}
      />
    </TableRootStyles>
  );
}

ReactTableWrapper.propTypes = {
  fetchRecords: propTypes.shape({
    requestType: propTypes.string,
    query: propTypes.string,
    variables: propTypes.object,
    path: propTypes.string,
    params: propTypes.object,
    endpoint: propTypes.string,
    subIndexObj: propTypes.string,
  }),
};

export default ReactTableWrapper;
