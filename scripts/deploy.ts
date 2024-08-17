import { ethers } from 'hardhat';

async function main() {

    const options = ["Option1", "Option2", "Option3"];

    const governance = await ethers.deployContract('Governance', options);

    await governance.waitForDeployment();

    console.log('Governance Contract Deployed at ' + governance.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});