pragma solidity ^0.5.0;

import "./IGANGToken.sol";

contract MessagesPool {
    string[] public messagesPool;
    mapping(address => bool) isWriteMessage;

    event PostSucceed(address user, string message);

    IGANGToken public gangTokenModule;

    constructor(IGANGToken _GANGTokenAddress) {
        gangTokenModule = _GANGTokenAddress;
    }

    function getMessagesLength() public view returns (uint256) {
        return messagesPool.length;
    }

    function postMessage(string memory message) public {
        require(!isWriteMessage[msg.sender], "you are post already");
        messagesPool.push(message);
        isWriteMessage[msg.sender] = true;
        gangTokenModule.transfer(msg.sender, 1);
        emit PostSucceed(msg.sender, message);
    }
}
