import {ethers} from 'ethers';

export default new class Validation {
  /**
   * @param {string} address Address to be Verified
   * @return {boolean} Returns if address is valid
   */
  isValidAddress(address) {
    try {
      ethers.utils.getAddress(address);
      return true;
    } catch {
      return false;
    }
  }
  /**
   * @param {string} mnemonic Mnemonic to be Verified
   * @return {boolean} Returns if address is valid
   */
  isValidMnemonic(mnemonic) {
    if (ethers.utils.isValidMnemonic(mnemonic)) {
      return true;
    }
    return false;
  }
  /**
   * @param {string} privatekey Private Key to be Verified
   * @return {boolean} Returns if Private Key is valid
   */
  isPrivateKeyValid(privatekey) {
    try {
      new ethers.Wallet(privatekey);
      return true;
    } catch {
      return false;
    }
  }
  /**
   * @param {string} string String to be analyzed
   * @return {boolean} Return if it's valid or no
   */
  isHex(string) {
    if (/^([0-9a-f]|x|)+$/.test(string) || string === '') {
      return true;
    }
    return false;
  }
  /**
   * @param {string} string String to be analyzed
   * @return {boolean} Return if it's valid or no
  */
  isNumber(string) {
    if (/^[0-9]+$/.test(string) || string === '') {
      return true;
    }
    return false;
  }
}();
