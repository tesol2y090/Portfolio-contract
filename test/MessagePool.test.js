const MessagesPool = artifacts.require("MessagesPool")
const GANGPortToken = artifacts.require("GANGPortToken")
const RewardToken = artifacts.require("RewardToken")

contract("MessagesPool", (accounts) => {
  const admin = accounts[0]
  const alice = accounts[1]
  const bob = accounts[2]

  beforeEach(async () => {
    this.gangPortTokenInstance = await GANGPortToken.new()
    this.rewardTokenInstance = await RewardToken.new()
    this.messagesPoolInstance = await MessagesPool.new(
      this.gangPortTokenInstance.address
    )
    await this.gangPortTokenInstance.transferOwnership(
      this.messagesPoolInstance.address
    )
    await this.messagesPoolInstance.setRewardTokenAddress(
      this.rewardTokenInstance.address
    )
    await this.rewardTokenInstance.transfer(
      this.messagesPoolInstance.address,
      100
    )
  })

  it("Get Length when start", async () => {
    const messagesPoolInstance = this.messagesPoolInstance
    const allMessagesLength = await messagesPoolInstance.getMessagesLength.call()
    assert.equal(allMessagesLength.valueOf(), 0, "It should be 0")
  })

  it("Post message success", async () => {
    const messagesPoolInstance = this.messagesPoolInstance
    const gangPortTokenInstance = this.gangPortTokenInstance
    const postedMessage = "Hello world"
    await messagesPoolInstance.postMessage(postedMessage, {
      from: admin,
    })
    const allMessagesLength = await messagesPoolInstance.getMessagesLength.call()
    const postAddressBalance = await gangPortTokenInstance.balanceOf(admin)
    const firstMessage = await messagesPoolInstance.messagesPool(0)
    assert.equal(allMessagesLength.valueOf(), 1, "Message does not equal to 1")
    assert.equal(postAddressBalance.valueOf(), 1, "Balance does not equal to 1")
    assert.equal(
      firstMessage.valueOf(),
      postedMessage,
      `Message does not equal to ${postedMessage}`
    )
  })

  it("Claim reward token", async () => {
    const messagesPoolInstance = this.messagesPoolInstance
    const rewardTokenInstance = this.rewardTokenInstance
    const postedMessage = "Hello world"
    await messagesPoolInstance.postMessage(postedMessage, {
      from: admin,
    })
    await messagesPoolInstance.claimsReward()
    const rewardBalance = await rewardTokenInstance.balanceOf(admin)
    assert.equal(rewardBalance.valueOf(), 1, "Reward does not equal to 1")
  })
})
