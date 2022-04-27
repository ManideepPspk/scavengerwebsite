import React,{useState}  from 'react';
import './styles/LoginStyles.scss';
import {
    Col,
    Row,
} from 'react-bootstrap';
import './styles/LoginStyles.scss';
import NewLogin from '../Loginpage/NewLogin';
import Searchbox from './Searchbox';
const LoginLayout = (props) => {


    return (
        <div>
            <Row className="fullHeight">
                <Col sm={7} className="leftCol">
                            <Searchbox />
                </Col>
                <Col className="rightCol" >
                    <div className="centerDiv">
                <div className="subTitle">
                    <span >Log in to Scavengers</span>
                    
                    <NewLogin setitem = {props.setitem} />
                </div>
            </div>
                </Col>
            </Row>
        </div>
    )
}


export default LoginLayout;