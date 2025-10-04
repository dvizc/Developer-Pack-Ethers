
import { ethers } from "ethers";

// Note: Keep the private key secure. This is for demonstration purposes only.
// Create a new wallet with a random private key
//-SIRVE PARA PRUEBAS ESTA RANDOM
function createRandomWallet() {
    const wallet = ethers.Wallet.createRandom();
    console.log("New Wallet Address:", wallet.address);
    console.log("New Wallet Private Key:", wallet.privateKey);
    return wallet;
}

// Import an existing account with a private key
async function importWalletWithPrivateKey(privateKey, provider) {
    const wallet = new ethers.Wallet(privateKey, provider);
    console.log("Imported Wallet Address:", wallet.address);
    return wallet;
}

// Import an existing account with a mnemonic
function importWalletWithMnemonic(mnemonic) {
    const wallet = ethers.Wallet.fromPhrase(mnemonic);
    console.log("Imported Wallet Address:", wallet.address);
    return wallet;
}


// Replace with yours own
const privateKey = '0xeb4856b891d7B4100E33b13451e8b0722F73A04D';
// const mnemonic = 'fiscal fuel farm peace glass reward route term eternal dress audit maid'; 
const url = 'https://eth-sepolia.g.alchemy.com/v2/JvcF9wru8tdPg0U2v0V4Z';
async function main() {
    try {
        const provider = new ethers.JsonRpcProvider(url);
        //-PROVIDER LEE la blockchain o traer los metodos

        // Create a random wallet
        const randomWallet = createRandomWallet();

        // Import an existing account (using a private key)
        const importedWalletWithPrivateKey = await importWalletWithPrivateKey(privateKey, provider);

        // Import an existing account (using a mnemonic)
        // const importedWalletWithMnemonic = importWalletWithMnemonic(mnemonic);

        //Example: Sign a message using the random wallet
        const message = "Hello, Ethereum!";
        const signedMessage = await randomWallet.signMessage(message);
        console.log("Signed Message:", signedMessage);

        // Example: Send a transaction using the imported wallet with a private key
        const recipient = randomWallet.address; // Use the random wallet address as the recipient
        const feeData = await provider.getFeeData();
        console.log(`Current gas price: ${ethers.formatUnits(feeData.gasPrice, 'gwei')} gwei`);
        const gasLimit = 21000; // Set gas limit

        const tx = await importedWalletWithPrivateKey.sendTransaction({
            to: recipient,
            value: ethers.parseEther('0.001'), // Send 0.01 ETH
            gasLimit: gasLimit, // Set gas limit
            gasPrice: feeData.gasPrice // Get the current gas price
        });
        console.log('Transaction hash:', tx.hash);

        // Wait for the transaction to be confirmed
        const receipt = await tx.wait(); //-.wait Espera a ser incluida en los bloques de la blockchain
        console.log('Transaction confirmed:', receipt);

        // Get the new balance
        const newBalance = await provider.getBalance(randomWallet.address);
        console.log(`New Balance: ${ethers.formatEther(newBalance)} ETH`);

    } catch (error) {
        console.error("Error:", error);
    }
}

main();