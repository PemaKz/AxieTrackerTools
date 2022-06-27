import React from 'react';

/**
 * @return {Element} Returns Claim and Send Page Content
 */
function ClaimAndSend() {
  return (<div className='marginmenu container'>
    <h3 className='text-center'>Claim & Send SLP</h3>
    <p className='text-center'>
      This claims slp from account using private key and send percentage desired
      first to the academy and then to the player.
    </p>
    <div className='row'>
      <div className='col-12'>
        <input className='form-control'/>
      </div>
    </div>
    <div className='row mt-2'>
      <div className='col-8'>
        <input className='form-control'/>
      </div>
      <div className='col-4'>
        <input className='form-control'/>
      </div>
    </div>
    <button className='form-control mt-4'>Claim Account</button>
  </div>);
}

export default ClaimAndSend;
