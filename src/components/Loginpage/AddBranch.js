/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import {
    Col,
    Form,
    Row,
    Image,
} from 'react-bootstrap';
import { useDispatch } from "react-redux";
import './styles/LoginStyles.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import BDOButton from '../Global/Button/BDOButton';
import InputText from '../Global/Input/InputText';
import { postBranch } from "../../actions/BranchActions";
import BDOModal from '../Global/BDOModal/BDOModal';
import BDOSelect from '../Global/Select/BDOSelect';
import PlusIcon from '../../assets/icons/plus_icon.svg'
import MinusIcon from '../../assets/icons/icon-delete.svg'

const AddBranch = (props) => {
    let initialValues = {};
    const dispatch = useDispatch();
    const [modalData, setModalData] = useState(false);
    const openModal = () => {
        setModalData(true)
    }
    const closeModal = () => {
        setModalData(false);
    };


    const addDatalist = (inpText, objec, setInputText, setErrorMessage, inputType) => {
        console.log(inpText,"optesd")
        if(inputType === "contactNumber"){
            if (inpText && inpText.length == 10) {
                inpText = parseInt(inpText);
                setInputText('');
                let tempObj = (objec.values.contactNumber && [...objec.values.contactNumber]) || []
                console.log(tempObj ,  [...tempObj, inpText] ,inpText , "erearar")
                objec.setFieldValue('contactNumber', [...tempObj, inpText])
            } else {
                setErrorMessage('Please enter 10 digit value')
            }
        }else{
            if (inpText && inpText.length == 6) {
                inpText = parseInt(inpText);
                setInputText('');
                let tempObj = (objec.values.pincodeCovered && [...objec.values.pincodeCovered]) || []
                objec.setFieldValue('pincodeCovered', [...tempObj, inpText])
            } else {
                setErrorMessage('Please enter 6 digit value')
            }
        }
    }


    const FindInputType = ({ className, dataObj , inputType}) => {

        const [ipText, setInputText] = useState();
        const [errorMsg, setErrorMessage] = useState();

        let inputEle = '';
        inputEle = (
            <>
                < div>
                    <InputText
                        name='dataText'
                        type="number"
                        labelClassName={"labelClass"}
                        valueClassName={"valueClass"}
                        smValue={2}
                        onChange={(e) => { setErrorMessage(''); setInputText(e.target.value) }}
                        rowClassName="rowMargin"
                        className={className}
                        placeholder={"Enter Value"}
                        value={ipText}
                    />
                    <Image className="plusIcon" src={PlusIcon} onClick={
                        () => addDatalist(ipText, dataObj, setInputText, setErrorMessage , inputType)
                    } />
                </div>
                <span className='mb-1 error-text'>
                    {errorMsg}
                </span>
            </>
        )
        return (
            inputEle
        )
    }

    let validationSchemaActual = {
        branchName: Yup.string().required('Required field'),
        email: Yup.string()
            .required('Required field'),
        password: Yup.string()
            .max(50, 'Must be 50 characters or less')
            .required('Required field'),
        branchIncharge: Yup.string().required('Required field'),
        address: Yup.string().required('Required field')
    }
    const handleErrorMsg = (success, error) => {
        if (success === true) {
            formik.resetForm();
            closeModal();
        }
        if (success === false) {
            console.log(formik.errors)
        }
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema: Yup.object(validationSchemaActual),
        onSubmit: (values) => {
            values.institutionName = "Beetle Nut";
            values.city = "Pasadena";
            dispatch(postBranch(values, (respData) => {
                const { success, error } = respData;
                console.log(respData, "REA")
                handleErrorMsg(success, error)
            }));
            console.log(values, "values")
        },
        validate: values => {
            let errors = {};
            if (values.email &&
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email format';
            }
            if ( (values?.contactNumber === undefined || values?.contactNumber?.length === 0)) {
                errors.contactNumberArray = 'Datalist should not be empty';
            }
            if ( (values?.pincodeCovered === undefined || values?.pincodeCovered?.length === 0)) {
                errors.pincodeCoveredArray = 'Datalist should not be empty';
            }
            return errors;
        }
    });
    console.log(formik.values)

    const getClassName = (formik, fieldName) => {
        let returnMsg = "input-text";
        if (fieldName === "pincodeCoveredArray" || fieldName === "contactNumberArray") {
            returnMsg = "select";
        }
        if (formik.errors[(fieldName)]) return returnMsg + " error"
        return returnMsg
    }
    const renderError = (formik, fieldName) => {
        return formik.errors[(fieldName)] ? (
            <span className='mb-1 error-text float-left'>
                {formik.errors[(fieldName)]}
            </span>
        ) : null
    }
    const removeFromDataList = (e, idx) => {
        e.stopPropagation();
        formik.values.contactNumber.splice(idx, 1);
        formik.setFieldValue('contactNumber', [...formik.values.contactNumber]);
    }
    const optionList = [];
    const constructOptionList = () => {
        (formik.values.contactNumber && formik.values.contactNumber.map((elem, idx) => (
            optionList.push({
                label: (
                    <div className="flexDivLabel">
                        <div>{elem}</div>
                        <Image onClick={(e) => removeFromDataList(e, idx)} className="icon rightIcon" height={10} width={10} src={MinusIcon} />
                    </div>
                ), value: elem, isdisabled: true
            })
        )))
    }
    constructOptionList()

    //df
    const removepincode = (e, idx) => {
        e.stopPropagation();
        formik.values.pincodeCovered.splice(idx, 1);
        formik.setFieldValue('pincodeCovered', [...formik.values.pincodeCovered]);
    }
    const optionPincode = [];
    const constructPincode = () => {
        (formik.values.pincodeCovered && formik.values.pincodeCovered.map((elem, idx) => (
            optionPincode.push({
                label: (
                    <div className="flexDivLabel">
                        <div>{elem}</div>
                        <Image onClick={(e) => removepincode(e, idx)} className="icon rightIcon" height={10} width={10} src={MinusIcon} />
                    </div>
                ), value: elem, isdisabled: true
            })
        )))
    }
    constructPincode()
    console.log(formik.values?.branchName ,"fa")
    return (
        <div >
            <div className="btnLogin">
                <BDOButton
                    title="Create Branch"
                    variant="secondary"
                    onClick={openModal}
                />
            </div>

            {
                modalData && (
                    <BDOModal
                        header={"Sign in Details"}
                        body={
                            <Form>
                                <Row className="mt-2">
                                    <Col >
                                        <div className='float-left fontweight500'>
                                            <label htmlFor='branchName' className=''>Branch Name :-</label>

                                        </div>
                                        <InputText
                                            className={getClassName(formik, 'branchName')}
                                            value={formik.values.branchName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            name='branchName'
                                            placeholder='Enter Branch Name'
                                        />
                                        {renderError(formik, 'branchName')}
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col >
                                        <div className='float-left fontweight500'>
                                            <label htmlFor='email' className=''>Email :-</label>

                                        </div>
                                        <InputText
                                            className={getClassName(formik, 'email')}
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            name='email'
                                            placeholder='Enter Email'
                                        />
                                        {renderError(formik, 'email')}
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col >
                                        <div className='float-left fontweight500'>
                                            <label htmlFor='password' className=''>Password :-</label>

                                        </div>
                                        <InputText
                                            className={getClassName(formik, 'password')}
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            name='password'
                                            placeholder='Enter Password'
                                        />
                                        {renderError(formik, 'password')}
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col >
                                        <div className='float-left fontweight500'>
                                            <label htmlFor='branchIncharge' className=''>Branch Incharge :-</label>

                                        </div>
                                        <InputText
                                            className={getClassName(formik, 'branchIncharge')}
                                            value={formik.values.branchIncharge}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            name='branchIncharge'
                                            placeholder='Enter Incharge Name'
                                        />
                                        {renderError(formik, 'branchIncharge')}
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col >
                                        <div className='float-left fontweight500'>
                                            <label htmlFor='address' className=''>Address :-</label>

                                        </div>
                                        <InputText
                                            as="textarea"
                                            rows={2}
                                            className={getClassName(formik, 'address')}
                                            value={formik.values.address}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            name='address'
                                            placeholder='Enter address'
                                        />
                                        {renderError(formik, 'address')}
                                    </Col>
                                </Row>


                                <Row className="mt-2">

                                    <Col >
                                        <div className='float-left fontweight500'>
                                            <label htmlFor="contactNumber" className=''>contact Number :-</label>
                                        </div>
                                        <>
                                            <FindInputType
                                                dataObj={{ setFieldValue: formik.setFieldValue, values: formik.values }}
                                                className={getClassName(formik, "contactNumber")}
                                                inputType = "contactNumber"
                                            />
                                        </>
                                    </Col>
                                </Row>
                                <Row className="mt-2 mr-2 ml-2">
                                    <Col>
                                        <BDOSelect
                                            className={getClassName(formik, "contactNumberArray")}
                                            name="contactNumberArray"
                                            value={formik.values.contactNumberArray}
                                            onBlur={formik.handleBlur}
                                            options={optionList}
                                            isOptionDisabled={(option) => option.isdisabled}
                                        />
                                        {renderError(formik, 'contactNumberArray')}
                                    </Col>
                                </Row>

                                <Row className="mt-2">

                                    <Col >
                                        <div className='float-left fontweight500'>
                                            <label htmlFor="pincodeCovered" className=''>Pincode :-</label>
                                        </div>
                                        <>
                                            <FindInputType
                                                dataObj={{ setFieldValue: formik.setFieldValue, values: formik.values }}
                                                className={getClassName(formik, "pincodeCovered")}
                                                inputType = "pincodeCovered"
                                            />
                                        </>
                                    </Col>
                                </Row>
                                <Row className="mt-2 mr-2 ml-2">
                                    <Col>
                                        <BDOSelect
                                            className={getClassName(formik, "pincodeCoveredArray")}
                                            name="pincodeCoveredArray"
                                            value={formik.values.pincodeCoveredArray}
                                            onBlur={formik.handleBlur}
                                            options={optionPincode}
                                            isOptionDisabled={(option) => option.isdisabled}
                                        />
                                        {renderError(formik, 'pincodeCoveredArray')}
                                    </Col>
                                </Row>
                            </Form>
                        }
                        footer={
                            <div className="float-right mr-4">
                                <BDOButton type="submit" title='Create Branch' style1="style1" onClick={formik.handleSubmit} />
                            </div>
                        }
                        openState={modalData}
                        modalProps={{ onHide: closeModal }}
                    />
                )
            }
        </div>);
};

export default AddBranch;