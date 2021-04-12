const MessagesPool = artifacts.require("MessagesPool")
const GANGPortToken = artifacts.require("GANGPortToken")

module.exports = async function (deployer, network, accounts) {
  deployer.deploy(GANGPortToken).then((gangTokenInstance) => {
    return deployer.deploy(MessagesPool, gangTokenInstance.address)
  })
}
