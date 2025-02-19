import { create } from 'zustand';

interface MapState {
  center: [number, number] | null;
  setCenter: (center: [number, number] | null) => void;
}

export const useMapStore = create<MapState>((set) => ({
  center: null,
  setCenter: (center) => set({ center }),
}));
