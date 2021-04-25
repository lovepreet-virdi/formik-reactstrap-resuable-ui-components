import React, { useEffect, useState } from "react";
import { Button, Input, FormGroup, Col } from "reactstrap";
import {
  PaginationStyles,
  PreviousPageSpan,
  NextPageSpan,
} from "./TableStyles";

// <===============Pagination===============>
const _Pagination = props => {
  const {
    isChild,
    pageCount: controlledPageCount,
    fetchData,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    showPagination = true,
  } = props;

  //   <---------calling API if requested for more data------------>
  useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  return (
    <>
      {!isChild && showPagination && (
        <PaginationStyles>
          <div>
            <PreviousPageSpan
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="btn"
              hidden={!canPreviousPage}
            >
              <i className="fa fa-arrow-left" aria-hidden="true"></i>
            </PreviousPageSpan>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <label>Go to:</label>
            <Input
              className="pt-0"
              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(page);
              }}
              style={{ width: "80px" }}
            />

          </div>
          <div>
            <Input
              type="select"
              name="select"
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </Input>
          </div>
          <div>
            <NextPageSpan
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="btn"
              hidden={!canNextPage}
            >
              <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </NextPageSpan>
          </div>
        </PaginationStyles>
      )}
    </>
  );
};

export default _Pagination;
