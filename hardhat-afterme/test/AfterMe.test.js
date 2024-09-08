const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AfterMe Contract", function () {
  let AfterMe;
  let afterMe;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    AfterMe = await ethers.getContractFactory("AfterMe");
    [owner, addr1, addr2, _] = await ethers.getSigners();

    // Deploy a new AfterMe contract for each test
    afterMe = await AfterMe.deploy();
    await afterMe.deployed();
  });

  describe("Store Data", function () {
    it("Should store encrypted data correctly", async function () {
      const encryptedData = "0x123456"; // Sample encrypted data
      const encryptedSymmetricKey = ethers.utils.formatBytes32String("key123");
      const expirationTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now

      await expect(afterMe.storeData(encryptedData, encryptedSymmetricKey, expirationTime))
        .to.emit(afterMe, "DataStored")
        .withArgs(owner.address, encryptedData, encryptedSymmetricKey, expirationTime);

      const data = await afterMe.dataStore(owner.address);
      expect(data.encryptedData).to.equal(encryptedData);
      expect(data.encryptedSymmetricKey).to.equal(encryptedSymmetricKey);
      expect(data.expirationTime).to.equal(expirationTime);
    });

    it("Should fail if expiration time is in the past", async function () {
      const expiredTime = Math.floor(Date.now() / 1000) - 3600; // 1 hour ago

      await expect(
        afterMe.storeData("0x123456", ethers.utils.formatBytes32String("key123"), expiredTime)
      ).to.be.revertedWith("Expiration time must be in the future");
    });
  });

  describe("Retrieve Data", function () {
    it("Should retrieve encrypted data correctly", async function () {
      const encryptedData = "0x123456"; // Sample encrypted data
      const encryptedSymmetricKey = ethers.utils.formatBytes32String("key123");
      const expirationTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now

      await afterMe.storeData(encryptedData, encryptedSymmetricKey, expirationTime);

      const [retrievedData, retrievedKey, retrievedTime] = await afterMe.getData();

      expect(retrievedData).to.equal(encryptedData);
      expect(retrievedKey).to.equal(encryptedSymmetricKey);
      expect(retrievedTime).to.equal(expirationTime);
    });

    it("Should fail if data has expired", async function () {
      const expiredTime = Math.floor(Date.now() / 1000) - 3600; // 1 hour ago

      await afterMe.storeData("0x123456", ethers.utils.formatBytes32String("key123"), expiredTime);

      await expect(afterMe.getData()).to.be.revertedWith("Data has expired");
    });
  });
});
