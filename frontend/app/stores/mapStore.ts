import { create } from 'zustand';

interface MapState {
  center?: [number, number];
  setCenter: (lat: number, lng: number) => void;
}

export const useMapStore = create<MapState>((set) => ({
  setCenter: (lat, lng) => set({ center: [lat, lng] }),
}));
