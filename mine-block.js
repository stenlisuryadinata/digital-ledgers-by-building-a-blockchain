import { getBlockchain, writeBlockchain, getTransactions, writeTransactions } from './blockchain-helpers.js';
import sha256 from 'crypto-js/sha256.js';

const blockchain = getBlockchain();
const previousBlock = blockchain[blockchain.length - 1];
const transactions = getTransactions();
//Each block will have a unique hash since the information used to create it will never be the same.
//The process of mining a block is to keep changing the input of the hash function until you find a hash that fits a pattern you are looking for. A nonce is used to do this. 
let nonce = 0;
// const hash = sha256('passwords').toString();
// const hash = sha256(previousBlock.hash + JSON.stringify(transactions)).toString(); 
// nonce is added as the first part of the string used to create the hash
let hash = sha256(nonce + previousBlock.hash + JSON.stringify(transactions)).toString(); 
console.log(hash);

const newBlock = {
  //hash: Math.random().toString(),
  hash: hash,
  previousHash: previousBlock.hash,
  transactions
  
}

blockchain.push(newBlock);
writeBlockchain(blockchain);
writeTransactions([]);