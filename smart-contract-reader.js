import { ethers } from "ethers";

// 1. ABI completo (opcional)
const contractABI = [
// ...
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
// ...
];

// 2. ABI en formato HUMAN READABLE
//const contractABI = ["function name() view returns (string)"];
//-QUE ES EL ABI- Application Binary Interface
//-Es un contrato inteligente compilado en un formato que puede entender la blockchain
//-Define las funciones y eventos del contrato
//-Es necesario para interactuar con contratos inteligentes en la blockchain
//-EL ABI RETORNA FUNCTION SIGNATURES Y DATA ENCODING INSTRUCTIONS
//-EL ABI SIEMPRE ES DE TIPO LECTURA (VIEW)
const contractAddress = "0x983236bE64Ef0f4F6440Fa6146c715CC721045fA";

async function main() {
    try {
        const provider = ethers.getDefaultProvider("sepolia");
        const readOnlyContract = new ethers.Contract(contractAddress, contractABI, provider);
        const name = await readOnlyContract.name();
        console.log("Token Name:", name);
    } catch (error) {
        console.error("Error in contract interaction:", error);
    }
}

main();