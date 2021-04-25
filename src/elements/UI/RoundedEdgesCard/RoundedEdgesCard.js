import React from 'react'
import './RoundedEdgesCard.scss';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
import SelectField from './SelectField/SelectField';

export default function RoundedEdgesCard({ children = "", className = "", cardText = "", title = "", cardSubtitle = "", cardImg = null, dropdownData = null, ...props }) {
    return (
        <Card className={`rounded-card ${className}`} {...props}>
            {cardImg &&
                <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />}
            <CardBody>
                {title && <CardTitle>
                    <h3>{title}</h3>
                    {dropdownData && <SelectField isBorderLessSelect {...dropdownData} />}
                </CardTitle>}
                {cardSubtitle && <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>}
                {cardText && <CardText>{cardText}</CardText>}
                {children}
            </CardBody>
        </Card>
    )
}
