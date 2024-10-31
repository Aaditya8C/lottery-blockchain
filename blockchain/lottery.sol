// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lottery {
    address public owner;
    uint public constant ticketPrice = 0.005 ether;
    address[] public participants;
    bool public isLotteryOpen;
    address public firstWinner;
    address public secondWinner;
    address public thirdWinner;

    event TicketPurchased(address indexed buyer);
    event WinnersRevealed(
        address indexed firstWinner,
        address indexed secondWinner,
        address indexed thirdWinner,
        uint firstPrize,
        uint secondPrize,
        uint thirdPrize
    );

    constructor() {
        owner = msg.sender;
        isLotteryOpen = false;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier lotteryOpen() {
        require(isLotteryOpen, "Lottery is closed");
        _;
    }

    function openLottery() public onlyOwner {
        require(!isLotteryOpen, "Lottery is already open");
        isLotteryOpen = true;
    }

    function buyTicket() public payable lotteryOpen {
        require(msg.value == ticketPrice, "Incorrect ticket price");
        participants.push(msg.sender);
        emit TicketPurchased(msg.sender);
    }

    function pickWinners() internal view returns (address, address, address) {
        require(
            participants.length >= 3,
            "Not enough participants for 3 winners"
        );

        uint randomIndex1 = uint(
            keccak256(
                abi.encodePacked(
                    block.timestamp,
                    block.prevrandao,
                    participants.length
                )
            )
        ) % participants.length;
        uint randomIndex2 = (randomIndex1 +
            uint(
                keccak256(
                    abi.encodePacked(block.prevrandao, participants.length)
                )
            )) % participants.length;
        uint randomIndex3 = (randomIndex2 +
            uint(keccak256(abi.encodePacked(block.prevrandao, msg.sender)))) %
            participants.length;

        // Ensure unique winners
        while (randomIndex2 == randomIndex1) {
            randomIndex2 = (randomIndex2 + 1) % participants.length;
        }
        while (randomIndex3 == randomIndex1 || randomIndex3 == randomIndex2) {
            randomIndex3 = (randomIndex3 + 1) % participants.length;
        }

        return (
            participants[randomIndex1],
            participants[randomIndex2],
            participants[randomIndex3]
        );
    }

    function revealWinners() public onlyOwner {
        require(isLotteryOpen, "Lottery is already closed");
        require(participants.length >= 3, "Not enough participants");

        (firstWinner, secondWinner, thirdWinner) = pickWinners();
        uint prizeAmount = address(this).balance;

        uint firstPrize = (prizeAmount * 50) / 100;
        uint secondPrize = (prizeAmount * 30) / 100;
        uint thirdPrize = (prizeAmount * 20) / 100;

        payable(firstWinner).transfer(firstPrize);
        payable(secondWinner).transfer(secondPrize);
        payable(thirdWinner).transfer(thirdPrize);

        emit WinnersRevealed(
            firstWinner,
            secondWinner,
            thirdWinner,
            firstPrize,
            secondPrize,
            thirdPrize
        );
    }

    function closeLottery() public onlyOwner {
        require(isLotteryOpen, "Lottery is already closed");
        isLotteryOpen = false;
        delete participants;
        firstWinner = address(0);
        secondWinner = address(0);
        thirdWinner = address(0);
    }

    function getParticipantsCount() public view returns (uint) {
        return participants.length;
    }

    function getParticipants() public view returns (address[] memory) {
        return participants;
    }
}
