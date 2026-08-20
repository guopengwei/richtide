export type InstrumentDataState = "fixture" | "licensed" | "delayed" | "stale" | "unavailable";

export interface Instrument {
  canonicalId: string;
  symbol: string;
  legalName: string;
  exchange: string;
  currency: string;
  instrumentType: string;
  observedAt: string;
  price: number;
  dataState: InstrumentDataState;
}

const instrumentKeys = [
  "canonicalId",
  "symbol",
  "legalName",
  "exchange",
  "currency",
  "instrumentType",
  "observedAt",
  "price",
  "dataState"
] as const;

export function parseInstrument(value: unknown): Instrument {
  if (!isRecord(value)) throw new Error("Invalid Instrument: expected an object");
  for (const key of instrumentKeys) {
    if (!(key in value)) throw new Error(`Invalid Instrument: missing ${key}`);
  }
  const allowedStates: readonly unknown[] = ["fixture", "licensed", "delayed", "stale", "unavailable"];
  if (
    typeof value.canonicalId !== "string" || !/^[A-Z]{2}-[A-Z0-9.-]+$/.test(value.canonicalId) ||
    typeof value.symbol !== "string" || typeof value.legalName !== "string" ||
    typeof value.exchange !== "string" || typeof value.currency !== "string" ||
    typeof value.instrumentType !== "string" || typeof value.observedAt !== "string" ||
    !Number.isFinite(Date.parse(value.observedAt)) || typeof value.price !== "number" ||
    !Number.isFinite(value.price) || !allowedStates.includes(value.dataState)
  ) throw new Error("Invalid Instrument: field contract failed");
  return value as unknown as Instrument;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
