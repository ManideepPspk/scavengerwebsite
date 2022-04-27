/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import {
    Col,
    Form,
    Row,
} from 'react-bootstrap';
import { useDispatch } from "react-redux";
import './styles/LoginStyles.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import BDOButton from '../Global/Button/BDOButton';
import InputText from '../Global/Input/InputText';
import { getAvailableBranches } from "../../actions/BranchActions";
import BDOModal from '../Global/BDOModal/BDOModal';

export default function Searchbox() {
    let initialValues = {};
    const dispatch = useDispatch();
    const [modalData, setModalData] = useState(false);
    const openModal = () => {
        setModalData(true)
    }
    const closeModal = () => {
        setModalData(false);
    };

    let validationSchemaActual = {
        name: Yup.string()
            .required('Required field'),
        email: Yup.string()
            .required('Required field'),
        phonenumber: Yup.number()
            .required('Required field'),
        pincodeCovered: Yup.number()
            .required('Required field')
    }
    const handleErrorMsg = (success, error, token) => {
        if (success === true) {
            formik.resetForm();
        }
        if (success === false) {
            console.log(error, formik.errors, "error")
        }
    }

    function uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    var userID = uuid();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema: Yup.object(validationSchemaActual),
        onSubmit: (values) => {
            values.notificationId = userID;
            values.date = new Date().toLocaleDateString();
            values.time = new Date().toLocaleTimeString();
            values.isread = false;
            dispatch(getAvailableBranches(values, (respData) => {
                console.log(respData, "respdata")
            }));
        },
        validate: values => {
            let errors = {};
            if (values.pincodeCovered && !/^[0-9]{6}$/.test(values.pincodeCovered)) {
                errors.pincodeCovered = 'Please enter 6 digit number';
            }
            if (values.phonenumber && !/^[0-9]{10}$/.test(values.phonenumber)) {
                errors.phonenumber = 'Please enter 10 digit number';
            }
            if ( values.email &&
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email format';
            }
            return errors;
        }
    });

    console.log(formik, formik.errors, formik.values)

    const getClassName = (formik, fieldName) => {
        let returnMsg = "input-text";
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
    return (
        <div >
            <div className="btnLogin">
                <BDOButton
                    title="Search"
                    variant="secondary"
                    onClick={openModal}
                />
            </div>

            {
                modalData && (
                    <BDOModal
                        header={"Search a Pin Code"}
                        body={
                            <Form>
                                <Row className="mt-2">
                                    <Col >
                                        <h6 className='float-left'>
                                            <label htmlFor='name' className=''>Name :-</label>

                                        </h6>
                                        <InputText
                                            className={getClassName(formik, 'name')}
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            name='name'
                                            placeholder='Enter name'
                                        />
                                        {renderError(formik, 'name')}
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col >
                                        <h6 className='float-left'>
                                            <label htmlFor='email' className=''>Email :-</label>

                                        </h6>
                                        <InputText
                                            className={getClassName(formik, 'email')}
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            name='email'
                                            placeholder='Enter email'
                                        />
                                        {renderError(formik, 'email')}
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col >
                                        <h6 className='float-left'>
                                            <label htmlFor='phonenumber' className=''>Phone Number :-</label>

                                        </h6>
                                        <InputText
                                            type="number"
                                            className={getClassName(formik, 'phonenumber')}
                                            value={formik.values.phonenumber}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            name='phonenumber'
                                            placeholder='Enter phonenumber'
                                        />
                                        {renderError(formik, 'phonenumber')}
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col >
                                        <h6 className='float-left'>
                                            <label htmlFor='pincodeCovered' className=''>pincodeCovered :-</label>

                                        </h6>
                                        <InputText
                                            type="number"
                                            className={getClassName(formik, 'pincodeCovered')}
                                            value={formik.values.pincodeCovered}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            name='pincodeCovered'
                                            placeholder='Enter Password'
                                        />
                                        {renderError(formik, 'pincodeCovered')}
                                    </Col>
                                </Row>

                            </Form>
                        }
                        footer={
                            <div className="float-right mr-4">
                                <BDOButton type="submit" title='Search' style1="style1" onClick={formik.handleSubmit} />
                            </div>
                        }
                        openState={modalData}
                        modalProps={{ onHide: closeModal }}
                    />
                )
            }
        </div>);
}
