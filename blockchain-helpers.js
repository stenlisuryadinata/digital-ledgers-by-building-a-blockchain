import sha256 from 'crypto-js/sha256.js'; 
//you need to make it so your blockchain validates all the hash values and import the sha256 function at the top of the file like you did in your mine-block.js file.
import { writeFileSync, readFileSync } from 'fs';

export function writeBlockchain(blockchain) {
  const blockchainString = JSON.stringify(blockchain, null, 2);
  writeFileSync('./blockchain.json', blockchainString);
}

export function getBlockchain() {
  const blockchainFile = readFileSync('./blockchain.json');
  const blockchain = JSON.parse(blockchainFile);
  return blockchain;
}

export function isValidChain() {
  const blockchain = getBlockchain();

  // loop through blocks
  for (let i = 1; i < blockchain.length; i++) {
    const previousBlock = blockchain[i - 1];
    //destruct nonce from blockchain[i] in your for loop
    //destruct hash from blockchain[i] in your for loop
    //destruct transactions from blockchain[i] in your for loop
    const { previousHash, nonce, hash, transactions } = blockchain[i];

    // validate previous hash
    if (previousHash !== previousBlock.hash) {
      return false;
    }
    // validate block hash 
    const testBlockHash = sha256(nonce + previousBlock.hash + JSON.stringify(transactions)).toString();
    if (hash != testBlockHash) { 
        return false; //If the hashes don't match, return false.
        
    } //if condition that checks if the hash of the current block is not equal (!=) to the recreated hash.
  }

  return true;
}

export function writeTransactions(transactions) {
  const transactionsString = JSON.stringify(transactions, null, 2);
  writeFileSync('./transactions.json', transactionsString);
}

export function getTransactions() {
  const transactionsFile = readFileSync('./transactions.json');
  const transactions = JSON.parse(transactionsFile);
  return transactions;
}