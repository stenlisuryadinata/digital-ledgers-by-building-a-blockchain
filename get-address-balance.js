import { getAddressBalance , getWalletAddressFromName} from './blockchain-helpers.js';


const nameOfAddress = process.argv[2];
const address = getWalletAddressFromName(nameOfAddress);
//const balance = getAddressBalance(nameOfAddress);
const balance = getAddressBalance(address);

console.log(`The balance for ${nameOfAddress} is ${balance}`);

//node get-address-balance.js Me
//node get-address-balance.js You