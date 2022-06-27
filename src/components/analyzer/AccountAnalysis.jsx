import React from 'react';

const AccountAnalysis = (wallets) => {
  wallets = wallets.wallets;
  return wallets.map((wallet, index) => {
    return (<div key={wallet.address}
      className='analyzedaccount p-2 my-2 rounded'>
      <div className='row align-items-center'>
        <div className='col-6'>
          <p className='text-truncate p-0 m-0'>
            {wallet.name || 'No Name'} - {wallet.address}
          </p>
          <p className='text-truncate p-0 m-0 text-muted'>
            Copy Private Key -&gt; {wallet.privateKey}
          </p>
        </div>
        <div className='col-6'>
          <div className='row text-center mx-2 assetscontainer mb-2 rounded'>
            <div className='col'>
              <img className='assetstokens' src="/img/icons/axiecoin.png" />
              <p className='p-0 m-0'>{wallet.axies || 0}</p>
            </div>
            <div className='col'>
              <img className='assetstokens' src="/img/icons/landcoin.png" />
              <p className='p-0 m-0'>{wallet.lands || 0}</p>
            </div>
            <div className='col'>
              <img className='assetstokens' src="/img/icons/itemcoin.png" />
              <p className='p-0 m-0'>{wallet.items || 0}</p>
            </div>
          </div>
          <div className='row text-center mx-2 currencycontainer rounded'>
            <div className='col'>
              <img className='currencytokens' src="/img/icons/slptoken.svg" />
              <p className='p-0 m-0'>
                {wallet.slp || 0}
              </p>
            </div>
            <div className='col'>
              <img className='currencytokens' src="/img/icons/axstoken.png" />
              <p className='p-0 m-0'>{wallet.axs || 0}</p>
            </div>
            <div className='col'>
              <img className='currencytokens' src="/img/icons/ethtoken.png" />
              <p className='p-0 m-0'>{wallet.eth || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>);
  });
};

export default AccountAnalysis;
