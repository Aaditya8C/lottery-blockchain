// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lottery {
    address public owner;
    uint public constant ticketPrice = 0.005 ether;
    bool public isLotteryOpen;
    uint public totalAmountInvested;
    address public firstWinner;
    address public secondWinner;
    address public thirdWinner;

    string public firstWinnerName;
    string public secondWinnerName;
    string public thirdWinnerName;

    uint public firstPrize;
    uint public secondPrize;
    uint public thirdPrize;

    struct Participant {
        string name;
        uint amountSpent;
    }

    mapping(address => Participant) public participants;
    address[] public participantAddresses;

    event TicketPurchased(address indexed buyer, string name);

    constructor() {
        owner = msg.sender;
        isLotteryOpen = false;
        totalAmountInvested = 0;
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

    function buyTicket(string memory name) public payable lotteryOpen {
        require(msg.value == ticketPrice, "Incorrect ticket price");

        if (participants[msg.sender].amountSpent == 0) {
            participantAddresses.push(msg.sender);
        }

        participants[msg.sender].name = name;
        participants[msg.sender].amountSpent += msg.value;
        totalAmountInvested += msg.value;

        emit TicketPurchased(msg.sender, name);
    }

    function pickWinners() internal view returns (address, address, address) {
        require(
            participantAddresses.length >= 3,
            "Not enough participants for 3 winners"
        );

        uint randomIndex1 = uint(
            keccak256(
                abi.encodePacked(
                    block.timestamp,
                    block.prevrandao,
                    participantAddresses.length
                )
            )
        ) % participantAddresses.length;
        uint randomIndex2 = (randomIndex1 +
            uint(
                keccak256(
                    abi.encodePacked(
                        block.prevrandao,
                        participantAddresses.length
                    )
                )
            )) % participantAddresses.length;
        uint randomIndex3 = (randomIndex2 +
            uint(keccak256(abi.encodePacked(block.prevrandao, msg.sender)))) %
            participantAddresses.length;

        // Ensure unique winners
        while (randomIndex2 == randomIndex1) {
            randomIndex2 = (randomIndex2 + 1) % participantAddresses.length;
        }
        while (randomIndex3 == randomIndex1 || randomIndex3 == randomIndex2) {
            randomIndex3 = (randomIndex3 + 1) % participantAddresses.length;
        }

        return (
            participantAddresses[randomIndex1],
            participantAddresses[randomIndex2],
            participantAddresses[randomIndex3]
        );
    }

    function revealWinners() public onlyOwner {
        require(isLotteryOpen, "Lottery is already closed");
        require(participantAddresses.length >= 3, "Not enough participants");

        (firstWinner, secondWinner, thirdWinner) = pickWinners();
        uint prizeAmount = address(this).balance;

        firstPrize = (prizeAmount * 50) / 100;
        secondPrize = (prizeAmount * 30) / 100;
        thirdPrize = (prizeAmount * 20) / 100;

        firstWinnerName = participants[firstWinner].name;
        secondWinnerName = participants[secondWinner].name;
        thirdWinnerName = participants[thirdWinner].name;

        payable(firstWinner).transfer(firstPrize);
        payable(secondWinner).transfer(secondPrize);
        payable(thirdWinner).transfer(thirdPrize);
    }

    function closeLottery() public onlyOwner {
        require(isLotteryOpen, "Lottery is already closed");
        isLotteryOpen = false;

        // Reset participants
        for (uint i = 0; i < participantAddresses.length; i++) {
            address participant = participantAddresses[i];
            delete participants[participant];
        }
        delete participantAddresses;

        firstWinner = address(0);
        secondWinner = address(0);
        thirdWinner = address(0);

        firstWinnerName = "";
        secondWinnerName = "";
        thirdWinnerName = "";

        firstPrize = 0;
        secondPrize = 0;
        thirdPrize = 0;

        // Reset total amount invested
        totalAmountInvested = 0;
    }

    function getParticipantsCount() public view returns (uint) {
        return participantAddresses.length;
    }

    function getParticipants()
        public
        view
        returns (address[] memory, string[] memory, uint[] memory)
    {
        address[] memory addresses = new address[](participantAddresses.length);
        string[] memory names = new string[](participantAddresses.length);
        uint[] memory amounts = new uint[](participantAddresses.length);

        for (uint i = 0; i < participantAddresses.length; i++) {
            addresses[i] = participantAddresses[i];
            names[i] = participants[participantAddresses[i]].name;
            amounts[i] = participants[participantAddresses[i]].amountSpent; // Stored in wei
        }

        return (addresses, names, amounts);
    }

    function getParticipantDetails(
        address participant
    ) public view returns (string memory, uint) {
        return (
            participants[participant].name,
            participants[participant].amountSpent
        ); // Stored in wei
    }

    function getWinnerDetails()
        public
        view
        returns (
            address first,
            string memory firstName,
            uint firstAmount,
            address second,
            string memory secondName,
            uint secondAmount,
            address third,
            string memory thirdName,
            uint thirdAmount
        )
    {
        return (
            firstWinner,
            firstWinnerName,
            firstPrize, // Stored in wei
            secondWinner,
            secondWinnerName,
            secondPrize, // Stored in wei
            thirdWinner,
            thirdWinnerName,
            thirdPrize // Stored in wei
        );
    }

    function getTotalAmountInvested() public view returns (uint) {
        return totalAmountInvested; // Stored in wei
    }
}
