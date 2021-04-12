// SPDX-License-Identifier: MIT

pragma solidity 0.6.9;

import "./utility/ERC20.sol";
import "./utility/Ownable.sol";

contract RewardToken is ERC20("Reward Token", "RWT", 0), Ownable {
    constructor() public {
        _mint(msg.sender, 100);
    }
}
