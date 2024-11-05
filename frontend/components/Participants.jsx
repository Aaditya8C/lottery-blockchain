"use client";
import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "./context";
import AmountSpentComponent from "./AmountSpentComp";

const Participants = () => {
  const {
    participants,
    fetchParticipants,
    fetchContractDetails,
    isOwner,
    isLotteryOpen,
  } = useContext(TransactionContext);

  const [parti, setParti] = useState([
    {
      address: "0xD9CE35963D62FBa81478a2789B7DFfC0E5272Daf",
      name: "Aadi",
      amountSpent: "5000000000000000",
    },
    {
      address: "0xA1B2C3D4E5F6789ABCDE123456789ABCDE123456",
      name: "Bina",
      amountSpent: "2000000000000000",
    },
    {
      address: "0xF123E4D5678ABCDE9ABCDEF12345678ABCDEF567",
      name: "Chirag",
      amountSpent: "3000000000000000",
    },
    {
      address: "0xF123E4D5678ABCDE9ABCDEF12345678ABCDEF567",
      name: "Chirag",
      amountSpent: "3000000000000000",
    },
    {
      address: "0xF123E4D5678ABCDE9ABCDEF12345678ABCDEF567",
      name: "Chirag",
      amountSpent: "3000000000000000",
    },
    {
      address: "0xF123E4D5678ABCDE9ABCDEF12345678ABCDEF567",
      name: "Chirag",
      amountSpent: "3000000000000000",
    },
    {
      address: "0xF123E4D5678ABCDE9ABCDEF12345678ABCDEF567",
      name: "Chirag",
      amountSpent: "3000000000000000",
    },
    // Add more participants as needed
  ]);

  useEffect(() => {
    if (isLotteryOpen) {
      fetchParticipants();
    }
  }, [fetchParticipants]);

  return (
    <div className="p-6 w-fit mx-10 py-10 bg-[#04364A] rounded-lg shadow-lg my-14 h-[70vh] overflow-scroll scrollbar-none">
      <h2 className="text-2xl font-bold text-center text-orange-200 mb-6">
        Lottery Participants
      </h2>
      <div className="grid grid-cols-3 gap-8">
        {participants.map((p, index) => (
          <div
            key={index}
            className="p-4 bg-cyan-700 rounded-lg shadow-md hover:scale-105 transition transform duration-200"
          >
            <div>
              <span className="font-semibold text-cyan-400">Address: </span>
              <span className="text-orange-200 break-all">{p.address}</span>
            </div>

            <div>
              <span className="font-semibold text-cyan-400">Name: </span>
              <span className="text-orange-200">{p.name}</span>
            </div>

            <div>
              <AmountSpentComponent amountSpent={p.amountSpent} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Participants;
