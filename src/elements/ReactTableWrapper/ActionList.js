import DeleteLineItem from "../../components/fulfillment/actions/DeleteLineItem";

const nop = () => {};
const singleAction = [
  {
    type: "delete-line-item",
    title: "Delete Line Item",
    icon: "delete.svg",
    actionType: "svg",
    modalTitle: "Are you sure you want to remove the line item?",
    excludeBulk: true,
    isActionAllowed: true,
    Component: DeleteLineItem,
    alt: "Delete",
    modalWidth: "modal-md",
  },
  {
    type: "edit-line-item",
    title: "Edit line item",
    icon: "edit-nofill.svg",
    actionType: "svg",
    excludeBulk: true,
    redirectRule: "/fulfillment/place-order",
    alt: "Edit",
    iscallback: true,
  },
];

export default function ActionList(actions) {
  return actions
    .map((o) => {
      let newObj = singleAction.find((action) => action.type === o.type);
      return { ...newObj, ...o }; // merge/update objects
    })
    .filter(Boolean);
}
