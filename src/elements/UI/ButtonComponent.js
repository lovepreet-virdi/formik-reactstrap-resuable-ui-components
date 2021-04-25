import React from "react";
import S from "styled-components";

const Button = S.button`
  border-radius: 4px;
  font-style: normal;
`;

const colorType = {
  primary: "primary-btn",
  secondary: "secondary-btn",
  tertiary: "tertiary-btn",
  cancel: "cancel-btn",
  success: "success-btn",
};

export default function ButtonComponent({
  className = "",
  color = "",
  permissionId = "",
  icon = "",
  type = "button",
  children,
  ...props
}) {
  // Switch case on color to handle button colou
  const colorClass = color ? colorType[color] : "primary-btn";

  return (
    <>
      <Button
        type={type}
        className={`btn ${colorClass} ${className} btn-ripple`}
        {...props}
      >
        {icon && (
          <>
            <span className="btn-inner--icon">
              <i className={`fa fa-${icon}`}></i>
            </span>
            &nbsp;
          </>
        )}
        {children}
      </Button>
    </>
  );
}
