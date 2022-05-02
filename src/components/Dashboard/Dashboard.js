/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {
    Row,
    Col,
} from 'react-bootstrap';
import './Dashboard.scss';
import { useDispatch, useSelector } from "react-redux";
import { retriveUniqueBranch } from '../../actions/BranchActions';
import CircularProgress from '@mui/material/CircularProgress';

function Dashboard(props) {
    let isID = sessionStorage.getItem('authToken')
    const dispatch = useDispatch();
    const retData = useSelector((state) => state.branchreducer);
    let { viewUniquebranch = {} } = retData;
    let params = { email: isID }
    useEffect(() => {
        dispatch(retriveUniqueBranch(params));
    }, []);
    let datatoshow = viewUniquebranch?.payload
    let tickfun = (propscall) => {
        return (
            <span className={`tick-element ${propscall}`}> &#10003;</span>
        )
    }
    let returndata = (mapdata) => {
        let dat = mapdata.join();
        return dat
    }

    console.log(params, props, retData, "dasss")
    return (
        <div className='ml-4 mr-4'>
            {datatoshow ? (
                <>
                    <div className="mt-2 mr-1 ml-1 wow1">
                        <h6> Profile Details :</h6>
                        <div className="w-100 mt-2 clrdiv">
                            <Row>
                                <Col sm={10} className="ml-4 clm1 mt-2 font1">
                                    <Row><Col sm={2} className="fw-500" >Institution Name</Col>:- &nbsp; &nbsp;<Col sm={8} >{datatoshow.institutionName}</Col></Row>
                                    <Row><Col sm={2} className="fw-500" >Branch Name</Col>:- &nbsp; &nbsp;<Col sm={8} >{datatoshow.branchName}</Col></Row>
                                    <Row><Col sm={2} className="fw-500" >City</Col>:- &nbsp; &nbsp;<Col sm={8} >{datatoshow.city}</Col></Row>
                                    <Row><Col sm={2} className="fw-500" >Address</Col>:- &nbsp; &nbsp;<Col sm={8} >{datatoshow.address}</Col></Row>
                                    <Row><Col sm={2} className="fw-500" >Account Type</Col>:- &nbsp; &nbsp;<Col sm={8} >{datatoshow.accountType}</Col></Row>
                                    <Row><Col sm={2} className="fw-500" >Branch Incharge</Col>:- &nbsp; &nbsp;<Col sm={8} >{datatoshow.branchIncharge}</Col></Row>
                                    <Row><Col sm={2} className="fw-500" >Email</Col>:- &nbsp; &nbsp;<Col sm={8} >{datatoshow.email} &nbsp; {tickfun(true)}</Col></Row>
                                    <Row><Col sm={2} className="fw-500" >Contact Number</Col>:- &nbsp; &nbsp;<Col sm={8} >{datatoshow.contactNumber.map((ele) => {
                                        return <Row className='mb-2' ><Col sm={2}>{ele} &nbsp;{tickfun(true)}</Col></Row>
                                    })}</Col></Row>
                                    <Row><Col sm={2} className="fw-500" >Pincodes</Col>:- &nbsp; &nbsp;<Col sm={8} >{returndata(datatoshow.pincodeCovered)}</Col></Row>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </>) : (<div className='spinner'><CircularProgress /></div>)
            }
        </div>
    );
}

export default Dashboard;