import React from 'react';
import  { Form } from 'react-bootstrap';
import './InputText.scss';

export default function InputText(props) {
  
    return (
        <Form.Control  type="text"  
          aria-label="Default" 
          aria-describedby="inputGroup-sizing-default" 
          name={props.name}
          autoComplete={props.name}
          id={props.name}
          { ...props}
          className={`form-control input-text ${props.className}`}
        />
    );
  }