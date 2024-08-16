import { expect } from "chai";
import hre from "hardhat";

describe("Vote", function () {
    it("Should increase vote count after vote action"), async function () {
        const [owner] = await hre.ethers.getSigners();

        const options = ["Option1", "Option2", "Option3"];

        const governance = await hre.ethers.deployContract("Voting", [options]);

        await governance.connect(owner).vote(options[0]);

        
    }
})