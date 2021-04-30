import React from 'react'
import Stepper from 'react-stepper-horizontal';
import "./Stepper.scss";
import partSearch from "../../../assets/svgs/part_search.svg";
import shopingBasket from "../../../assets/svgs/shoping_basket.svg";
import customerDetails from "../../../assets/svgs/customer_details.svg";
import salesOrder from "../../../assets/svgs/sales_order.svg";
const attributes = {
    activeColor: "#f89b32",
    completeColor: "#f89b32",
    defaultColor: "#deeaf2",
    activeTitleColor: "#f89b32",
    completeTitleColor: "#f89b32",
    defaultTitleColor: "#000",

    size: 68,
    circleTop: 0,
    titleTop: 10,
    titleFontSize: 12,
    lineMarginOffset: 0,
    defaultBorderColor: "transparent",
    defaultBarColor: "#deeaf2",
    completeBarColor: "#F4972E",


}

export default function StepperComponent({ activeStep=0, steps = [{ title: 'Part search', icon: partSearch }, { title: 'Cart', icon: shopingBasket }, { title: 'Customer details', icon: customerDetails }, { title: 'Sales order', icon: salesOrder }], ...props }) {
    return (
        <div className="stepper">
            <Stepper
                steps={steps}
                activeStep={activeStep}
                {...attributes}
                className="abc"
            />
        </div>
    )
}
