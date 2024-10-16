// Importing the ethers from hardhat
async function main() {
    // Get the contract factory for EmployeeKeyManagement
    const EmployeeKeyManagement = await ethers.getContractFactory("EmployeeKeyManagement");

    // Deploy the contract
    const employeeKeyManagementContract = await EmployeeKeyManagement.deploy();

    // Wait for the deployment to complete
    await employeeKeyManagementContract.deployed();

    // Log the deployed contract address
    console.log("Contract deployed to address:", employeeKeyManagementContract.address);
}

// Execute the main function
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
