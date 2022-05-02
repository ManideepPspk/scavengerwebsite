/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import {
    Col,
    Form,
    Row,
} from 'react-bootstrap';
import { useDispatch } from "react-redux";
import './styles/LoginStyles.scss';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ScavengerButton from '../Global/Button/Button';
import InputText from '../Global/Input/InputText';
import { retrieveAllBranch } from "../../actions/BranchActions";
import ScavengerModal from '../Global/Modal/Modal';

function NewLogin(props) {
    let initialValues = {};
    const history = useHistory();
    const dispatch = useDispatch();
    const [modalData, setModalData] = useState(false);
    const openModal = () => {
        setModalData(true)
    }
    const closeModal = () => {
        formik.resetForm();
        setModalData(false);
    };

    let validationSchemaActual = {
        email: Yup.string()
            .required('Required field'),
        password: Yup.string()
            .max(50, 'Must be 50 characters or less')
            .required('Required field')
    }
    const handleErrorMsg = (success, error, token , setErrors) => {
        if (success === true) {
            formik.resetForm();
            sessionStorage.setItem('authToken', token)
            props.setitem(token);
            history.push('/dashboard')
        }
        if (success === false) {
            setErrors(error)
            console.log(formik.errors)
        }
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema: Yup.object(validationSchemaActual),
        onSubmit: (values , {setErrors}) => {
            dispatch(retrieveAllBranch(values, (respData) => {
                const { success, error, token } = respData;
                handleErrorMsg(success, error, token , setErrors)
            }));
        },
        validate: values => {
            let errors = {};
            if ( values.email &&
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email format';
            }
            return errors;
        }
    });
    

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
                    <ScavengerButton
                        title="Log in"
                        variant="secondary"
                        onClick={openModal}
                    />
                </div>

            {
                modalData && (
                    <ScavengerModal
                        header={"Sign in Details"}
                        body={
                            <Form>
                                <Row className="mt-1">
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
                            </Form>
                        }
                        footer={
                            <div className="float-right mr-4">
                                <ScavengerButton type="submit" title='Login' style1="style1" onClick={formik.handleSubmit} />
                            </div>
                        }
                        openState={modalData}
                        modalProps={{ onHide: closeModal }}
                    />
                )
            }
        </div>);
}
 export default NewLogin