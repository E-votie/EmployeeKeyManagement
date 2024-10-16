// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EmployeeKeyManagement {
    address public owner;
    
    struct Employee {
        string employeeId; // Changed to string
        string publicKey;
        bool exists;
    }
    
    mapping(string => Employee) private employees; // EmployeeId as string
    mapping(string => string) private publicKeyToEmployeeId; // Mapping publicKey to employeeId for easy lookup
    
    event EmployeeAdded(string employeeId, string publicKey);
    event EmployeeUpdated(string employeeId, string publicKey);
    event EmployeeRemoved(string employeeId);
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }
    
    // Add Employee with a string employeeId
    function addEmployee(string memory _employeeId, string memory _publicKey) public onlyOwner {
        require(!employees[_employeeId].exists, "Employee already exists");
        
        employees[_employeeId] = Employee({
            employeeId: _employeeId,
            publicKey: _publicKey,
                exists: true
        });
        
        // Map publicKey to employeeId
        publicKeyToEmployeeId[_publicKey] = _employeeId;
        
        emit EmployeeAdded(_employeeId, _publicKey);
    }
    
    // Update Employee
    function updateEmployee(string memory _employeeId, string memory _newPublicKey) public onlyOwner {
        require(employees[_employeeId].exists, "Employee does not exist");
        
        // Update publicKey mapping
        delete publicKeyToEmployeeId[employees[_employeeId].publicKey];
        employees[_employeeId].publicKey = _newPublicKey;
        publicKeyToEmployeeId[_newPublicKey] = _employeeId;
        
        emit EmployeeUpdated(_employeeId, _newPublicKey);
    }
    
    // Remove Employee
    function removeEmployee(string memory _employeeId) public onlyOwner {
        require(employees[_employeeId].exists, "Employee does not exist");
        
        // Remove from publicKey to employeeId mapping
        delete publicKeyToEmployeeId[employees[_employeeId].publicKey];
        
        delete employees[_employeeId];
        
        emit EmployeeRemoved(_employeeId);
    }
    
    // Get publicKey by employeeId
    function getPublicKey(string memory _employeeId) public view returns (string memory) {
        require(employees[_employeeId].exists, "Employee does not exist");
        return employees[_employeeId].publicKey;
    }
    
    // Validate if an address is a valid Ethereum address
    function isValidAddress(address _addr) public pure returns (bool) {
        return _addr != address(0); // Check if the address is non-zero
    }
    
    // Get employeeId by publicKey
    function getEmployeeIdByPublicKey(string memory _publicKey) public view returns (string memory) {
        require(bytes(publicKeyToEmployeeId[_publicKey]).length > 0, "Public key does not exist");
        return publicKeyToEmployeeId[_publicKey];
    }
}
