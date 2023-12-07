import { getAddressBalance } from './blockchain-helpers.js';

const nameOfAddress = process.argv[2];
const balance = getAddressBalance(nameOfAddress);

console.log(`The balance for ${nameOfAddress} is ${balance}`);

//node get-address-balance.js Me
//node get-address-balance.js You