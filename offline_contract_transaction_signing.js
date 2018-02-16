const Web3 = require('web3')
const EthereumTx = require('ethereumjs-tx')

const INFURA_TOKEN = 'INFURA_TOKEN'
const ACCOUNT_ADDRESS = 'ACCOUNT_ADDRESS'
const ACCOUNT_KEY = 'ACCOUNT_KEY'
const CONTRACT_ADDRESS = "CONTRACT_ADDRESS"
const CONTRACT_ABI = "CONTRACT_ABI"
const CONTRACT_FUNCTION_NAME = "CONTRACT_FUNCTION_NAME"
const CONTRACT_FUNCTION_INPUT = 'INPUT_STR'

const NETWORK_GAS_PRICE =  '0x4A817C800'
const NETWORK_GAS_LIMIT = 100000

//connects to ethereum node via http provider
var web3 = new Web3(new Web3.providers.HttpProvider(`https://ropsten.infura.io/${INFURA_TOKEN}`));
var contractInstance = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
const txData = contractInstance.methods[CONTRACT_FUNCTION_NAME](CONTRACT_FUNCTION_INPUT).encodeABI();
const txParams = {
  // nonce: nonce,
  gasPrice: NETWORK_GAS_PRICE,
  gasLimit: NETWORK_GAS_LIMIT,
  to: CONTRACT_ADDRESS,
  value: 0,
  data: txData,
  chainId: 3 //mainnet: 1, ropsten: 3
}
const tx = new EthereumTx(txParams)
const privateKeyBuffer = Buffer.from(ACCOUNT_KEY, 'hex')
tx.sign(privateKeyBuffer)
const serializedTx = tx.serialize()
web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
.on('receipt', console.log);
