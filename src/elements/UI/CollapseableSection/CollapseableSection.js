import React, { useState } from 'react';
import { Collapse, CardBody, Card } from 'reactstrap';
import arrowDown from '../../../assets/svgs/arrow_down.svg';
import arrowUp from '../../../assets/svgs/arrow_up.svg';
import "./CollapseableSection.scss";

const CollapseableSection = ({ label="", children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (

    <div className="collapse-section">
      <div className="wrapper">
        <h3>{label}</h3>
        <img onClick={toggle} src={isOpen ? arrowUp : arrowDown} alt={isOpen ? "arrow-up" : "arrow-down"} />
      </div>

      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            {children}
        </CardBody>
        </Card>
      </Collapse>
    </div>
  )
};

export default CollapseableSection;