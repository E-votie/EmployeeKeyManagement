
# 🚀 EmployeeKeyManagement - Ethereum Smart Contract

## 📝 Description
This project provides a smart contract on the Ethereum blockchain for managing employee keys securely and efficiently. It leverages blockchain technology to ensure secure and immutable key management.

## 📋 Prerequisites
Before running this project, ensure you have the following tools installed:
- [Node.js](https://nodejs.org/en/download/)
- [Hardhat](https://hardhat.org/)
- [npm](https://www.npmjs.com/)
- A blockchain node provider such as [Alchemy](https://www.alchemy.com/) or [Infura](https://infura.io/)
- An Ethereum wallet like [MetaMask](https://metamask.io/)

## 🚀 Getting Started

Follow these steps to get the project up and running:

### 1. 📂 Clone the repository
```bash
git clone https://github.com/your-repo/EmployeeKeyManagement.git
cd EmployeeKeyManagement
```

### 2. 📦 Install dependencies
```bash
npm install
```

### 3. ⚙️ Setup environment variables
Create a `.env` file to securely store your private credentials:
```bash
touch .env
```

Inside the `.env` file, add:
```bash
PRIVATE_KEY=<your-private-key>
ALCHEMY_API_URL=<your-alchemy-api-url>
CONTRACT_ADDRESS=<your-contract-address> # Leave empty for now; will be filled after deploying
```

### 4. 📜 Deploy the contract
Run the following command to deploy your contract on your chosen network:
```bash
npx hardhat run scripts/deploy.js --network <network-name>
```

### 5. 🔗 Update contract address
After deployment, copy the contract address from the console output and update the `CONTRACT_ADDRESS` variable in your `.env` file.

### 6. 🖥️ Start the server
Once the contract is deployed and everything is set, start the server:
```bash
npm start server.js
```

## 📚 Useful Commands

- Test the contract:
```bash
npx hardhat test
```
- Compile the contract:
```bash
npx hardhat compile
```
- Deploy to a test network:
```bash
npx hardhat run scripts/deploy.js --network rinkeby
```

## 📄 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙌 Contributers

lahiruthpala

---
