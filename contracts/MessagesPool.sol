pragma solidity 0.6.9;

import "./interfaces/IGANGToken.sol";
import "./interfaces/IRewardsToken.sol";
import "./utility/Ownable.sol";

contract MessagesPool is Ownable {
    string[] public messagesPool;
    mapping(address => bool) isWriteMessage;

    IGANGToken public gangTokenModule;
    IRewardsToken public rewardsTokenModule;

    event PostSucceed(address user, string message);

    constructor(IGANGToken _GANGTokenAddress) public {
        gangTokenModule = _GANGTokenAddress;
    }

    function setRewardTokenAddress(IRewardsToken _rewardsTokenAddress) public {
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
        emit PostSucceed(msg.sender, message);
    }
}
