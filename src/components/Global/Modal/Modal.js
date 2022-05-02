import React from 'react';
import { Modal, Image } from 'react-bootstrap';
import closeIcon from '../../../assets/icons/icon-n-close.svg';
import "./Modal.scss";

function ScavengerModal(props) {
    const { 
        header, body, footer, modalProps,
        openState
    } = props;
    return(
        <Modal centered={true} show={openState} {...modalProps} >
            <Modal.Header>
                <div className='flexBox'>
                    <div className='header'>{header}</div>
                    <div>
                        <Image
                            src={closeIcon} 
                            className="icon pointer"
                            onClick={() => modalProps.onHide()}
                        />
                    </div>
                </div>
            </Modal.Header>
            <Modal.Body>
                {body}
            </Modal.Body>
            { 
                footer && (
                    <Modal.Footer className="footer">
                        {footer}
                    </Modal.Footer>
                )
            }
        </Modal>
    )
}

export default ScavengerModal;
