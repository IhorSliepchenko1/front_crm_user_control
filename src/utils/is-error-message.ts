export function isErrorMessage(error: any) {
  return typeof error === "object" &&
    error !== null &&
    "data" in error &&
    "message" in error["data"]
    ? error.data.message
    : "Произошла ошибка!";
}
