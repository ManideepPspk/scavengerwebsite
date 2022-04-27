import React, { useEffect } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import './Notification.scss';
import { Image } from 'react-bootstrap';
import backIcon from '../assets/icons/backIcon.png'
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { retriveUniqueBranch } from '../actions/BranchActions';

const Notification = () => {
    const history = useHistory();
    let isID = sessionStorage.getItem('authToken')
    const dispatch = useDispatch();
    const retData = useSelector((state) => state.branchreducer);
    let { viewUniquebranch = {} } = retData;
    let params = { email: isID }
    useEffect(() => {
        dispatch(retriveUniqueBranch(params));
    }, []);

    let rowdata = viewUniquebranch?.payload?.myNotifications;
    console.log(params, retData, rowdata, "noti")

    const tableval = (props1, ssss) => {
        return (
            <span className={ssss}>{props1}</span>
        )
    }
    function goBack() {
        history.push("/dashboard");
    }
    let gotoNotificationsRecord = (rowData) => {
        history.push({ pathname: `/notificationrecord` ,state: { rowData , _id:viewUniquebranch?.payload?._id }} )
    };
    return (
        <div className='maincl'>
            <div className='mb-4 mt-4'>
                <Image onClick={goBack} src={backIcon} className="icon" />
                <b>Notifications</b>
            </div>
            {(rowdata && rowdata.length > 0) ? (
                <TableContainer className="tableContent" component={Paper}>
                <Table stickyHeader aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{tableval("Name", "tablehead")}</TableCell>
                            <TableCell align="left">{tableval("Email", "tablehead")}</TableCell>
                            <TableCell align="left">{tableval("Pincode", "tablehead")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowdata && rowdata.map((row, idx) => (
                            <TableRow
                                onClick={() => gotoNotificationsRecord(row)}
                                className = "seer"
                                key={idx}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {tableval(row.name, row.isread === false ?"tablebody name read":"tablebody name")}
                                </TableCell>
                                <TableCell align="left">{tableval(row.email, row.isread === false ?"tablebody read":"tablebody ")}</TableCell>
                                <TableCell align="left">{tableval(row.pincodeCovered, row.isread === false ?"tablebody read":"tablebody")}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            ) : (
                <div className={"listgroupItemNoNotificationCls"}>
                Sorry. No Notifications. </div>
            )

            }
        </div>
    );
};

export default Notification;