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
     // loop through transactions
     for (let j = 0; j < transactions.length; j++) { 
        const { fromAddress, toAddress, amount, hash } = transactions[j];
        // don't validate reward transactions
        if (fromAddress != null) { 
            // validate transaction hash
            const testTransactionHash = sha256(fromAddress + toAddress + amount).toString();
            if (hash != testTransactionHash) { 
                return false; //If the hashes don't match, return false.
            } //If the hashes don't match, return false.
        } //If the fromAddress is not null, you want to validate the transaction.

     }
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
//you can't send transactions unless you have enough tokens. You need to create a function that checks the balance of an address.
export function getAddressBalance(address) { 
    const blockchain = getBlockchain();
    let balance = 0;
    // To find a balance, you need to loop over all the blocks and transactions, see if any of transaction addresses match the address passed to the function, and add or subtract the amount. 
    // loop through blocks
    // the genesis block doesn't have any transactions, so create a for loop that goes through all except the first block.
    for (let i = 1; i < blockchain.length; i++) { 
        const { transactions } = blockchain[i];
        // loop through transactions
        for (let j = 0; j < transactions.length; j++) { 
          const { fromAddress, toAddress, amount } = transactions[j];
          if (fromAddress === address) { 
            balance -= amount;
          }
    
          if (toAddress === address) { 
            balance += amount;
    
          }
    
        }
        
    }
    return balance;
      
    }