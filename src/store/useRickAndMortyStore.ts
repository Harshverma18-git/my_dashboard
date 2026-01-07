import { create } from "zustand";

type RickAndMortyState = {
  selectedEpisodeId: string;
  setSelectedEpisodeId: (id: string) => void;
};

export const useRickAndMortyStore = create<RickAndMortyState>((set) => ({
  selectedEpisodeId: "",
  setSelectedEpisodeId: (id) => set({ selectedEpisodeId: id }),
}));
