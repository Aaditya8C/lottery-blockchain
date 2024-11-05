import { create } from "zustand";
import { persist } from "zustand/middleware";

export const timeStore = create(
  persist(
    (set) => ({
      timeLeft: 15 * 60,
      setTimeLeft: (time) => set({ timeLeft: time }),
    }),
    {
      name: "timeLeft",
      getStorage: () => sessionStorage, // Use session storage
    }
  )
);
