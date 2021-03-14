const MessagesPool = artifacts.require("MessagesPool")

contract("MessagesPool", (accounts) => {
  beforeEach(async () => {
    this.messagesPoolInstance = await MessagesPool.new()
  })
  it("Post message success", async () => {
    const messagesPoolInstance = this.messagesPoolInstance
    await messagesPoolInstance.postMessage("Hello world", {
      from: accounts[0],
    })
    const allMessagesLength = await messagesPoolInstance.getMessagesLength.call()
    assert.equal(allMessagesLength.valueOf(), 1, "Message does not equal to 1")
  })

  it("Post message hello wolrd", async () => {
    const messagesPoolInstance = this.messagesPoolInstance
    await messagesPoolInstance.postMessage("Hello world", { from: accounts[0] })
    const helloMessage = await messagesPoolInstance.messagesPool(0)
    assert.equal(
      helloMessage.valueOf(),
      "Hello world",
      "Message does not equal to hello world"
    )
  })
})
