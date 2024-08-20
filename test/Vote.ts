import { expect } from "chai";
import hre from "hardhat";

describe('Voting', function () {
    it("Owner should be able to vote and the vote count should increase", async function () {

        const [owner] = await hre.ethers.getSigners();

        // Deploy the contract with initial options
        const options = ["Option1", "Option2", "Option3"];

        const Voting = await hre.ethers.getContractFactory("Governance");
        const castVote = await Voting.deploy(options);

        // Owner votes for Option1
        await castVote.connect(owner).vote("Option1");

        // Verify that Option1's vote count is now 1
        const voteCount = await castVote.getVotes(options[0]);
        expect(voteCount).to.equal(1);
    });
    
    it("Signer should not vote twice", async function () {

        const [owner] = await hre.ethers.getSigners();

        const options = ["Option1", "Option2", "Option3"];

        const Voting = await hre.ethers.getContractFactory("Governance");
        const castVote = await Voting.deploy(options);

        // Owner votes for Option1
        await castVote.connect(owner).vote("Option1");

        await expect(castVote.vote("Option1")).to.be.reverted;
    });
});
