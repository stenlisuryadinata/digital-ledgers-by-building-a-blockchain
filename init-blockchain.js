import { writeBlockchain, writeTransactions } from './blockchain-helpers.js';
//You will add more validation later that verifies all the block hashes, making your existing blocks invalid. So you need to re-initialize your blockchain. 
const genesisBlock = {
  hash: "0",
  previousHash: null
}

const blockchain = [genesisBlock];
writeBlockchain(blockchain);

writeTransactions([]); //You also need to reset your transactions.json file so it's empty.