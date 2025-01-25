const { MerkleTree } = require("merkletreejs");
const SHA256 = require("crypto-js/sha256");

// List of Ethereum addresses
const addresses = [
  "0x1234567890123456789012345678901234567890",
  "0x09876543210987654321098765432109876543210",
  "0xfedcba0987654321fedcba0987654321fedcba09",
  "0xabcdef1234567890abcdef1234567890abcdef12",
  "0x9abcdef0987654321abcdef0987654321abcdef09",
];

// Function to create the Merkle tree
function createMerkleTree(addresses) {
  const leaves = addresses.map((address) => SHA256(address).toString());
  const tree = new MerkleTree(leaves, SHA256);
  return tree;
}

// Create the Merkle tree
const tree = createMerkleTree(addresses);

// Get the Merkle root
const merkleRoot = tree.getRoot().toString("hex");
console.log("Merkle Root:", merkleRoot);

// Function to verify a proof
function verifyProof(tree, proof, leafIndex) {
  return tree.verify(proof, leafIndex);
}

// Example: Verify the second address (index 1)
const proof = tree.getProof(1);
console.log("Verification result:", verifyProof(tree, proof, 1));

// Save the tree for later use
const treeData = tree.dump();
console.log("Tree data:", treeData);
