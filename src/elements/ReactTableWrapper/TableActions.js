import React from "react";
import { Button } from "reactstrap";

export const RowAction = (props) => {
  const { icon, color, callbackFn } = props;
  return <i className={color + " mr-2 fa fa-" + icon} onClick={callbackFn} />;
};

export const BulkAction = (props) => {
  const { classes, label, icon, callbackFn } = props;
  return (
    <Button className="mr-2" color="primary" size="sm" onClick={callbackFn}>
      <i className={"fa fa-" + icon} /> {label}
    </Button>
  );
};
