"use client";

import { useEffect, useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { useRickAndMortyStore } from "../store/useRickAndMortyStore";

import {
  useEpisodesQuery,
  useEpisodeCharactersQuery,
} from "@/src/api-service/episodes";
import { fetchCharacterByUrl } from "@/src/api-service/characters";
import { Character } from "@/src/types/characters";

export function useRickAndMorty() {
  // ✅ ZUSTAND STATE
  const selectedEpisodeId = useRickAndMortyStore(
    (state) => state.selectedEpisodeId
  );
  const setSelectedEpisodeId = useRickAndMortyStore(
    (state) => state.setSelectedEpisodeId
  );

  /* ================= EPISODES ================= */
  const {
    data: episodesData,
    isLoading: isEpisodesLoading,
    isError: isEpisodesError,
  } = useEpisodesQuery();

  const episodes = episodesData?.results ?? [];

  // ✅ Set default episode once
  useEffect(() => {
    if (episodes.length && !selectedEpisodeId) {
      setSelectedEpisodeId(String(episodes[0].id));
    }
  }, [episodes, selectedEpisodeId, setSelectedEpisodeId]);

  /* ================= EPISODE CHARACTERS ================= */
  const {
    data: episodeCharacters,
    isLoading: isEpisodeCharactersLoading,
    isError: isEpisodeCharactersError,
  } = useEpisodeCharactersQuery(selectedEpisodeId);

  const characterUrls = episodeCharacters ?? [];

  /* ================= CHARACTER DETAILS ================= */
  const characterQueries = useQueries({
    queries: characterUrls.map((url: string) => ({
      queryKey: ["character-url", url],
      queryFn: () => fetchCharacterByUrl(url),
      enabled: Boolean(url),
    })),
  });

  const characters: Character[] = useMemo(() => {
    if (!characterQueries.length) return [];
    return characterQueries
      .map((query) => query.data)
      .filter(Boolean) as Character[];
  }, [characterQueries]);

  const isCharactersLoading =
    characterQueries.length > 0 &&
    characterQueries.some((query) => query.isLoading);

  const isAnyError =
    isEpisodesError ||
    isEpisodeCharactersError ||
    characterQueries.some((query) => query.isError);

  /* ================= HANDLERS ================= */
  const handleEpisodeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedEpisodeId(event.target.value);
  };

  return {
    episodes,
    characters,
    selectedEpisodeId,
    isEpisodesLoading,
    isEpisodeCharactersLoading,
    isCharactersLoading,
    isAnyError,
    handleEpisodeChange,
  };
}
