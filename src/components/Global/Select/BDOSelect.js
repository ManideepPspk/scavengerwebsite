import React from 'react';
import './Select.scss';
import { Image } from 'react-bootstrap';
import Select , { components } from "react-select";
import downIcon from '../../../assets/icons/icon-downward-seach.svg';

const DropdownIndicator = (
    props
) => {
    return (
        <components.DropdownIndicator {...props}>
            <Image src={downIcon} className='iconDrop'  />
        </components.DropdownIndicator>
    )
} 
const BDOSelect = ( props ) => {
    const colourStyles = {
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isFocused ? "#E5F5FF" : null,
                color: "black"
            };
        }
    };
    const { options } = props;
    let value = options && options.find(ele => ele.value === props.value); 

    return( 
        <div className='bdoSelect'>
            <Select
                {...props}
                className={
                    `selectDropDown ${props.className}`
                }
                components={{ DropdownIndicator}}
                value={value}
                styles={colourStyles}
            />
        </div>
    )
}

export default BDOSelect;
