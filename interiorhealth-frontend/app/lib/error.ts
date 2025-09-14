export function extractErrorMessage(err: unknown): string {
  // Axios-like error handling
  try {
    if (!err || typeof err !== "object") return "An unknown error occurred.";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyErr = err as any;
    if (anyErr.response && anyErr.response.data) {
      if (typeof anyErr.response.data === "string") return anyErr.response.data;
      if (anyErr.response.data.error) return String(anyErr.response.data.error);
      if (anyErr.response.data.message) return String(anyErr.response.data.message);
    }
    if (anyErr.message && typeof anyErr.message === "string") return anyErr.message;
    return String(anyErr);
  } catch (e) {
    // If extracting the error message fails for any reason, return a generic message.
    // We intentionally keep `e` in the signature in case future logging is added.
    return "An unknown error occurred.";
  }
}
