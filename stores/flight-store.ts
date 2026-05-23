import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Flight, Seat } from "@/types/database";

interface PassengerFormData {
  full_name: string;
  passport_no: string;
  nationality: string;
}

interface FlightStore {
  searchQuery: {
    origin: string;
    destination: string;
    date: string;
    passengers: number;
  };

  selectedFlight: Flight | null;

  selectedSeat: Seat | null;

  bookingStep: number;

  passengerForm: PassengerFormData;

  setSearchQuery: (
    query: FlightStore["searchQuery"]
  ) => void;

  setSelectedFlight: (
    flight: Flight | null
  ) => void;

  setSelectedSeat: (
    seat: Seat | null
  ) => void;

  setBookingStep: (
    step: number
  ) => void;

  setPassengerForm: (
    form: PassengerFormData
  ) => void;

  resetBooking: () => void;
}

const initialState = {
  searchQuery: {
    origin: "",
    destination: "",
    date: "",
    passengers: 1,
  },

  selectedFlight: null,

  selectedSeat: null,

  bookingStep: 1,

  passengerForm: {
    full_name: "",
    passport_no: "",
    nationality: "",
  },
};

export const useFlightStore = create<FlightStore>()(
  persist(
    (set) => ({
      ...initialState,

      setSearchQuery: (query) =>
        set({
          searchQuery: query,
        }),

      setSelectedFlight: (flight) =>
        set({
          selectedFlight: flight,
        }),

      setSelectedSeat: (seat) =>
        set({
          selectedSeat: seat,
        }),

      setBookingStep: (step) =>
        set({
          bookingStep: step,
        }),

      setPassengerForm: (form) =>
        set({
          passengerForm: form,
        }),

      resetBooking: () =>
        set(initialState),
    }),

    {
      name: "flight-booking-storage",

      partialize: (state) => ({
        searchQuery: state.searchQuery,

        selectedFlight: state.selectedFlight,

        selectedSeat: state.selectedSeat,

        bookingStep: state.bookingStep,

        passengerForm: {
          full_name:
            state.passengerForm.full_name,

          nationality:
            state.passengerForm.nationality,
        },
      }),
    }
  )
);