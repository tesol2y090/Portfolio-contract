pragma solidity 0.6.9;

interface IGANGToken {
    function transfer(address to, uint256 value) external;

    function mint(address _to, uint256 _amount) external;
}
