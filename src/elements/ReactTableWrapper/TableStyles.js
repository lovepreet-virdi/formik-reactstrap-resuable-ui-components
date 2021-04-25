import S from "styled-components";
import Card from "reactstrap/lib/Card";

const color = "#015294";
const white = "#ffffff";
const tableHeaderDefault = "#ffffff";
const tableHeaderChild = "rgba(248, 155, 50, 0.05)";
const tableHeadertextColor = "#015294";
const highlight = "#2185d01f";
const black = "#000000";

export const TableRootStyles = S.div`
  .table-hover tbody tr:hover {
    color: inherit;
    background-color: rgba(0, 0, 0, 0.075);
  }
  tr > th {
    font-weight: 500;
  }
  td {
    padding: 13px;
    width: auto;
    min-width: 0;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  td > .fa {
    cursor: pointer;
  }
`;

export const StyledToolPanel = S.div`
  padding-left: 8px;
  // height: 60px;
  display: flex !important;
`;

export const BulkActionDiv = S.div`
  button {
    border: solid 1px ${color} !important;
    background-color: ${color} !important;
    margin-right: 5px;

    &:hover: {
      border: solid 1px ${color} !important;
      background-color: ${color} !important;
    }
  }
`;

export const TableHeaderStyle = S.thead`
  color: ${tableHeadertextColor};
  background-color: ${props =>
    !props.isChildTable ? tableHeaderDefault : tableHeaderChild};
  border-top: 1px solid #efefef;
  font-size: 12.5px;
  tr > th {
    min-width:90px;
    width: 150px;
    max-width: 200px;
    font-weight: 700;
    border: none;
  }
`;

export const TableBodyStyle = S.tbody`
  tr {
    border-bottom: 1px solid #efefef;
    padding: 20px;
  }
`;

export const SortingIcons = S.span`
  color: ${white};
`;

export const BtnIcon = S.i``;

export const ShowHideColumnBtnStyles = S.button`
  background: #F7F8F9;
  border: 1px solid #E1E1E1;
  width: auto;
  height: 34px;
  border-radius: 4px;
`;

export const PaginationStyles = S.div`
  justify-content: space-between !important;
  display: flex !important;
  height: 60px;
  padding: 8px;
  input,
  select {
    border: none;
  }
  margin-top: 10px;
`;

export const SearchDivStyle = S.div`
  .form-control {
    padding-left: 2.375rem;
    background: #F7F8F9;
    border: 1px solid #E1E1E1;
  }
  .form-control-search {
    position: absolute;
    z-index: 2;
    display: block;
    width: 2.375rem;
    height: 2.375rem;
    line-height: 2.375rem;
    text-align: center;
    pointer-events: none;
    color: ${color};
  }
`;

export const NextPageSpan = S.button`
  border: solid 1px ${color};
  background-color: ${color};
  color: ${white};
  cursor: pointer;
  :hover {
    color: ${white};
  }
`;

export const PreviousPageSpan = S.button`
  border: solid 1px ${color};
  background-color: ${color};
  color: ${white};
  :hover {
    color: ${white};
  }
`;

export const HideShowColumnHeading = S.div`
  background: ${highlight};
  color: ${black};
  height: 30px;
  font-weight: 600;
`;

export const TableDefines = S.td`
  background: ${highlight};
  font-weight: 600;
  text-align: center;
`;

export const CardStyles = S(Card)`
  border-radius: 6px;
  border: 1px solid #efefef9c;
  box-shadow: none !important;
`;

export const StyledToolbar = S.div`
  button {
    border: solid 1px ${color} !important;
    background-color: ${color} !important;
    margin-right: 5px;

    &:hover: {
      border: solid 1px ${color} !important;
      background-color: ${color} !important;
    }
  }
`;
