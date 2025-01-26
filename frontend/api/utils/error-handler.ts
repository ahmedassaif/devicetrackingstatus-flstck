/* eslint-disable @typescript-eslint/no-explicit-any */
// api/utils/error-handlers.ts

import { AxiosError, AxiosResponse } from 'axios';

import { CommonErrorResponse } from "../services/types/commonResponses.types";

interface ApiError {
  message: string;
  code: string;
  details?: any;
}

export function parseApiError(error: any): ApiError {
  if (error.response) {
    // The server responded with a status code outside the 2xx range
    return {
      message: error.response.data?.message || "An unexpected error occurred",
      code: error.response.data?.code || String(error.response.status),
      details: error.response.data?.details,
    };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      message: "No response received from server",
      code: "NETWORK_ERROR",
    };
  } else {
    // Something happened in setting up the request
    return {
      message: error.message || "Failed to make request",
      code: "REQUEST_SETUP_ERROR",
    };
  }
}

export function handleNetworkError(error: AxiosError): never {
  const parsedError = parseApiError(error);

  // Log the error for debugging
  

  // Handle specific error codes
  switch (parsedError.code) {
    case "401":
      // Handle unauthorized access
      window.location.href = "/login";
      throw new Error("Redirecting to login page");
    case "403":
      // Handle forbidden access
      throw new Error("You do not have permission to perform this action");
    case "404":
      // Handle not found
      throw new Error("The requested resource was not found");
    case "503":
      // Handle service unavailable
      throw new Error(
        "Service is currently unavailable. Please try again later.",
      );
    default:
      // Handle other errors
      throw new Error(parsedError.message);
  }
}

export function createErrorResponse(response: AxiosResponse): CommonErrorResponse {
  // Extract backend's error message if available
  const backendMessage = response.data?.message || response.data?.detail;

  if (response.status === 0 && response.statusText === "Network Error") {
    return {
      title: "Service Unavailable",
      status: 503,
      type: "https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.4",
      detail: backendMessage || `Service at ${response.config.url} is not available. Error message: ${response.statusText}`,
    };
  }

  // Handle 409 Conflict explicitly
  if (response.status === 409) {
    return {
      title: "Conflict",
      status: 409,
      type: "https://tools.ietf.org/html/rfc7231#section-6.5.8",
      detail: response.data?.message || "DeviceLocation already exists",
    };
  }

  switch (response.status) {
    case 404:
      return {
        title: "The specified resource was not found",
        status: 404,
        type: "https://tools.ietf.org/html/rfc7231#section-6.5.4",
        detail: backendMessage || `The specified resource at ${response.config.url} was not found.`,
      };
    case 415:
      return {
        title: "Unsupported Media Type",
        status: 415,
        type: "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.13",
        detail:
          "The server is refusing to accept the request because the media type is not supported.",
      };
    case 401:
      return {
        title: "The requested resource requires authentication.",
        status: 401,
        type: "https://datatracker.ietf.org/doc/html/rfc7235#section-3.1",
        detail:
          "The server is refusing to process the request because the user is unauthorized.",
      };
    default:
      return {
        title: "Unknown Error",
        status: 500,
        type: "https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.1",
        detail: backendMessage || "Something went wrong.",
      };
  }
}

export function parseContentDisposition(contentDisposition: string): {
  fileName: string;
} {
  const match = contentDisposition.match(/filename="(.+)"/);

  if (!match || !match[1]) {
    throw new Error(
      "Content-Disposition header does not contain a valid filename.",
    );
  }

  return { fileName: match[1] };
}
