
const WS_PROVIDER = 'wss://ropsten.infura.io/ws' //wss://mainnet.infura.io/ws //wss://ropsten.infura.io/ws //wss://rinkeby.infura.io/ws
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.WebsocketProvider(WS_PROVIDER));

const subscription = web3.eth.subscribe('newBlockHeaders', (error, blockHeader) => {
  if (error) return console.error(error);
}).on('data', (blockHeader) => {
  //retrieve transactions from the block (true )
  web3.eth.getBlock(blockHeader.number, true, (err, confirmedBlock) => {
    if (!err) {
      if (confirmedBlock.transactions != null) {
      const trxs =  confirmedBlock.transactions
      if (trxs.length > 0) {
         trxs.forEach(trx => {
           const fromAddr = trx.from
           const toAddr = trx.to
           console.log('From', fromAddr)
           console.log('To',toAddr)
        })
      }
    }
    }
  })
})
