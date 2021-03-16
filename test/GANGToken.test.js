const GANGToken = artifacts.require("GANGToken")

contract("GANGToken", (accounts) => {
  beforeEach(async () => {
    this.tokenInstance = await GANGToken.new()
  })

  it("Name of token", async () => {
    const tokenInstance = await this.tokenInstance
    const nameToken = await tokenInstance.name()
    assert.equal(nameToken.valueOf(), "GANGToken", "It should be a GANGToken")
  })

  it("Symbol of token", async () => {
    const tokenInstance = this.tokenInstance
    const sysmbol = await tokenInstance.symbol()
    assert.equal(sysmbol.valueOf(), "GANG", "It should be GANG")
  })

  it("Total supply of token", async () => {
    const tokenInstance = this.tokenInstance
    const totalSupply = await tokenInstance.totalSupply()
    assert.equal(totalSupply.valueOf(), 0, "It should be 0")
  })

  it("Transfer of token sender", async () => {
    const tokenInstance = this.tokenInstance
    const mintToken = 100
    const transferToken = 10
    await tokenInstance.mint(accounts[0], 100, { from: accounts[0] })
    await tokenInstance.transfer(accounts[1], transferToken, {
      from: accounts[0],
    })
    const senderBalance = await tokenInstance.balanceOf(accounts[0])
    assert.equal(
      senderBalance.valueOf(),
      mintToken - transferToken,
      `It should be ${mintToken} - ${transferToken} `
    )
  })

  it("Transfer of token reciever", async () => {
    const tokenInstance = this.tokenInstance
    const mintToken = 100
    const transferToken = 10
    await tokenInstance.mint(accounts[0], 100, { from: accounts[0] })
    await tokenInstance.transfer(accounts[1], transferToken, {
      from: accounts[0],
    })
    const receiverBalance = await tokenInstance.balanceOf(accounts[1])
    assert.equal(
      receiverBalance.valueOf(),
      transferToken,
      `It should be ${mintToken} + ${transferToken} `
    )
  })
})
