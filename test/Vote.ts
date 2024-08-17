import { expect } from "chai";
import hre from "hardhat";

describe('Voting', function () {
    it("Owner should be able to vote and the vote count should increase", async function () {
        const [owner] = await hre.ethers.getSigners();

        // Deploy the contract with initial options
        const options = ["Option1", "Option2", "Option3"];

        const Voting = await hre.ethers.getContractFactory("Governance");
        const castVote = await Voting.deploy(options);
        // await castVote.deployed();  // Ensure the contract is deployed

        // Owner votes for Option1
        await castVote.connect(owner).vote("Option1");

        // Verify that Option1's vote count is now 1
        const voteCount = await castVote.getVotes("Option1");
        expect(voteCount).to.equal(1);
    });
});
