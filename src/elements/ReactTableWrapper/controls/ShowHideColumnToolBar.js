import React, { useState } from "react";
import { ShowHideColumnBtnStyles, HideShowColumnHeading } from "../TableStyles";
import { genString } from "../utils";
import { Popover, PopoverBody } from "reactstrap";
import CheckBox from "./CheckBox";
import columnFilterIcon from "../../../assets/images/react-table-icons/column-filter-icon.svg";
import columnFilterDropdownIcon from "../../../assets/images/react-table-icons/colum-filter-dropdown-icon.svg";
import ImageComponent from "../../UI/ImageComponent";

const ShowHideColumnToolBar = props => {
  const { getToggleHideAllColumnsProps, allColumns } = props;
  const [showColumns, setShowColumns] = useState(false);
  const togglePopover = () => setShowColumns(!showColumns);
  const [ID] = useState(genString());
  return (
    <>
      <ShowHideColumnBtnStyles
        id={"target-" + ID}
        type="button"
        className="mr-1 btn btn-sm d-flex align-items-center"
      >
        <ImageComponent src={columnFilterIcon} alt="column filter icon" />
        <span className="ml-2 mr-4">Filter</span>
        <ImageComponent src={columnFilterDropdownIcon} alt="column filter dropdown icon" />
      </ShowHideColumnBtnStyles>
      <Popover
        placement="bottom"
        isOpen={showColumns}
        target={"target-" + ID}
        toggle={togglePopover}
        fade={true}
        hideArrow={true}
      >
        <HideShowColumnHeading className="d-flex justify-content-center pt-1">
          Unpin all columns
        </HideShowColumnHeading>
        <PopoverBody>
          <div className="pb-1">
            <CheckBox {...getToggleHideAllColumnsProps()} /> Select All
          </div>
          {allColumns.map(column => {
            if (
              column.id == "selection" ||
              column.id == "expander" ||
              column.id == "status"
            )
              return null;
            return (
              <div key={column.id}>
                <label>
                  <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
                  {column.Header}
                </label>
              </div>
            );
          })}
        </PopoverBody>
      </Popover>
    </>
  );
};

export default ShowHideColumnToolBar;
