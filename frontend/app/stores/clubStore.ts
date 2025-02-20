import { create } from "zustand";
import { getAllCountries } from "~/api/countriesNow";
import type { Clube } from "~/types";
import { getAllClubes } from "~/api/custom";

interface ClubState {
  clubs: Clube[];
  filteredClubs: Clube[];
  initiated: boolean;
  loadingClubs: boolean;
  loadingCountries: boolean;
  error: string | null;
  filter: string | null;
  countries: string[];
  fetchClubs: () => Promise<void>;
  fetchCountries: () => Promise<void>;
  applyFilter: (value: string | null) => void;
  getClubById: (id: string) => Clube | undefined;
  addClub:(clube: Clube) => void;
  updateClub: (clube: Clube) => void;
}

export const useClubStore = create<ClubState>()((set, get) => ({
  clubs: [],
  filteredClubs: [],
  loadingClubs: false,
  loadingCountries: false,
  error: null,
  filter: null,
  countries: [],
  cities: [],
  initiated: false,

  getClubById(id: string) {
    return get().clubs.find((club) => club.id === id || club.id === id);
  },

  updateClub(clube: Clube) {
    const { clubs } = get();
    const updatedClubs = clubs.map((c) => c.id === clube.id ? clube : c);
    set({ clubs: updatedClubs });
  },

  addClub(clube: Clube) {
    const { clubs, filter, applyFilter } = get();
    const updatedClubs = [...clubs, clube];
    set({ clubs: updatedClubs });
    if (filter) applyFilter(filter)
  },

  fetchClubs: async () => {
    set({ loadingClubs: true, error: null });
    try {
      const clubs = await getAllClubes();
      clubs.map((clube, index) => clube.pos = index)
      set({
        clubs: clubs,
        filteredClubs: clubs,
        loadingClubs: false,
        initiated: true
      });
    } catch (err) {
      set({ loadingClubs: false, error: "Failed to load clubs" });
    }
  },

  fetchCountries: async () => {
    set({ loadingCountries: true, error: null });
    try {
      const countries = await getAllCountries();
      set({
        countries: countries,
      });
    } catch (err) {
      set({ loadingCountries: false, error: "Failed to load clubs" });
    }
  },

  // Filtering logic
  applyFilter: (value) => {
    set((state) => {
      const newFilter = value
        ? state.clubs.filter((club) => club.pais === value)
        : state.clubs;
      return {
        filter: value,
        filteredClubs: newFilter,
      };
    });
  },
}));
