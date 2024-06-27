# Ethereum Cryptography Project

This project demonstrates how to perform various cryptographic operations using JavaScript libraries to generate Ethereum addresses, sign messages, and verify signatures.

## Prerequisites

Please make sure you have Node.js and npm installed on your machine.

## Installation

1. Clone the repository:
```sh
git clone https://github.com/varmakollu/Ethereum-Cryptography.git
cd Ethereum-Cryptography
```
2.  Install the required dependencies:
```
npm install ethereum-cryptography
```
3. Run the script:

```
node index.js
```
## Explanation
Step 1: Generate a private key using PBKDF2.

Step 2: Calculate the SHA256 hash of the message "Web3 is Awesome".

Step 3: Compute the public key from the private key.

Step 4: Generate the Ethereum address from the public key using Keccak256.

Step 5: Sign the message hash using the private key.

Step 6: Verify the signature using the public key.

Step 7: Recover the public key from the message hash and signature.

Step 8: Generate the Ethereum address from the recovered public key using Keccak256.
