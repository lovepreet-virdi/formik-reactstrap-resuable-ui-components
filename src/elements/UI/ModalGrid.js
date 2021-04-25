import React from "react";
import ButtonComponent from "./ButtonComponent";
import ReactTableWrapper from "../ReactTableWrapper";
import ModalComponent from "./ModalComponent";

function ModalGrid({ 
  onCancel,
  records,
  modal=false,
  title="",
  tableHeader = [],
  viewOn="",
  controlledPagination=true,
  selectedRowCallback = () => {},
  graphDetails = {}
}) 
{
  return (
    <ModalComponent
        modal={modal}
        title={title}
        modalWidth="modal-xl"
    >
      <ReactTableWrapper
        selectRows={true}
        expandRows={false} //make expandable
        tableHeaders={tableHeader} // table headers
        selectColumns={true} // hide/show columns
        search={true}
        controlledPagination={controlledPagination}
        selectRowsType="radio"
        selectedRowsCallback={selectedRowCallback}
        fetchRecords={graphDetails}
        records={records}
        viewOn={viewOn}
      />

      <div className="modal-body-submit-wrapper">
        <ButtonComponent color="cancel" onClick={onCancel}>
          Cancel
        </ButtonComponent>
        {/* <ButtonComponent color="info">
        Cancel
        </ButtonComponent> */}
      </div>
  </ModalComponent>
  );
}

export default ModalGrid;
