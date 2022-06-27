import React from 'react';

/**
 * @return {Element} Returns Send Tokens Page Content
 */
function SendTokens() {
  return (<div className={`d-flex flex-column fullsizescreen \
  align-items-center`}>
    <h3 className='bold-text'>
        Send Tokens
    </h3>
    <div className='d-flex align-items-center flex-grow-1 w-md-50 w-75'>
      <div className='text-center w-100'>
        <div className='row'>
          <div className='col-lg-6'>
            <input className='form-control'/>
          </div>
          <div className='col-lg-6'>
            <input className='form-control'/>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-lg-6'>
            <select className='form-control'>
              <option>Test</option>
            </select>
          </div>
          <div className='col-lg-6'>
            <input className='form-control'/>
          </div>
        </div>
        <button className='form-control mt-3'>
          Send Tokens
        </button>
      </div>
    </div>
  </div>);
}

export default SendTokens;
