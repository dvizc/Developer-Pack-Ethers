const {ethers, parseUnits}=require('ethers');
const {JsonRpcProvider,formatUnits}=ethers;
const privateKey='acff81c68ea355596db7c41f65b62e78facd1728794658b704d6ac9621da5cbe';
const recipientAddress='0xeb4856b891d7B4100E33b13451e8b0722F73A04D';
const amountInEther='0.001';
async function main(){
    try{
        const provider=new JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/JvcF9wru8tdPg0U2v0V4Z');
        const wallet=new ethers.Wallet(privateKey,provider);
        const tx={
            to: recipientAddress,
            value:ethers.parseEther(amountInEther),
            gasLimit:21000, //-limite de gas para una transaccion simple
            gasPrice:await provider.getGasPrice() //-precio actual del gas
        };
        console.log('Enviando transaccion...');
        const transactionResponse=await wallet.sendTransaction(tx);
        console.log('Hash de la transaccion:',transactionResponse.hash);
        const receipt=await transactionResponse.wait();
        console.log('Transaccion confirmada en el bloque:',receipt.blockNumber);
        console.log('Detalles del recibo:',receipt);
    }catch(error){
        console .error('Error en la transaccion:',error);
    }
}
main();