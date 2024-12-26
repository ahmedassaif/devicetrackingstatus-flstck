export const API_CONFIG = {
  BASE_URL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:8000/api",
  TIMEOUT: 30000,
  HEADERS: {
    "Content-Type": "application/json",
    // Add any default headers here
  },
} as const;

// // You can also add environment-specific configurations
// export const getApiConfig = () => {
//     const environment = process.env.NODE_ENV;
    
//     switch (environment) {
//       case 'development':
//         return {
//           ...API_CONFIG,
//           BASE_URL: 'https://dev-api.yourservice.com'
//         };
//       case 'production':
//         return API_CONFIG;
//       default:
//         return API_CONFIG;
//     }
//   };