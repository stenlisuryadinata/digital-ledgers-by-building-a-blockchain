import { getBlockchain, writeBlockchain, getTransactions, writeTransactions, getWalletAddressFromName} from './blockchain-helpers.js';
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
//it's harder to find a hash that starts with two zeros. 
const difficulty = 2; //change this to 3/4 and run node mine-block.js in the terminal to see the hash
//the hash to start with a zero. Create a while loop that checks if !hash.startsWith('0').
//If your initial hash starts with zero, you will not enter this loop. If it doesn't, you want to look for a new hash until it does.
while (!hash.startsWith('0'.repeat(difficulty))) { 
  //the condition of your while loop, add .repeat(difficulty) so that the hash needs to start with two zeros.
  nonce++;
  hash = sha256(nonce + previousBlock.hash + JSON.stringify(transactions)).toString();
  // console.log(`nonce = ${nonce}`);
  //console.log(hash);
  //log that prints the hash in the same fashion.
  //The last line of your terminal output should print hash = <hash>, with <hash> being a hash that starts with one zero
  //to run node mine-block.js in the terminal to see the hash
  // console.log(`hash = ${hash}`)
  
}
console.log(`nonce = ${nonce}`); //not to overload the terminal with too many logs
console.log(`hash = ${hash}`); //It runs a lot faster when you don't log each try.

//It went through your loop until it found a hash that starts with zero


const newBlock = {
  //hash: Math.random().toString(),
  hash: hash,
  previousHash: previousBlock.hash,
  transactions,
  //This is how the proof of work consensus method for adding blocks to a blockchain works. If you have a nonce that will produce the hash needed, it proves that you have spent computing power needed to find it.
  nonce: nonce
  
}

const rewardAddress = getWalletAddressFromName('Me');
//Because proof of work takes a lot of resources to find the nonce, the person that finds it is rewarded
const rewardTransaction = {
  //The reward transaction will add new tokens to your blockchain and won't have a sender
  fromAddress: null,
  //toAddress: 'Me',
  toAddress: rewardAddress,
  amount: 50
}

blockchain.push(newBlock);
writeBlockchain(blockchain);
writeTransactions([rewardTransaction]);
//Change where you write the transactions.json file so it writes an array with your reward transaction as the only item.


//You should run node mine-block.js in the terminal