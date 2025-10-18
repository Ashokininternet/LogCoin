const SHA256 = require('crypto-js/sha256');
class CryptoBlock {
    constructor(index, timestamp, data, precedingHash = "") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.precedingHash = precedingHash;
        this.hash = this.computeHash();
    };
    computeHash() {
        return SHA256(this.index + this.precedingHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}
class CryptoBlockchain {
    constructor() {
        this.blockchain = [this.startGenesisBlock()];
    }
    startGenesisBlock() {
        return new CryptoBlock(0, "17/10/2025", "Initial Block in the Chain", "0");
    }
    obtainLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }
    addNewBlock(newBlock) {
        newBlock.precedingHash = this.obtainLatestBlock().hash;
        newBlock.hash = newBlock.computeHash();
        this.blockchain.push(newBlock);
    }
}
let LogCoin = new CryptoBlockchain();
LogCoin.addNewBlock(new CryptoBlock(1, "17/10/2025", {sender : "Ashok", recipient : "Rajalekshmy",  quantity: 50}));
LogCoin.addNewBlock(new CryptoBlock(2, "17/10/2025", {sender : "Rajalekshmy", recipient : "Kailas",  quantity: 10}));
console.log(JSON.stringify(LogCoin, null , 4))