require("dotenv").config();
const express = require('express');
const ethers = require('ethers');
const cors = require('cors');
const CONTRACT_ABI = require("./EmployeeKeyManagement.json").abi;
const app = express();
app.use(express.json());
app.use(cors());

const provider = new ethers.providers.InfuraProvider(
    process.env.NETWORK,
    process.env.INFURA_API_KEY
);

const wallet = new ethers.Wallet(process.env.TESTNET_PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

// 1. Add Employee
app.post('/employee', async (req, res) => {
  const { employeeId, publicKey } = req.body;

  try {
    const tx = await contract.addEmployee(employeeId, publicKey);
    await tx.wait();
    res.status(200).json({ message: 'Employee added successfully', tx });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Update Employee
app.put('/employee/:id', async (req, res) => {
  const { id } = req.params;
  const { publicKey } = req.body;

  try {
    const tx = await contract.updateEmployee(id, publicKey);
    await tx.wait();
    res.status(200).json({ message: 'Employee updated successfully', tx });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Remove Employee
app.delete('/employee/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const tx = await contract.removeEmployee(id);
    await tx.wait();
    res.status(200).json({ message: 'Employee removed successfully', tx });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Get Employee Public Key
app.get('/employee/:id/publicKey', async (req, res) => {
  const { id } = req.params;

  try {
    const publicKey = await contract.getPublicKey(id);
    res.status(200).json({ publicKey });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Check if Address is Registered
app.get('/isRegistered/:address', async (req, res) => {
  const { address } = req.params;

  try {
    const isRegistered = await contract.isValidAddress(address);
    res.status(200).json({ isRegistered });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
