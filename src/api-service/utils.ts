const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "";

export const API_CONFIG = {
  baseUrl: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
} as const;

const buildUrl = (endpoint: string) => {
  if (!endpoint) return API_CONFIG.baseUrl;
  if (endpoint.startsWith("http")) return endpoint;
  const prefix = endpoint.startsWith("/") ? "" : "/";
  return `${API_CONFIG.baseUrl}${prefix}${endpoint}`;
};

const parseResponse = async (response: Response) => {
  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const text = await response.text();

  if (!text) return {};
  if (isJson) return JSON.parse(text);
  return text;
};

export const apiClient = {
  request: async ({
    endpoint,
    method = "GET",
    data,
    headers = {},
  }: {
    endpoint: string;
    method?: string;
    data?: unknown;
    headers?: Record<string, string>;
  }) => {
    const url = buildUrl(endpoint);
    const isFormData =
      typeof FormData !== "undefined" && data instanceof FormData;
    const mergedHeaders: Record<string, string> = {
      ...API_CONFIG.headers,
      ...headers,
    };

    if (isFormData && "Content-Type" in mergedHeaders) {
      delete mergedHeaders["Content-Type"];
    }

    const response = await fetch(url, {
      method,
      headers: mergedHeaders,
      body: data ? (isFormData ? (data as BodyInit) : JSON.stringify(data)) : undefined,
    });

    const parsed = await parseResponse(response);

    if (!response.ok) {
      const error: any = new Error(
        (parsed as any)?.error ||
          (parsed as any)?.message ||
          `Request failed: ${response.status} ${response.statusText}`
      );
      error.response = { data: parsed, status: response.status };
      throw error;
    }

    return { success: true, data: parsed };
  },

  get: async (endpoint: string, headers: Record<string, string> = {}) =>
    apiClient.request({ endpoint, method: "GET", headers }),

//   post: async (
//     endpoint: string,
//     data?: unknown,
//     headers: Record<string, string> = {}
//   ) => apiClient.request({ endpoint, method: "POST", data, headers }),

//   put: async (
//     endpoint: string,
//     data?: unknown,
//     headers: Record<string, string> = {}
//   ) => apiClient.request({ endpoint, method: "PUT", data, headers }),

//   patch: async (
//     endpoint: string,
//     data?: unknown,
//     headers: Record<string, string> = {}
//   ) => apiClient.request({ endpoint, method: "PATCH", data, headers }),

//   delete: async (
//     endpoint: string,
//     data?: unknown,
//     headers: Record<string, string> = {}
//   ) => apiClient.request({ endpoint, method: "DELETE", data, headers }),
};

export const QueryKeys = {
  CHARACTERS: ["characters"],
  CHARACTER: (id: string) => ["character", id],
  EPISODES: ["episodes"],
  EPISODE: (id: string) => ["episode", id],
  EPISODE_CHARACTERS: (episodeId: string) => ["episode-characters", episodeId],
} as const;
