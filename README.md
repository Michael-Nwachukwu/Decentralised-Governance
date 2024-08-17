# Voting Smart Contract

This project contains a Solidity-based smart contract called `Governance` that contains functions that allow users to cast votes on predefined options. The contract ensures that each address can vote only once, and the votes are securely recorded on the blockchain.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Smart Contract Details](#smart-contract-details)
- [License](#license)

## Project Overview

The `Governance` smart contract is designed to facilitate a simple voting process on the Ethereum blockchain. Users can vote on a list of predefined options, and each vote is securely recorded to prevent tampering or multiple votes from the same address.

## Features

- **Single Vote Per Address**: Each address can only vote once.
- **Predefined Voting Options**: The voting options are defined at the time of contract deployment.
- **Secure Vote Storage**: Votes are securely stored on-chain, ensuring transparency and immutability.
- **Vote Counting**: Users can check the vote count for each option.

## Installation

### Prerequisites

- Node.js
- npm or yarn
- Hardhat

### Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/voting-contract.git
   cd voting-contract
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Compile the Smart Contract**:
   ```bash
   npx hardhat compile
   ```

## Usage

To deploy the `Governance` contract, use the following command:

```bash
npx hardhat run scripts/deploy.ts --network <network-name>
```

Replace `<network-name>` with the desired network, e.g., `localhost`, `ropsten`, `mainnet`, etc. For this project; it has been deployed to the Lisk-sepolia testnet

## Testing

Unit tests are provided to ensure the correctness of the contract. To run the tests, use the following command:

```bash
npx hardhat test
```

### Example Test Case

Here's an example of a test case that checks the voting functionality:

```javascript
import { expect } from "chai";
import hre from "hardhat";

describe('Voting', function () {
    it("Owner should be able to vote and the vote count should increase", async function () {
        const [owner] = await hre.ethers.getSigners();

        // Deploy the contract with initial options
        const options = ["Option1", "Option2", "Option3"];
        const Voting = await hre.ethers.getContractFactory("Voting");
        const castVote = await Voting.deploy(options);

        // Owner votes for Option1
        await castVote.connect(owner).vote("Option1");

        // Verify that Option1's vote count is now 1
        const voteCount = await castVote.getVotes(options[0]);
        expect(voteCount).to.equal(1);
    });
});
```

## Smart Contract Details

### `Voting.sol`

- **Owner**: The address that deploys the contract. Only the owner can vote.
- **Options**: A list of predefined voting options.
- **Vote Mapping**: Tracks the number of votes for each option.
- **Voted Mapping**: Tracks whether an address has already voted.

### Functions

- `vote(string memory _option)`: Allows the owner to vote for a given option.
- `getVotes(string memory _option)`: Returns the number of votes for a given option.
- `checkIfUserVoted(address _user)`: Checks if a given user has voted.