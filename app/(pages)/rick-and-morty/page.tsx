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
import { Character } from "@/src/types/character";

export default function RickAndMortyPage() {
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

  if (isEpisodesLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg font-semibold text-gray-600">Loading episodes...</p>
      </div>
    );
  }

  if (isAnyError) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg font-semibold text-red-600">
          Something went wrong. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">Rick and Morty</h1>
          <p className="text-sm text-white-600">
            Choose an episode to see the characters that appear in it.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label
            htmlFor="episode-select"
            className="text-sm font-medium text-white-800"
          >
            Episode
          </label>
          <select
            id="episode-select"
            aria-label="Select episode"
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition hover:border-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            value={selectedEpisodeId}
            onChange={handleEpisodeChange}
          >
            {episodes.map((episode) => (
              <option key={episode.id} value={episode.id}>
                {episode.episode} — {episode.name}
              </option>
            ))}
          </select>
        </div>
      </header>

      <section className="rounded-xl border p-4 shadow-sm">
        <div className="flex items-center justify-between pb-3">
          <h2 className="text-lg font-semibold text-white">
            Characters in this episode
          </h2>
          {isEpisodeCharactersLoading || isCharactersLoading ? (
            <span className="text-sm text-indigo-600">Loading...</span>
          ) : (
            <span className="text-sm text-white-600">
              {characters.length} character{characters.length === 1 ? "" : "s"}
            </span>
          )}
        </div>

        {isEpisodeCharactersLoading || isCharactersLoading ? (
          <div className="flex items-center justify-center py-10">
            <p className="text-gray-600">Fetching characters...</p>
          </div>
        ) : !characters.length ? (
          <div className="flex items-center justify-center py-10">
            <p className="text-gray-600">No characters found for this episode.</p>
          </div>
        ) : (
          <div className="grid gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-3">
            {characters.map((character) => (
              <article
                key={character.id}
                tabIndex={0}
                aria-label={character.name}
                className="group flex gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow"
              >
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-semibold text-gray-900">
                    {character.name}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {character.species} — {character.gender}
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    Status: {character.status}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}