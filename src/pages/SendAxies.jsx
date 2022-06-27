import React, {useState} from 'react';
import AxieAPI from '../services/AxieAPI';
import Validation from '../services/Validation';
import Web3 from '../services/Web3';

/**
 * @return {Element} Returns Home Page Content
 */
function SendAxies() {
  const [state, setState] = useState({axies: [], pvkey: '', errors: []});

  const addError = (error, msg) => {
    const errors = state.errors;
    errors[error] = msg;
    return setState({...state, errors: errors});
  };

  const handleFetchAxies = () => {
    if (!Validation.isPrivateKeyValid(state.pvkey)) {
      return addError('pvkey', 'Invalid Private Key');
    }
    const wallet = Web3.getWallet(state.pvkey);
    AxieAPI.getAxies(wallet.address, (axies) => {
      setState({...state, axies: axies, errors: []});
    });
  };

  const handlePvKey = (e) => setState({...state, pvkey: e.target.value});

  return (<div className='marginmenu container'>
    <h3 className='text-center'>Send Axies</h3>
    <p className='text-center'>
      This send axies.Destination will be asked later. Show limit is 100
    </p>
    <span className='error-text'>{state.errors['pvkey']}</span>
    <input onChange={handlePvKey}
      value={state.pvkey}
      className='form-control mb-4'
    />
    <button onClick={handleFetchAxies} className='form-control'>
      Fetch Axies
    </button>
    <div className='row mt-5'>
      {state.axies.length > 0 ? (<>
        {state.axies.map((axie) => (<div key={axie.id} className='col-auto'>
          <img src={`https://axiecdn.axieinfinity.com/axies/${axie.id}/axie/axie-full-transparent.png`}
            className="axieimg">

          </img>
        </div>))}
      </>) : (<></>)}
    </div>
  </div>);
}

export default SendAxies;
