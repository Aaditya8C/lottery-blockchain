import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWinnerStore = create(
  persist(
    (set) => ({
      winners: {
        first: { address: "", name: "", amount: "" },
        second: { address: "", name: "", amount: "" },
        third: { address: "", name: "", amount: "" },
      },
      setWinners: ({ first, second, third }) =>
        set(() => ({
          winners: {
            first: {
              address: first.address,
              name: first.name,
              amount: first.amount,
            },
            second: {
              address: second.address,
              name: second.name,
              amount: second.amount,
            },
            third: {
              address: third.address,
              name: third.name,
              amount: third.amount,
            },
          },
        })),
    }),
    {
      name: "winners-storage",
      getStorage: () => sessionStorage,
    }
  )
);
