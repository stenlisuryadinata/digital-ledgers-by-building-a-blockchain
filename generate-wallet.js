import { readFileSync, writeFileSync } from 'fs';
import EC from 'elliptic';

//Each wallet address will have a keypair that consists of a public and private key. The public key will be a persons address and used for transactions. Run npm install elliptic in the terminal. This package will help you generate and work with these keys.

const ec = new EC.ec('p192'); 
const keyPair = ec.genKeyPair();
//Get the public key from your keypair, in hex format
const publicKey = keyPair.getPublic('hex');
const privateKey = keyPair.getPrivate('hex');

console.log(`Public Key: ${publicKey}`);
console.log(`Private Key: ${privateKey}`);
//The keys match. Using the private key to generate keyPair2, you are able to easily find the matching public key. Change your keyPair2 declaration to use the keyFromPublic method and pass it the publicKey.
// const keyPair2 = ec.keyFromPrivate(privateKey, 'hex');

//It gave you an error. This is the importance of the elliptic curve algorithm used to create the keys and why you need to keep your private key a secret. When using the public key to generate a keypair, you cannot easily find the matching private key. But if you know the private key, you can easily find the matching public key. Delete your last two console log statements, and the publickKey2 and privateKey2 declarations.
//In a blockchain, your private key is needed to sign transactions. Add a const signature variable, and set it to keyPair.sign('message')
const keyPair2 = ec.keyFromPublic(publicKey, 'hex');
// const publicKey2 = keyPair2.getPublic('hex');
// console.log(`Public Key 2: ${publicKey2}`);
// const privateKey2 = keyPair2.getPrivate('hex'); 

// console.log(`Private Key 2: ${privateKey2}`);
//In a blockchain, your private key is needed to sign transactions.
//const signature = keyPair.sign('message');
//Add .toDER('hex') to the signature declaration to turn it into a readable format.
//const signature = keyPair.sign('message').toDER('hex');
//The same keypair was used to sign and verify the information, so the signature is valid. Change the keyPair.sign to use keyPair2.
//const signature = keyPair2.sign('message').toDER('hex');
//This time you got an error because the keypair used to sign the information was created using the public key. That keypair doesn't know the private key so it couldn't sign the information. Change the signature back to use the first keypair.
const signature = keyPair.sign('message').toDER('hex');
//console.log(`Signature: ${signature}`);
//const verifiedSignature = keyPair.verify('message', signature); 
const verifiedSignature = keyPair2.verify('messages', signature);
//It worked that time using the keypair generated from the public key. In order to verify a signature, you can use a keypair that doesn't know the private key. So when you sign a transaction with your private key, the blockchain can use your public key to make sure someone with that private key created the transaction. Change the last message to messages.
//the signature and keypair will be used to make sure that the information was signed by someone with the private key of the keypair
//console.log(`Verified: ${verifiedSignature}`);
//console.log(`Private Key: ${privateKey}`); //not to overload the terminal with too many logs
//You will give your wallet a name through the command line when you create it. At the bottom of the file, add a const newWalletName variable and set it to the command line argument (process.argv[2]).
const newWalletName = process.argv[2]
const walletsFile = readFileSync('./wallets.json'); 
let wallets = JSON.parse(walletsFile);

if (!wallets.hasOwnProperty(newWalletName)) {
    //The public key for a wallet will be used as the address for where transactions are sent and received. 
    wallets[newWalletName] = publicKey;
    wallets = JSON.stringify(wallets, null, 2);
    //use the writeFileSync method to write the wallets back to the wallets.json file
    writeFileSync('./wallets.json', wallets);
}
