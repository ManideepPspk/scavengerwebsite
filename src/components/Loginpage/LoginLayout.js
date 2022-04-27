import React  from 'react';
import './styles/LoginStyles.scss';
import {
    Col,
    Row,
} from 'react-bootstrap';
import './styles/LoginStyles.scss';
import NewLogin from '../Loginpage/NewLogin';
import Searchbox from './Searchbox';
import AddBranch from './AddBranch';
const LoginLayout = (props) => {


    return (
        <div>
            <Row className="fullHeight">
                <Col sm={7} className="leftCol">
                    
                <div className="centerDiv">
                    <div>
                        This page is for the Beetle Nut Institution for Pasadena city. Here we have accounts for each branch which are single/multiple pincodes. If a non user wants to notify any of the pincode he/she can fill the form in the search button below and notify the branches covering the pincodes. Then the branch manager reads them and will take appropriate action. If you are a branch manager you can login with your credentials from the login button on the right side and read the notifications. User can also create a new branch for the same Institution in the city by selecting create branch on the right side.
                    </div>
                            <Searchbox />
                            </div>
                </Col>
                <Col className="rightCol" >
                    <div className="centerDiv">
                <div className="subTitle">
                    <span >Beetle Nut Institution for Pasadena city.</span>
                    
                    <NewLogin setitem = {props.setitem} />
                    <h6> - Or -</h6>
                    <AddBranch />
                </div>
            </div>
                </Col>
            </Row>
        </div>
    )
}


export default LoginLayout;