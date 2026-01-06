import { useQuery } from "@tanstack/react-query";
import { apiClient, QueryKeys } from "./utils";
import { Episode, EpisodesResponse } from "@/src/types/episodes";

export const fetchEpisodes = async (): Promise<EpisodesResponse> => {
  const response = await apiClient.get("/episode");
  return response.data as EpisodesResponse;
};

export const fetchCharactersByEpisode = async (
  episodeId: string
): Promise<string[]> => {
  const response = await apiClient.get(`/episode/${episodeId}`);
  const data = response.data as Episode;
  return data.characters;
};

export const useEpisodesQuery = () =>
  useQuery({
    queryKey: QueryKeys.EPISODES,
    queryFn: fetchEpisodes,
  });

export const useEpisodeCharactersQuery = (episodeId?: string) =>
  useQuery({
    queryKey: QueryKeys.EPISODE_CHARACTERS(episodeId ?? ""),
    queryFn: () => fetchCharactersByEpisode(episodeId ?? ""),
    enabled: Boolean(episodeId),
  });