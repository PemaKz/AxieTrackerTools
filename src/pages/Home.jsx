import React from 'react';
import {useNavigate} from 'react-router-dom';
import {BiCheckCircle, BiRightArrowAlt} from 'react-icons/bi';

/**
 * @return {Element} Returns Home Page Content
 */
function Home() {
  const navigate = useNavigate();
  const handleGoStart = () => {
    navigate('/claimandsend');
  };
  return (<div className={`d-flex fullsizescreen \
  justify-content-center align-items-center`}>
    <div style={{zIndex: 1}} className='text-center container'>
      <h2 className='bold-text'>
        Free and Simple <span className='primary-text'>Web3 Tools </span>
        to Manage your Axie Academy
      </h2>
      <div className={'row semibold-text justify-content-center \
      my-3'}>
        <div className='col-lg-auto'>
          <BiCheckCircle id="text" className=' me-1 primary-dg' />
          Track progress from your accounts
        </div>
        <div className='col-lg-auto'>
          <BiCheckCircle id="text" className='ms-3 me-1 primary-dg' />
          Manage Accounts & Send Assts
        </div>
        <div className='col-lg-auto col'>
          <BiCheckCircle id="text" className='ms-3 me-1 primary-dg' />
          Analyze Accounts
        </div>
      </div>
      <button onClick={handleGoStart}
        className='startbutton primary-bg px-3 py-1 mt-3 text-white'>
          Go to Claim & Send <BiRightArrowAlt />
      </button>
    </div>
    <div className={'rightaxiebg animate__slow\
    animate__animated animate__bounce animate__infinite'}>
      <img src="https://axiecdn.axieinfinity.com/axies/10535891/axie/axie-full-transparent.png"/>
    </div>
    <div className={'leftaxiebg animate__slow\
    animate__animated animate__headShake animate__infinite'}>
      <img src="https://axiecdn.axieinfinity.com/axies/10535891/axie/axie-full-transparent.png"/>
    </div>
  </div>);
}

export default Home;
