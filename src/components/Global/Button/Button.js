import React from 'react';
import { Button } from 'react-bootstrap';
import './button.scss';

export default function ScavengerButton(props) {

    return (
        <Button
            {...props}
            className={`${props.style1} ${props.className} ${props.variant}`}
            variant=""
        >
            {props?.title || props?.children}
        </Button>
    );
}