/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function addQueryParameters(params: Record<string, any>): string {
  const filteredParams = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null) // Exclude undefined or null
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join("&");

  return filteredParams;
}

export function buildUrl(endpoint: string, params?: Record<string, any>): string {
    const baseUrl = endpoint;

    if (!params) return baseUrl;
    
    const queryString = addQueryParameters(params);

    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  }
  
  export function sanitizeRequestData(data: any): any {
    // Remove undefined and null values from request data
    return Object.entries(data).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = value;
      }

      return acc;
    }, {} as Record<string, any>);
  }