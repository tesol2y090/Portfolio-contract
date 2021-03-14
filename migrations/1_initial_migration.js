const MessagesPool = artifacts.require("MessagesPool")
const GangToken = artifacts.require("GANGToken")

module.exports = function (deployer) {
  deployer.deploy(MessagesPool)
  deployer.deploy(GangToken)
}
