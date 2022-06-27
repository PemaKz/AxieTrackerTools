import {ethers} from 'ethers';
import ABIs from '../config/abis.json';
import VLD from './Validation';

const slpAddress = '0xa8754b9fa15fc18bb59458815510e40a12cd2014';
const axieAddress = '0x32950db2a7164ae833121501c797d79e7b79d74c';

const provider = new ethers.providers.JsonRpcProvider('https://api.roninchain.com/rpc');

export default new class Web3 {
  /**
   * @param {string} pvkey Private Key To get Wallet
   * @return {Wallet} Returns Full Wallet from the pvkey
   */
  getWallet(pvkey) {
    return new ethers.Wallet(pvkey);
  }

  /**
   * @param {int} index Private Key To get Wallet
   * @param {string} mnemonic Private Key To get Wallet
   * @return {Wallet} Returns Full Wallet from the index and Mnemonic
   */
  getWalletIndexFromMmemonic(index, mnemonic) {
    const path = `m/44'/60'/0'/0/${index}`;
    const wallet = ethers.Wallet.fromMnemonic(mnemonic, path);
    return wallet;
  }

  /**
   * @param {string} token Private Key To get Wallet
   * @param {string} address Private Key To get Wallet
   * @param {callback} callback callback with the info
   * @return {Wallet} Returns callback with the info
   */
  getTokenBalance(token, address, callback) {
    let tkn = '';
    let unit = '';
    if (token == 'slp') {
      unit = 'wei';
      tkn = '0xa8754b9fa15fc18bb59458815510e40a12cd2014';
    }
    if (token == 'axs') {
      unit = 'ether';
      tkn = '0x97a9107c1793bc407d6f527b77e7fff4d812bece';
    }
    if (token == 'usdc') {
      unit = 'wei';
      tkn = '0x0b7007c13325c48911f73a2dad5fa5dcbf808adc';
    }
    if (token == 'eth') {
      unit = 'ether';
      tkn = '0xc99a6a985ed2cac1ef41640596c5a5f9f4e19ef5';
    }
    if (token == 'axies') {
      unit = 'wei';
      tkn = '0x32950db2a7164ae833121501c797d79e7b79d74c';
    }
    if (token == 'items') {
      unit = 'wei';
      tkn = '0xa96660f0e4a3e9bc7388925d245a6d4d79e21259';
    }
    if (token == 'lands') {
      unit = 'wei';
      tkn = '0x8c811e3c958e190f5ec15fb376533a3398620500';
    }
    if (!tkn) return callback(balance);
    const tokenContract = new ethers.Contract(tkn, ABIs.eth, provider);
    tokenContract.balanceOf(address).then((balanceBig) => {
      if (unit == 'we') return;
      const balance = ethers.utils.formatUnits(balanceBig, unit);
      return callback(balance);
    });
  }


  /**
   * @param {string} pvkey Private Key of the Account to Claim
   * @param {object} claiminfo Claim Info of the from Axie API
   * @param {callback} callback Return response of Web3 Claim
   * @return {object} Return callback response of Web 3 Claim
   */
  claimSLP(pvkey, claiminfo, callback) {
    if (!(VLD.isPrivateKeyValid(pvkey))) {
      return callback({error: 'Private Key not valid'});
    }
    const wallet = new ethers.Wallet(pvkey);
    const walletpr = wallet.connect(provider);
    const slpContract = new ethers.Contract(slpAddress, ABIs.slp, walletpr);
    provider.getSigner();
    slpContract.checkpoint(
        wallet.address,
        claiminfo.amount,
        claiminfo.timestamp,
        claiminfo.signature, {
          from: wallet.address,
          gasPrice: ethers.utils.parseUnits('1', 'gwei'),
          gasLimit: 500000,
        },
    ).then(async (tx) => {
      await tx.wait();
      callback({success: 'SLP Claimed Successfully'});
    }).catch((e) => {
      callback({error: 'There was an error claiming SLP'});
    });
  }


  /**
   * @param {string} to Wallet address from the receiver
   * @param {string} amount Amount to send
   * @param {string} pvkey Private Key of the sender
   * @param {callback} callback Returns response of the send operation
   * @return {object} Returns response of the send operation
   */
  sendSLP(to, amount, pvkey, callback) {
    if (!(VLD.isValidAddress(to))) {
      return callback({error: 'Destination address not valid'});
    }
    if (!(VLD.isPrivateKeyValid(pvkey))) {
      return callback({error: 'Private Key not valid'});
    }
    if (!amount) return callback({error: 'Amount not valid'});
    const wallet = new ethers.Wallet(pvkey);
    const walletpr = wallet.connect(provider);
    const slpContract = new ethers.Contract(slpAddress, ABIs.slp, walletpr);
    slpContract.transfer(
        to,
        amount, {
          from: wallet.address,
          gasPrice: ethers.utils.parseUnits('1', 'gwei'),
          gasLimit: 500000,
        },
    ).then(async (tx) => {
      await tx.wait();
      callback({success: 'SLP Sent Successfully'});
    }).catch((e) => {
      callback({error: 'There was an error sending SLP'});
    });
  }


  /**
   * @param {string} to Wallet addres of the receiver
   * @param {int} axieid Axie Id To Be Send
   * @param {string} pvkey Private Key of the sender
   * @param {callback} callback Returns response of the operation
   * @return {object} Returns callback response of the operation
   */
  sendAxie(to, axieid, pvkey, callback) {
    if (!(VLD.isValidAddress(to))) {
      return callback({error: 'Destination address not valid'});
    }
    if (!(VLD.isPrivateKeyValid(pvkey))) {
      return callback({error: 'Private Key not valid'});
    }
    if (!axieid) return callback({error: 'Axie ID not valid'});
    const wallet = new ethers.Wallet(pvkey);
    const walletpr = wallet.connect(provider);
    const axieContract = new ethers.Contract(axieAddress, ABIs.axie, walletpr);
    provider.getSigner();
    axieContract.safeTransferFrom(
        wallet.address,
        to,
        axieid, {
          gasPrice: ethers.utils.parseUnits('1', 'gwei'),
          gasLimit: 500000,
        },
    ).then(async (tx) => {
      await tx.wait();
      return callback({success: 'Axie Sent Successfully'});
    }).catch((e) => {
      console.log(e);
      return callback({error: 'There was an error sending Axie'});
    });
  }
}();
