export function extractErrorMessage(err: unknown): string {
  // Axios-like error handling
  try {
    if (!err || typeof err !== "object") return "An unknown error occurred.";
    // Use 'unknown' for error type safety
    const errorObj = err as unknown;
    if (
      typeof errorObj === "object" && errorObj !== null &&
      "response" in errorObj &&
      (errorObj as { response?: { data?: unknown } }).response?.data
    ) {
      const data = (errorObj as { response?: { data?: unknown } }).response?.data;
      if (typeof data === "string") return data;
      if (typeof data === "object" && data !== null) {
        if ("error" in data) return String((data as { error?: unknown }).error);
        if ("message" in data) return String((data as { message?: unknown }).message);
      }
    }
    if (
      typeof errorObj === "object" && errorObj !== null &&
      "message" in errorObj && typeof (errorObj as { message?: unknown }).message === "string"
    ) {
      return (errorObj as { message?: string }).message as string;
    }
    return String(errorObj);
  } catch {
    // If extracting the error message fails for any reason, return a generic message.
    return "An unknown error occurred.";
  }
}
