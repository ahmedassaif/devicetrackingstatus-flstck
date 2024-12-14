export const prettifyJson = (json: string): string => {
    if (!json?.trim()) return 'N/A';
  
    try {
      const parsed = JSON.parse(json);
      return JSON.stringify(parsed, null, 2); // Pretty-print JSON with 2 spaces
    } catch {
      return 'N/A'; // Return 'N/A' if JSON parsing fails
    }
  };
  