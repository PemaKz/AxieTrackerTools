import axios from 'axios';
import {ethers} from 'ethers';
import VLD from './Validation';

export default new class Axie {
  /**
   * @param {string} address Addres of the account to be analyzed
   * @param {callback} callback Returns callback of the random msg by axie
  */
  getAccountInfo(address, callback) {
    if (!VLD.isValidAddress(address)) callback(false);
    // eslint-disable-next-line max-len
    const query ={'operationName': 'GetProfileByRoninAddress', 'variables': {'address': address}, 'query': 'query GetProfileByRoninAddress($address: String!) {\n  publicProfileWithRoninAddress(address: $address) {\n    ...Profile\n    __typename\n  }\n}\n\nfragment Profile on PublicProfile {\n  accountId\n  name\n  addresses {\n    ...Addresses\n    __typename\n  }\n  __typename\n}\n\nfragment Addresses on NetAddresses {\n  ethereum\n  tomo\n  loom\n  ronin\n  __typename\n}\n'};
    axios.post('https://graphql-gateway.axieinfinity.com/graphql', query).then((res) => {
      callback(res.data.data);
    }).catch(() => {
      callback(false);
    });
  }
  /**
   * @param {callback} callback Returns callback of the random msg by axie
  */
  getRandomMessage(callback) {
    const headers = {headers: {'Content-Type': 'application/json'}};
    const payload = {
      'operationName': 'CreateRandomMessage',
      'query': 'mutation CreateRandomMessage {\n  createRandomMessage\n}\n',
      'variables': {},
    };

    axios.post('https://graphql-gateway.axieinfinity.com/graphql', payload, headers)
        .then((randommsg) => {
          callback(randommsg.data.data.createRandomMessage);
        }).catch((e) => {
          callback(false);
        });
  }
  /**
   * @param {string} randonmessage Randon Message
   * @param {string} pvkey Private Key of the Account
   * @param {callback} callback Response of the accesstoken
   */
  async createAccessToken(randonmessage, pvkey, callback) {
    if (!pvkey || !(VLD.isPrivateKeyValid(pvkey))) return callback(false);
    if (!randonmessage) return callback(false);
    const headers = {headers: {'Content-Type': 'application/json'}};
    const wallet = new ethers.Wallet(pvkey);
    const signature = await wallet.signMessage(randonmessage);

    const payload = {
      'operationName': 'CreateAccessTokenWithSignature',
      'variables': {
        'input': {
          'mainnet': 'ronin',
          'owner': wallet.address,
          'message': randonmessage,
          'signature': signature,
        },
      },
      'query': `mutation \
      CreateAccessTokenWithSignature($input: SignatureInput!) \
      {\n  createAccessTokenWithSignature(input: $input) \
      {\n    newAccount\n    result\n    accessToken\n    __typename\n  }\n}\n`,
    };

    axios.post('https://graphql-gateway.axieinfinity.com/graphql', payload, headers)
        .then((datatoken) => {
          const tokenInfo = datatoken.data.data;
          callback(tokenInfo.createAccessTokenWithSignature.accessToken);
        }).catch((e) => {
          callback(false);
        });
  }
  /**
   * @param {string} accessToken Access token to make claim request
   * @param {*} callback Returns result of the claim request
   */
  claimSLP(accessToken, callback) {
    if (!accessToken) return;
    const headers = {headers: {'Authorization': 'Bearer ' + accessToken}};
    axios.post('https://game-api-pre.skymavis.com/v1/players/me/items/1/claim', {}, headers)
        .then(async (claiminfo) => {
          const chainData = claiminfo.data.blockchainRelated;
          const amount = chainData.signature.amount;
          const signature = chainData.signature.signature;
          const timestamp = chainData.signature.timestamp;
          callback({
            amount: amount,
            signature: signature,
            timestamp: timestamp,
          });
        })
        .catch((e) => {
          callback(false);
        });
  }
  /**
   * @param {string} address Addres of the account to get axies
   * @param {callback} callback Returns callback of axies in the account
  */
  getAxies(address, callback) {
    if (!VLD.isValidAddress(address)) callback(false);
    // eslint-disable-next-line max-len
    const query = `{axies(from:0,size:100,sort:IdAsc,owner:%22${address}%22){total,results{id}}}`;
    axios.get('https://graphql-gateway.axieinfinity.com/graphql?query=' + query).then((axies) => {
      if (axies.data.data.axies.results.length === 0) callback(false);
      callback(axies.data.data.axies.results);
    }).catch(() => {
      callback(false);
    });
  }
  /**
   * @param {string} address Addres of the account to get axies
   * @param {callback} callback Returns callback of axies in the account
  */
  getItems(address, callback) {
    if (!VLD.isValidAddress(address)) callback(false);
    // eslint-disable-next-line max-len
    const query = {
      'operationName': 'GetItemBriefList',
      'variables': {
        'from': 0,
        'size': 100,
        'sort': 'PriceAsc',
        'owner': address,
        'auctionType': 'All',
        'criteria': {
          'landType': [],
          'rarity': [],
          'itemAlias': [],
        },
      },
      // eslint-disable-next-line max-len
      'query': 'query GetItemBriefList($from: Int, $size: Int, $sort: SortBy, $auctionType: AuctionType, $owner: String, $criteria: ItemSearchCriteria, $filterStuckAuctions: Boolean) {\n  items(\n    from: $from\n    size: $size\n    sort: $sort\n    auctionType: $auctionType\n    owner: $owner\n    criteria: $criteria\n    filterStuckAuctions: $filterStuckAuctions\n  ) {\n    total\n    results {\n      ...ItemBrief\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment ItemBrief on LandItem {\n  itemId\n  tokenType\n  tokenId\n  itemId\n  landType\n  name\n  itemAlias\n  rarity\n  figureURL\n  auction {\n    ...AxieAuction\n    __typename\n  }\n  __typename\n}\n\nfragment AxieAuction on Auction {\n  startingPrice\n  endingPrice\n  startingTimestamp\n  endingTimestamp\n  duration\n  timeLeft\n  currentPrice\n  currentPriceUSD\n  suggestedPrice\n  seller\n  listingIndex\n  state\n  __typename\n}\n',
    };
    axios.post('https://graphql-gateway.axieinfinity.com/graphql', query).then((items) => {
      callback(items.data.data.items.results);
    }).catch(() => {
      callback(false);
    });
  }
}();
