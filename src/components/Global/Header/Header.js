/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from 'react-router-dom';
import {
  Navbar,
  NavDropdown,
  Image,
  ListGroup,
  Overlay, Row, Col,
  Popover
} from "react-bootstrap";
import notification from "../../../assets/icons/icon-notification-outline.svg";
import logoutIcon from "../../../assets/icons/icon-upload-outline.svg";
import downIcon from '../../../assets/icons/icon-dropdown.svg';
import './Header.scss';

import { useDispatch, useSelector } from "react-redux";
import { retriveUniqueBranch } from '../../../actions/BranchActions';

function Header(props) {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const history = useHistory();
  let isID = sessionStorage.getItem('authToken')
  const dispatch = useDispatch();
  const retData = useSelector((state) => state.branchreducer);
  let { viewUniquebranch = {} } = retData;
  let params = { email: isID }
  useEffect(() => {
      dispatch(retriveUniqueBranch(params));
  }, []);
  console.log(params, props, retData ,"header")
  
  let dataToBeShown = viewUniquebranch?.payload;

  const handleLogout = () => {
   props.setitem("")
   sessionStorage.removeItem('authToken')
        history.push('/')
  }

  let gotoNotifications = () => {
     history.push({ pathname: '/notifications' })
    setShow(!show)
  };
  let gotoNotificationsRecord = (rowData) => {
     history.push({ pathname: `/notificationrecord` , state:{rowData , _id: dataToBeShown?._id} })
    setShow(!show)
  };
  const popoverFunction = (<Popover id="popover-basic" className="popoverMain">
    <Popover.Title>
      <Row className="ml-1">
        <Col xs='9' sm='9' >
          <strong >Notifications</strong> 
        </Col>
        <Col xs='3' sm='3'>
          <div className="seeAll" onClick={gotoNotifications}>See all</div>
        </Col>
      </Row>
    </Popover.Title>
    <Popover.Content className="content">

      {dataToBeShown &&
        dataToBeShown.myNotifications && dataToBeShown.myNotifications.length>0 ? (dataToBeShown.myNotifications.map((ele) => {
          return (
            <>
              <ListGroup.Item onClick={() => gotoNotificationsRecord(ele)} className={ele.isread === false ? "listgroupItemCls seer read" : "listgroupItemCls seer"}>
                {ele.name}

                <div className="listItemCls">
                  {ele.pincodeCovered}
                </div>
              </ListGroup.Item>
            </>
          );
        }) ):(
          <>
          <ListGroup.Item  className={"listgroupItemNoNotificationCls"}>
            Sorry. No Notifications. 
          </ListGroup.Item>
        </>
        )
      }
    </Popover.Content>
  </Popover>);
  return (
    <Navbar
      bg="white"
      variant="white"
      expand="lg"
      sticky="top"
      className="nameHeader"
    >
      <div className="d-inline-flex">
        <Navbar.Brand className="m-0 px-2 py-0">

          <div className="notification-icon">
            <div 
                ref={target} onClick={() => setShow(!show)}
               style={{position:"relative"}}
            >
              <img
                src={notification}
                width="24"
                alt="bell"
                height="24"
              />
            </div>
            <Overlay target={target.current} show={show} placement="bottom"
              containerPadding={140} rootCloseEvent="click" rootClose onHide={() => setShow(false)}
            >
              {popoverFunction}

            </Overlay>
          </div>

        </Navbar.Brand>
        <NavDropdown
          title={<span className="name-header">{dataToBeShown?.branchName} <Image src={downIcon} className="iconCls right" /></span>}
          id="navbarScrollingDropdown"
          className="menu"
        >
          <div className="listItemNav">
            <div onClick={() => handleLogout()} className="logout">
              <Image src={logoutIcon} className="iconCls rotate90" />
              <span>Log out</span>
            </div>
          </div>
        </NavDropdown>
      </div>
    </Navbar>
  );
}

export default Header;
