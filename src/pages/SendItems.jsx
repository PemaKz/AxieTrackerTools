import React, {useState} from 'react';
import AxieAPI from '../services/AxieAPI';
import Validation from '../services/Validation';
import Web3 from '../services/Web3';

/**
 * @return {Element} Returns Home Page Content
 */
function SendItems() {
  const [state, setState] = useState({pvkey: '', items: [], errors: []});

  const addError = (error, msg) => {
    const errors = state.errors;
    errors[error] = msg;
    return setState({...state, errors: errors});
  };

  const handleFetchItems = () => {
    if (!Validation.isPrivateKeyValid(state.pvkey)) {
      return addError('pvkey', 'Invalid Private Key');
    }
    const wallet = Web3.getWallet(state.pvkey);
    AxieAPI.getItems(wallet.address, (items) => {
      setState({...state, items: items, error: []});
    });
  };

  const handlePvKey = (e) => setState({...state, pvkey: e.target.value});

  return (<div className='marginmenu container'>
    <h3 className='text-center'>Send Items</h3>
    <p className='text-center'>
      This send items.Destination will be asked later
    </p>
    <span className='error-text'>{state.errors['pvkey']}</span>
    <input onChange={handlePvKey} className='form-control my-3'></input>
    <button onClick={handleFetchItems} className='form-control'>
      Fetch Items
    </button>
    <div className='row mt-4'>
      {state.items.length > 0 ? (<>
        {state.items.map((item) => (<div key={item.id} className='col'>
          <img className="itemimg img-fluid" src={item.figureURL} />
        </div>))}
      </>):(<></>)}
    </div>
  </div>);
}

export default SendItems;
