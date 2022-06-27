import React, {useRef, useState} from 'react';
import {Modal} from 'bootstrap';

const DonateButton = () => {
  const [state, setState] = useState({modalShow: false});
  const modalRef = useRef();
  const handleDonateModal = () => {
    if (state.modalShow) {
      const element = modalRef.current;
      const bsModal = new Modal(element, {
        backdrop: 'static',
        keyboard: false,
      });
      bsModal.show();
    } else {
      const element = modalRef.current;
      const bsModal= Modal.getInstance(element);
      bsModal.hide();
    }
    setState({...state, modalShow: state.modalShow ? false : true});
  };
  return (<>
    <div className='donatebutton'>
      <button onClick={handleDonateModal}
        className='bg-dg-primary p-2 me-3 mb-3 rounded bold-text'>
        Donate
      </button>
    </div>
    <div className="modal fade" ref={modalRef} id="exampleModal">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" className="close" onClick={handleDonateModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            ...
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger me-auto"
              onClick={handleDonateModal}>
              Close
            </button>
            <button type="button" className="btn btn-primary">Donate</button>
          </div>
        </div>
      </div>
    </div>
  </>);
};

export default DonateButton;
