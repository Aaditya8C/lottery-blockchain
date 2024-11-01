import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWinnerStore = create(
  persist(
    (set) => ({
      winners: { first: "", second: "", third: "" },
      setWinners: ({ first, second, third }) =>
        set(() => ({
          winners: { first, second, third },
        })),
    }),
    {
      name: "winners-storage", // unique name for session storage key
      getStorage: () => sessionStorage, // use session storage
    }
  )
);
