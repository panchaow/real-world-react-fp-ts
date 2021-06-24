const prefix: string = "Invariant failed";

export function invariant(condition: unknown, message?: string): asserts condition {
  if (condition) {
    return;
  }

  if (process.env.NODE_ENV === "development") {
    throw new Error(`${prefix}: ${message || ""}`);
  }

  throw new Error(prefix);
};