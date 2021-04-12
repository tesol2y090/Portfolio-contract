// SPDX-License-Identifier: MIT

pragma solidity 0.6.9;

import "./utility/ERC20.sol";
import "./utility/Ownable.sol";

contract GANGPortToken is ERC20("GANGPortToken", "GPT", 0), Ownable {
    function mint(address _to, uint256 _amount) public onlyOwner {
        _mint(_to, _amount);
    }
}
