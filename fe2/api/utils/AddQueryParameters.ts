/* eslint-disable prettier/prettier */
export function AddQueryParameters(params: Record<string, any>): string {
  const filteredParams = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null) // Exclude undefined or null
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join("&");

  return filteredParams;
}
