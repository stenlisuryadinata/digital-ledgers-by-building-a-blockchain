import sha256 from 'crypto-js/sha256.js';
import { writeTransactions, getTransactions } from './blockchain-helpers.js';

const fromAddress = process.argv[2];
const toAddress = process.argv[3];
const amount = parseInt(process.argv[4]);

const hash = sha256(fromAddress + toAddress + amount).toString();
//create a const hash variable that creates a hash using a concatenation of the fromAddress, toAddress, and amount. Here's a reminder of the syntax: sha256(<content>).toString();.

const newTransaction = {
  fromAddress,
  toAddress,
  amount
}

const transactions = getTransactions();
transactions.push(newTransaction);
writeTransactions(transactions);

//You should run node add-transaction.js You Me 12 in the terminal