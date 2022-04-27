import React , {useEffect} from 'react';
import './Notification.scss';
import { useHistory } from 'react-router-dom';
import backIcon from '../assets/icons/backIcon.png'
import { useDispatch, useSelector } from "react-redux";
import { updatenotification } from '../actions/BranchActions';
import {
    Card, Image, Row, Col,
} from 'react-bootstrap';
const NotificationRecord = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    let propsData = props?.location?.state;
    console.log(propsData , "sv")
    let params = {_id : propsData?._id , notificationId : propsData?.rowData?.notificationId }
    console.log(params)
    useEffect(() => {
        dispatch(updatenotification(params));
    }, []);
    function goBack() {
        history.push("/notifications");
    }
    let showdata = propsData?.rowData;
    return (
        <div className='maincl'>
            <div className='mb-4 mt-4'>
                <Image onClick={goBack} src={backIcon} className="icon" />
                <b>Notification Record</b>
            </div>
            
            <Card className="cardbodystyle border-0">
                        <Card.Body >
                            
                        <Row className="mt-2 mr-2 ml-2">
                                <Col xs="12" sm={12}>
                                <div className=""><span className='fw-500'>{showdata.name}</span> has checked for the pincode <span className='fw-500'>{showdata.pincodeCovered}</span> on <span className='fw-500'>{showdata.date}</span> at <span className='fw-500'>{showdata.time}</span>. As this pincode comes under your branch you are trigged a notification with his name , contact details so that you can do the needful.</div>

                                </Col>
                            </Row>
                            <hr/>
                            <Row  className="mt-2 mb-2 mr-2 ml-2"><Col sm={2} className="fw-400" > Name</Col>:- &nbsp; &nbsp;<Col sm={8} >{showdata.name}</Col></Row>
                            <Row  className="mt-2 mb-2 mr-2 ml-2"><Col sm={2} className="fw-400" > Email</Col>:- &nbsp; &nbsp;<Col sm={8} >{showdata.email}</Col></Row>
                            <Row  className="mt-2 mb-2 mr-2 ml-2"><Col sm={2} className="fw-400" > Contact Number</Col>:- &nbsp; &nbsp;<Col sm={8} >{showdata.phonenumber}</Col></Row>
                            <Row  className="mt-2 mb-2 mr-2 ml-2"><Col sm={2} className="fw-400" > Pincode Checked</Col>:- &nbsp; &nbsp;<Col sm={8} >{showdata.pincodeCovered}</Col></Row>
                            <Row  className="mt-2 mb-2 mr-2 ml-2"><Col sm={2} className="fw-400" > Date</Col>:- &nbsp; &nbsp;<Col sm={8} >{showdata.date}</Col></Row>
                            <Row  className="mt-2 mb-2 mr-2 ml-2"><Col sm={2} className="fw-400" > Time</Col>:- &nbsp; &nbsp;<Col sm={8} >{showdata.time}</Col></Row>
                            <hr/>

                            <div className='thanks'>Thank You !!!!!</div>
                        </Card.Body>
                    </Card>
        </div>
    );
};

export default NotificationRecord;