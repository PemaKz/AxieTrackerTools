import React, {useState} from 'react';
import AxieAPI from '../services/AxieAPI';
import VLD from '../services/Validation';
import Web3 from '../services/Web3';
/**
 * @return {Element} Returns Claim Page Content
 */
function Claim() {
  const [state, setState] = useState({pvkey: ''});

  const handlePvkey = (e) => setState({pvkey: e.target.value});
  const handleClaimAccount = () => {
    if (!VLD.isPrivateKeyValid(state.pvkey)) return console.log('No PVKEY');
    AxieAPI.getRandomMessage((rndmsg) => {
      if (!rndmsg) return console.log('There was an error random API');
      AxieAPI.createAccessToken(rndmsg, state.pvkey, (accesstoken) => {
        if (!accesstoken) return console.log('There was an error access token');
        AxieAPI.claimSLP(accesstoken, (claiminfo) => {
          if (!claiminfo) return console.log('There was error with the claim');
          Web3.claimSLP(state.pvkey, claiminfo, (result) => {
            console.log('Claimed');
          });
        });
      });
    });
  };

  return (<div className='marginmenu container'>
    <h3 className='text-center'>Claim SLP</h3>
    <p className='text-center'>
      This claims slp from account using private key
    </p>
    <input value={state.pvkey} onChange={handlePvkey} className='form-control'/>
    <button onClick={() => handleClaimAccount()} className='form-control mt-4'>
      Claim Account
    </button>
  </div>);
}

export default Claim;
