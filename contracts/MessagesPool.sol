pragma solidity 0.6.9;

import "./interfaces/IGANGToken.sol";
import "./interfaces/IRewardsToken.sol";
import "./utility/Ownable.sol";

contract MessagesPool is Ownable {
    string[] public messagesPool;

    uint256 public rewardTokenPool;
    uint256 public totalshares;

    mapping(address => bool) isWriteMessage;
    mapping(address => bool) isClaimsReward;
    mapping(address => bool) canClaimReward;

    IGANGToken public gangTokenModule;
    IRewardsToken public rewardsTokenModule;

    event PostSucceed(address user, string message);
    event ClaimSucceed(address user, bool isClaim);

    constructor(IGANGToken _GANGTokenAddress) public {
        gangTokenModule = _GANGTokenAddress;
    }

    function setCanClaimReward(address _address) public onlyOwner {
        require(!canClaimReward[_address], "You are grant already");
        canClaimReward[_address] = true;
    }

    function claimsReward() public {
        require(!isClaimsReward[msg.sender], "you are already claim reward");
        require(
            rewardsTokenModule.balanceOf(address(this)) > 0,
            "not enough reward token"
        );
        rewardsTokenModule.transfer(
            msg.sender,
            (totalRewardToken / totalshares)
        );
        totalRewardToken = (totalRewardToken / totalshares);
        totalshares -= 1;
        emit ClaimSucceed(msg.sender, true);
        isClaimsReward[msg.sender] = true;
    }

    function setRewardTokenAddress(IRewardsToken _rewardsTokenAddress)
        public
        onlyOwner
    {
        rewardsTokenModule = _rewardsTokenAddress;
    }

    function getMessagesLength() public view returns (uint256) {
        return messagesPool.length;
    }

    function postMessage(string memory message) public {
        require(!isWriteMessage[msg.sender], "you are post already");
        messagesPool.push(message);
        isWriteMessage[msg.sender] = true;
        gangTokenModule.mint(msg.sender, 1);
        totalShare += 1;
        emit PostSucceed(msg.sender, message);
    }
}
