import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  session: string | null;

  cachedBookings: unknown[];

  setSession: (
    session: string | null
  ) => void;

  setCachedBookings: (
    bookings: unknown[]
  ) => void;

  resetUser: () => void;
}

export const useUserStore =
  create<UserStore>()(
    persist(
      (set) => ({
        session: null,

        cachedBookings: [],

        setSession: (session) =>
          set({ session }),

        setCachedBookings: (
          cachedBookings
        ) =>
          set({
            cachedBookings,
          }),

        resetUser: () =>
          set({
            session: null,
            cachedBookings: [],
          }),
      }),

      {
        name: "user-storage",

        partialize: (state) => ({
          session: state.session,
        }),
      }
    )
  );