import sha256 from 'crypto-js/sha256.js';
import { writeTransactions, getTransactions, getAddressBalance, getWalletAddressFromName } from './blockchain-helpers.js';
import EC from 'elliptic';

const ec = new EC.ec('p192');


//const fromAddress = process.argv[2];
const fromPrivateKey = process.argv[2];
// const toAddress = process.argv[3];
const toAddressName = process.argv[3];
const toAddress = getWalletAddressFromName(toAddressName);
const amount = parseInt(process.argv[4]);

const fromKeyPair = ec.keyFromPrivate(fromPrivateKey, 'hex');
const fromAddress = fromKeyPair.getPublic('hex');
console.log(fromAddress); 

const hash = sha256(fromAddress + toAddress + amount).toString();
//create a const hash variable that creates a hash using a concatenation of the fromAddress, toAddress, and amount. Here's a reminder of the syntax: sha256(<content>).toString();.
const signature = fromKeyPair.sign(hash).toDER('hex');

const newTransaction = {
  hash,
  fromAddress,
  toAddress,
  amount,
  signature
}

const transactions = getTransactions();
const addressBalance = getAddressBalance(fromAddress);

//add an if statement that checks if the balance is greater than or equal to the amount they are trying to send. 
if (addressBalance >= amount) {
    transactions.push(newTransaction);
    writeTransactions(transactions);
  } else { console.log('You do not have enough funds to make that transaction'); }
// transactions.push(newTransaction);
// writeTransactions(transactions);

//You should run node add-transaction.js You Me 12 in the terminal