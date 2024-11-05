import { ethers } from "ethers";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useParticipantsStore = create(
  persist(
    (set) => ({
      participants: [], // Initial participants state

      // Method to set participants
      setParticipants: (participantData) => {
        const formattedParticipants = participantData[0].map(
          (address, index) => ({
            address,
            name: participantData[1][index],
            amountSpent: ethers.utils.formatEther(participantData[2][index]),
            allotted: false,
            claimStatus: "Not Claimed",
          })
        );
        set({ participants: formattedParticipants });
      },

      // Optional: Method to clear participants
      clearParticipants: () => set({ participants: [] }),
    }),
    {
      name: "participants-store", // Unique name for the store
      getStorage: () => sessionStorage, // Storage method, can also use localStorage
    }
  )
);

export default useParticipantsStore;
