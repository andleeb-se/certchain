const crypto = require("crypto");

// Block structure
class Block {
  constructor(index, data, previousHash = "") {
    this.index        = index;
    this.timestamp    = new Date().toISOString();
    this.data         = data;
    this.previousHash = previousHash;
    this.hash         = this.calculateHash();
  }

  // calculate hash of this block
  calculateHash() {
    return crypto
      .createHash("sha256")
      .update(
        this.index +
        this.timestamp +
        this.previousHash +
        JSON.stringify(this.data)
      )
      .digest("hex");
  }
}

// Blockchain structure
class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  // first block
  createGenesisBlock() {
    return new Block(0, { message: "Genesis Block" }, "0");
  }

  // get last block
  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  // add new block
  addBlock(data) {
    const previousBlock = this.getLastBlock();
    const newBlock      = new Block(
      this.chain.length,
      data,
      previousBlock.hash
    );
    this.chain.push(newBlock);
    return newBlock;
  }

  // validate chain
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock  = this.chain[i];
      const previousBlock = this.chain[i - 1];

      // check hash is correct
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      // check previous hash matches
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }

  // get full chain
  getChain() {
    return this.chain;
  }
}

// single instance — shared across app
const certChain = new Blockchain();

// generate verification ID
const generateVerificationId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "VER-";
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};

// generate blockchain transaction ID
const generateBlockchainTxId = () => {
  return "0x" + crypto.randomBytes(32).toString("hex");
};

// add certificate to blockchain
const addCertificateToChain = (certificateData) => {
  const block = certChain.addBlock(certificateData);
  return block;
};

// get full blockchain
const getBlockchain = () => {
  return certChain.getChain();
};

// validate blockchain
const validateBlockchain = () => {
  return certChain.isChainValid();
};

module.exports = {
  addCertificateToChain,
  getBlockchain,
  validateBlockchain,
  generateVerificationId,
  generateBlockchainTxId,
};