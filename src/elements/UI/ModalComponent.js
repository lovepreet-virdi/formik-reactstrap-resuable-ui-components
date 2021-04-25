import React from "react";
import S from "styled-components";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const Base = S(Modal)`
  border-radius: 4px;
`;

const BaseHeader = S(ModalHeader)`
  background: #ffffff;
  color: #000000;
  font-size: 16px;
  font-style: normal;
  font-weight: bold;
  border-bottom: none;
  padding: 2rem 1rem;
`;

const BaseBody = S(ModalBody)`
  padding: 0rem 1rem 1rem;
`;

function ModalComponent({
  modal,
  toggle = () => { },
  title = "",
  modalWidth = "modal-lg",
  children,
  footer = null,
}) {
  return (
    <Base
      isOpen={modal}
      toggle={toggle}
      className={`${modalWidth}  modal-dialog-scrollable`}
    >
      <BaseHeader tag="span" toggle={toggle}>
        {title}
      </BaseHeader>
      <BaseBody className="hide-overflow-x">{children}</BaseBody>
      {footer && <ModalFooter>{footer}</ModalFooter>}
    </Base>
  );
}

export default ModalComponent;
