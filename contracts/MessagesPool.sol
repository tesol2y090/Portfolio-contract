pragma solidity ^0.5.0;

contract MessagesPool {
    mapping(address => bool) isWriteMessage;
    string[] public messagesPool;

    event PostSucceed(address user, string message);

    function getMessagesLength() public view returns (uint256) {
        return messagesPool.length;
    }

    function postMessage(string memory message) public {
        require(!isWriteMessage[msg.sender], "you are post already");
        messagesPool.push(message);
        isWriteMessage[msg.sender] = true;
        emit PostSucceed(msg.sender, message);
    }
}
