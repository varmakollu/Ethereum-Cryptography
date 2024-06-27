const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { pbkdf2 } = require("ethereum-cryptography/pbkdf2");
const { bytesToHex, hexToBytes, utf8ToBytes } = require("ethereum-cryptography/utils");
const { sha256 } = require("ethereum-cryptography/sha256");
const { keccak256 } = require("ethereum-cryptography/keccak");

(async () => {
  // Step-1: Generate a 32 bytes private key using PBKDF2
  const privateKey = bytesToHex(await pbkdf2(utf8ToBytes("Calyptus"), utf8ToBytes("Hello"), 999, 32, "sha256"));
  console.log("Private Key:", privateKey);

  // Step-2: Calculate the sha256 hash of the message "Web3 is Awesome"
  const messageHash = bytesToHex(sha256(utf8ToBytes("Web3 is Awesome")));
  console.log("Message Hash:", messageHash);

  // Step-3: Compute the public key using secp256k1 from the private key
  const publicKey = bytesToHex(secp256k1.getPublicKey(hexToBytes(privateKey), false));
  console.log("Public Key Before Recovery:", publicKey);

  // Step-4: Generate signer's Ethereum address from the public key using Keccak256
  const ethAddressBeforeRecovery = "0x" + bytesToHex(keccak256(hexToBytes(publicKey.substring(2)))).substring(24);
  console.log("Ethereum Address Before Recovery:", ethAddressBeforeRecovery);

  // Step-5: Calculate the signature of the message hash
  const signature = await secp256k1.sign(messageHash, hexToBytes(privateKey));
  console.log("Signature:", signature);

  // Step-6: Verify the signature
  const isSigned = secp256k1.verify(signature, messageHash, hexToBytes(publicKey));
  console.log("Is Signature Valid:", isSigned);

  // Step-7: Recover public key from the signature
  const recoveredPubKey = bytesToHex(secp256k1.recoverPublicKey(messageHash, signature, 0));
  console.log("Public Key After Recovery:", recoveredPubKey);

  // Step-8: Generate Ethereum address from the recovered public key
  const ethAddressAfterRecovery = "0x" + bytesToHex(keccak256(hexToBytes(recoveredPubKey.substring(2)))).substring(24);
  console.log("Ethereum Address After Recovery:", ethAddressAfterRecovery);

  // Check if both Ethereum addresses match
  if (ethAddressBeforeRecovery === ethAddressAfterRecovery) {
    console.log("Ethereum Addresses Match. Project Completed!");
  } else {
    console.log("Ethereum Addresses Do Not Match. Please check your code.");
  }
})();
