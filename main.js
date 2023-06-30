const SHA256 = require('crypto-js/sha256');
// run code "npm --save crypto-js" in terminal to install sha256


// defining structure of block and hash calculation
class Block{
    constructor(index,timestamp, data, previousHash = '') {
      this.index = index;
      this.previousHash = previousHash;
      this.timestamp = timestamp;
      this.data = data;
      this.previousHash=previousHash;
      this.hash=this.calculateHash();
      this.nonce =0;
    }
  // we now apply hash calculating function and proof of work
  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)+this.nonce).toString();
   }
   mineBlock(difficulty){
    while(this.hash.substring(0,difficulty) !==Array(difficulty+1).join("0")){
      this.nonce++;
      this.hash=this.calculateHash();
    }
    console.log("block mined:" +this.hash);
   }
}

class Blockchain{
    constructor(){
        this.chain =[this.createyayBlock()];
        this.difficulty =2;
    }
    createyayBlock(){
        return new Block(0,"27/06/2023","yay block","0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i=1;i < this.chain.length; i++){
          const currentBlock =this.chain[i];  
          const previousBlock =this.chain[i -1];  

          if(currentBlock.hash !== currentBlock.calculateHash()){
            return false;
          }
          if(currentBlock.previousHash != previousBlock.hash){
            return false;
          }
        }
        return true;
    }
}
let hitesh =new Blockchain();
console.log('Mining block 1...');
hitesh.addBlock(new Block(1,"28/06/2023",{amount: 4,sender: "hitesh",receiver: "blank"}));
console.log('Mining block 2...');
hitesh.addBlock(new Block(2,"29/06/2023",{amount: 10,sender: "person1",receiver: "person2"}));

console.log('Is blockchain valid? '+ hitesh.isChainValid());
console.log(JSON.stringify(hitesh, null, 4));
// below lines are to check if chain validation works correct or not.

//hitesh.chain[1].data ={ amount: 100};
//console.log('Is blockchain valid? '+ hitesh.isChainValid());


