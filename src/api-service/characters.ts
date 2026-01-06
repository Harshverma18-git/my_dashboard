import { useQuery } from "@tanstack/react-query";
import { apiClient, QueryKeys } from "./utils";
import { Character, CharactersResponse } from "../types/character";

export const fetchAllCharacters = async (): Promise<CharactersResponse> => {
  const response = await apiClient.get("/character");
  return response.data as CharactersResponse;
};

export const fetchCharacterByUrl = async (url: string): Promise<Character> => {
  const response = await apiClient.get(url);
  return response.data as Character;
};

export const useCharactersQuery = () =>
  useQuery({
    queryKey: QueryKeys.CHARACTERS,
    queryFn: fetchAllCharacters,
  });

export const useCharacterByUrlQuery = (url?: string) =>
  useQuery({
    queryKey: QueryKeys.CHARACTER(url ?? ""),
    queryFn: () => fetchCharacterByUrl(url ?? ""),
    enabled: Boolean(url),
  });