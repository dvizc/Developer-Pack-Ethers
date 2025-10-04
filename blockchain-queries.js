import {ethers} from "ethers";

const { getDefaultProvider, JsonRpcProvider } = ethers;

async function main() {
    //-async es similar a await
    //-trycatch es para manejar errores
    try {
        //const provider = getDefaultProvider("sepolia");

        //-Await y Privider
        //-Porque se usa await- las consultas a la blockchain son asincronas bi son inmediatas y debe esperar
        //-Porque se usa provider- es el objeto que permite interactuar con la blockchain
        //-Puente de comunicacion, contiene metodos que nos permiten consultas
        
        //-Poner lo de alquemist
        console.log("📡 Conectando a Ethereum Mainnet con TU Alchemy API...");
        const provider = new JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/JvcF9wru8tdPg0U2v0V4Z');

        //-Poner el wallet
        const balance = await provider.getBalance("0xeb4856b891d7B4100E33b13451e8b0722F73A04D");
        console.log("Balance:", balance.toString());

        const network = await provider.getNetwork();
        console.log("Network fetched:",  JSON.stringify(network, null, 2)); //-formato bonito del objeto para lectura humana

        const blockNumber = await provider.getBlockNumber();
        console.log("Block Number:", blockNumber);
        
        // example address you can replace
        const transactionCount = await provider.getTransactionCount("0xeb4856b891d7B4100E33b13451e8b0722F73A04D");
        console.log("Transaction Count:", transactionCount);

        const feeData = await provider.getFeeData();
        console.log("FeeData:", feeData);

        const block = await provider.getBlock(blockNumber);
        console.log("Block:", block);
        
        // SimpleCryptoKitties contract deployed on sepolia and we will interact with
        const code = await provider.getCode("0xdaCc865922356723C01305F819E65ffB1b14520D");
        console.log("Code:", code);

    } catch (error) {
        console.error("Error:", error);
    }
}


main();