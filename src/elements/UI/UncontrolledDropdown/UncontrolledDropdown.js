import React from "react";
import {
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
export default function UncontrolledDropdown({
  toggleItem = "",
  options = [],
  headers = [],
  onlyIcon = false,
  dropdownMenuClass="",
  ...props
}) {
  return (
    <UncontrolledButtonDropdown {...props}>

      {!onlyIcon ?
        <>
          <DropdownToggle>{toggleItem}</DropdownToggle>
          <DropdownMenu className={dropdownMenuClass}>
            {headers.map((item, index) =>
            (<DropdownItem
              header
              key={index}
            >
              {item.label}
            </DropdownItem>)
            )}
            {headers && headers.length > 0 ? <DropdownItem divider /> : null}

            {options.map((option, index) => (
              <DropdownItem
                onClick={() => {
                  if (option.onClick) {
                    option.onClick();
                  }
                }}
                key={index}
              > {option.icon ? option.icon : option.label}

              </DropdownItem>
            ))}
          </DropdownMenu>
        </>
        : toggleItem}
    </UncontrolledButtonDropdown>
  );
}

