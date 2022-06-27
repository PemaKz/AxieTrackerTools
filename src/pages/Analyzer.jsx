import React, {useState} from 'react';
import AccountAnalysis from '../components/analyzer/AccountAnalysis';
import VLD from '../services/Validation';
import Web3 from '../services/Web3';
import AxieAPI from '../services/AxieAPI';

/**
 * @return {Element} Returns Analyzer Page Content
 */
function Analyzer() {
  const [state, setState] = useState({
    naccounts: 1,
    mnemonic: '',
    errors: {},
    wallets: [],
    isWalletsLoaded: false,
  });

  const addError = (error, msg) => {
    const errors = state.errors;
    errors[error] = msg;
    return setState({...state, errors: errors});
  };

  const handleNAccounts = (e) => {
    if (!VLD.isNumber(e.target.value)) {
      return addError('naccounts', 'Not valid number');
    };
    setState({...state, naccounts: e.target.value});
  };

  const handleMnemonic = (e) => {
    setState({...state, mnemonic: e.target.value});
  };

  const handleAnalyze = () => {
    setState({...state, wallets: []});
    if (!VLD.isValidMnemonic(state.mnemonic) || !state.mnemonic) {
      return addError('mnemonic', 'Mnemonic phrase not valid!');
    }
    const wallets = getWallets(state.naccounts);
    setState({...state, wallets: wallets});
    wallets.forEach((wallet) => {
      AxieAPI.getAccountInfo(wallet.address, async (accinfo) => {
        Web3.getTokenBalance('slp', wallet.address, (slpb) => {
          Web3.getTokenBalance('axs', wallet.address, (axsb) => {
            Web3.getTokenBalance('eth', wallet.address, (ethb) => {
              Web3.getTokenBalance('axies', wallet.address, (axiesb) => {
                Web3.getTokenBalance('lands', wallet.address, (landsb) => {
                  Web3.getTokenBalance('items', wallet.address, (itemsb) => {
                    wallet.name = accinfo.publicProfileWithRoninAddress.name;
                    wallet.slp = slpb;
                    wallet.axs = axsb;
                    wallet.eth = ethb;
                    wallet.axies = axiesb;
                    wallet.lands = landsb;
                    wallet.items = itemsb;
                    setState({...state, wallets: wallets});
                  });
                });
              });
            });
          });
        });
      });
    });
    console.log(wallets);
  };

  const getWallets = (numberofwallets) => {
    const listofwallets = [];
    for (let i = 0; i < numberofwallets; i++) {
      const wallet = Web3.getWalletIndexFromMmemonic(i, state.mnemonic);
      listofwallets.push({
        address: wallet.address,
        privateKey: wallet.privateKey});
    }
    return listofwallets;
  };

  return (<div className='marginmenu container'>
    <h3 className='text-center'>Subaccounts Analyzer</h3>
    <p className='text-center'>
      Analyze desired number of subaccounts from a Mnenonic Phrase also
      check if subaccount have existing Axie Account, Assets or Unclaimed SLP.
    </p>
    <p className='text-center secondary-text'>
      Massive accounts analysis could result on system runs slow for some time.
      Just wait.
    </p>
    <div className='row mt-5'>
      <div className='col-md-2 col-3'>
        <p className='p-0 m-0 text-nowrap text-center muted-text'>
          N Accounts
        </p>
        <input onChange={handleNAccounts} value={state.naccounts}
          className='form-control'/>
        <span className='error-text'>{state.errors['naccounts']}</span>
      </div>
      <div className='col-md-10 col-9'>
        <p className='p-0 m-0 text-nowrap text-center muted-text'>
          Mnenonic Phrase
        </p>
        <input onChange={handleMnemonic} value={state.mnemonic}
          className='form-control'/>
        <span className='error-text'>{state.errors['mnemonic']}</span>
      </div>
      <div className='col-12 mt-3'>
        <button onClick={handleAnalyze}
          className='form-control btn btn-primary'>
          Start Analysis
        </button>
      </div>
    </div>
    <div className="analisys">
      <AccountAnalysis wallets={state.wallets} />
    </div>
  </div>);
}

export default Analyzer;
