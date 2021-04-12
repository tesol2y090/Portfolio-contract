const MessagesPool = artifacts.require("MessagesPool")
const GANGPortToken = artifacts.require("GANGPortToken")
const RewardToken = artifacts.require("RewardToken")

module.exports = async function (deployer, network, accounts) {
  deployer.deploy(GANGPortToken).then((gangTokenInstance) => {
    return deployer.deploy(MessagesPool, gangTokenInstance.address).then(() => {
      return deployer.deploy(RewardToken)
    })
  })
}
