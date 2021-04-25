import React, { cloneElement } from "react";
import useToggleModal from "../../../utilities/hooks/useToggleModal";
import ButtonWithIcon from "../../../elements/UI/ButtonComponent";
import { withRouter } from "react-router-dom";
import ModalComponent from "../../../elements/UI/ModalComponent";
// import ReactTooltip from "react-tooltip";

const nop = () => <></>;

const BaseActionInternal = ({
  title,
  icon,
  onClick,
  iconColor,
  children,
  isBulk = false,
  actionType = "icon",
  bulkKeys = [],
  showOn = ["ALL"],
  hideOn = [],
  redirectRule = "/",
  history,
  rowData,
  modalTitle,
  alt = "",
  toolTipData = "",
  iscallback = false,
  callback = () => { },
  ...rest
}) => {
  const [modal, toggle, openModal, closeModal] = useToggleModal();



  const _onClick = () => {

    if (iscallback === true) {
      callback(rowData)
    }

    if (redirectRule !== "/") {
      history.push({
        pathname: redirectRule,
        state: {
          bulkKeys,
          isBulk,
          rowData,
        },
      });
      return;
    }

    openModal();
    onClick && onClick();
  };
  
  return (
    <>
      <ModalComponent
        modal={modal}
        // toggle={toggle}
        title={`${modalTitle}`}
        {...rest}
      >
        {cloneElement(children, {
          onCancel: closeModal,
          // isBulk,
          // bulkKeys,
          // status: selectedTab.data.status,
        })}
      </ModalComponent>
      {actionType == "icon" && (
        <i
          // title={title}
          onClick={_onClick}
          className={`fa fa-${icon} m-1 cursor`}
          style={{ color: iconColor || "#5388ae" }}
        />
      )}

      {actionType == "button" && (
        <ButtonWithIcon
          // disabled={!isBulk}
          icon={icon}
          onClick={_onClick}
        // style={{ backgroundColor: iconColor || "#5388ae" }}
        >
          {title}
        </ButtonWithIcon>
      )}

      {actionType === "svg" && (
        <>
       
          <img
            src={require(`../../../assets/svgs/${icon}`).default}
            className="cursor-pointer pr-3"
            onClick={_onClick}
            data-tip={toolTipData}
            alt={alt}
          />
          {/* <ReactTooltip /> */}
        </>
      )}
    </>
  );
};

export const BaseAction = React.memo(withRouter(BaseActionInternal));

export default function SingleActionComponent({
  rowData = [],
  actions = [],
  parentRow = {},
}) {
  const data = rowData?.original || {};
  return actions.map(({ Component = nop, modalTitle = "", ...rest }, index) => {
    rest.isBulk = false;
    return (
      <BaseAction {...rest} rowData={data} modalTitle={modalTitle} key={index}>
        <Component
          rowData={data}
          {...rest}
          parentRowData={parentRow}
          key={index}
        />
      </BaseAction>
    );
  });
}

export function BulkActionComponent({
  rowData = [],
  actions = [],
  parentRow = {},
}) {
  const dataSet = rowData.map(o => o.original);
  return actions
    .filter(action => !action.excludeBulk)
    .map(({ Component = nop, modalTitle = "", ...rest }) => {
      rest.isBulk = true;
      rest.actionType = "button";
      return (
        <>
          <BaseAction {...rest} rowData={dataSet} modalTitle={modalTitle}>
            <Component rowData={dataSet} {...rest} parentRowData={parentRow} />
          </BaseAction>
        </>
      );
    });
}
