# Project: Digital Ledgers by Building a Blockchain

This project provides a simple implementation of a blockchain and related functionalities. It consists of a series of files for building a basic blockchain system.

## Getting Started

### Clone the Repository:
```
bash
git clone https://github.com/your-username/digital-ledgers-by-building-a-blockchain.git
cd digital-ledgers-by-building-a-blockchain
```

### Run the Project:

Navigate to the project directory in the terminal and execute commands directly.

```
bash
node init-blockchain.js
```

### Available Commands:

node init-blockchain.js: Initializes the blockchain with a genesis block.
node add-block.js: Adds a new block to the blockchain with transactions.
node validate-chain.js: Validates the integrity of the blockchain.
node add-transaction.js <fromAddress> <toAddress> <amount>: Adds a new transaction to the list of transactions.

## Project Structure

### add-block.js:

Adds a new block to the blockchain with transactions.
```
bash
node add-block.js
```

### blockchain-helpers.js:

Contains helper functions for managing the blockchain and transactions.

### add-transaction.js:

Adds a new transaction to the list of transactions.
```
bash
node add-transaction.js <fromAddress> <toAddress> <amount>
```

### init-blockchain.js:

Initializes the blockchain with a genesis block.
```
bash
node init-blockchain.js
```

### validate-chain.js:

Validates the integrity of the blockchain.
```
bash
node validate-chain.js
```

### blockchain.json:

Stores the blockchain data, including blocks and transactions.

### transactions.json:

Stores a list of transactions.


## Usage

To add blocks to the blockchain, use add-block.js.
Manage transactions with add-transaction.js.
Initialize the blockchain with init-blockchain.js.
Validate the blockchain integrity with validate-chain.js.

Feel free to customize and extend the functionality of the blockchain as needed for your project.
