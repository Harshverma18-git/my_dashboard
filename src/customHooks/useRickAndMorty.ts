"use client";

import { useEffect, useMemo, useState } from "react";
import { useQueries } from "@tanstack/react-query";
import {
  useEpisodesQuery,
  useEpisodeCharactersQuery,
} from "@/src/api-service/episodes";
import {
  fetchCharacterByUrl,
  useCharactersQuery,
} from "@/src/api-service/characters";
import { Character } from "@/src/types/characters";

export function useRickAndMorty() {
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<string>("");

  const {
    data: episodesData,
    isLoading: isEpisodesLoading,
    isError: isEpisodesError,
  } = useEpisodesQuery();

  const episodes = episodesData?.results ?? [];

  useEffect(() => {
    if (episodes.length && !selectedEpisodeId) {
      setSelectedEpisodeId(String(episodes[0].id));
    }
  }, [episodes, selectedEpisodeId]);

  const {
    data: episodeCharacters,
    isLoading: isEpisodeCharactersLoading,
    isError: isEpisodeCharactersError,
  } = useEpisodeCharactersQuery(selectedEpisodeId);

  const characterUrls = episodeCharacters ?? [];

  const characterQueries = useQueries({
    queries:
      characterUrls.map((url: string) => ({
        queryKey: ["character-url", url],
        queryFn: () => fetchCharacterByUrl(url),
        enabled: Boolean(url),
      })) ?? [],
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

  const handleEpisodeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEpisodeId(event.target.value);
  };

  return{
    episodes,
    characters,
    isEpisodesLoading,
    isEpisodeCharactersLoading,
    isCharactersLoading,
    isAnyError,
    selectedEpisodeId,
    handleEpisodeChange,
  };
}