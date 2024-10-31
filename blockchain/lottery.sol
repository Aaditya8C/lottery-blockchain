// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lottery {
    address public owner;
    uint public constant ticketPrice = 0.01 ether;
    address[] public participants;
    bool public isLotteryOpen;
    address public winner;

    event TicketPurchased(address indexed buyer);
    event WinnerRevealed(address indexed winner, uint prizeAmount);

    constructor() {
        owner = msg.sender;
        isLotteryOpen = true;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier lotteryOpen() {
        require(isLotteryOpen, "Lottery is closed");
        _;
    }

    function buyTicket() public payable lotteryOpen {
        require(msg.value == ticketPrice, "Incorrect ticket price");
        participants.push(msg.sender);
        emit TicketPurchased(msg.sender);
    }

    function getWinner() public view returns (address) {
        return winner;
    }

    function pickWinner() internal view returns (address) {
        require(participants.length > 0, "No participants in the lottery");
        uint randomIndex = uint(
            keccak256(
                abi.encodePacked(
                    block.timestamp,
                    block.prevrandao,
                    participants.length
                )
            )
        ) % participants.length;
        return participants[randomIndex];
    }

    function revealWinner() public onlyOwner {
        require(isLotteryOpen, "Lottery is already closed");
        winner = pickWinner();
        uint prizeAmount = address(this).balance;
        payable(winner).transfer(prizeAmount);
        emit WinnerRevealed(winner, prizeAmount);
        isLotteryOpen = false;
    }

    function getParticipantsCount() public view returns (uint) {
        return participants.length;
    }

    function getParticipants() public view returns (address[] memory) {
        return participants;
    }

    function resetLottery() public onlyOwner {
        require(!isLotteryOpen, "Lottery is still open");
        delete participants;
        winner = address(0);
        isLotteryOpen = true;
    }
}
