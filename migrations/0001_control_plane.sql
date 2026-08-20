-- D1 is a query, projection, identity, audit, and idempotency store.
-- It is deliberately not the authority for Analysis Credit balances or Analysis Access.
CREATE TABLE IF NOT EXISTS customers (
  id TEXT PRIMARY KEY,
  email_hash TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  verified_at TEXT,
  created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS sessions (
  id_hash TEXT PRIMARY KEY,
  customer_id TEXT NOT NULL REFERENCES customers(id),
  expires_at TEXT NOT NULL,
  revoked_at TEXT
);
CREATE TABLE IF NOT EXISTS instruments (
  canonical_id TEXT PRIMARY KEY,
  symbol TEXT NOT NULL,
  legal_name_zh_cn TEXT NOT NULL,
  exchange_code TEXT NOT NULL,
  currency TEXT NOT NULL,
  rights_state TEXT NOT NULL,
  observed_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS generation_projections (
  generation_event_id TEXT PRIMARY KEY,
  family_key TEXT NOT NULL,
  state TEXT NOT NULL,
  artifact_id TEXT,
  correlation_id TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS provider_events (
  provider_event_id TEXT PRIMARY KEY,
  raw_hash TEXT NOT NULL,
  verified_at TEXT NOT NULL,
  reconciled_at TEXT
);
CREATE TABLE IF NOT EXISTS privileged_audit (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  actor_id TEXT NOT NULL,
  role TEXT NOT NULL,
  purpose TEXT NOT NULL,
  subject_id TEXT NOT NULL,
  action TEXT NOT NULL,
  result TEXT NOT NULL,
  correlation_id TEXT NOT NULL,
  occurred_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_generation_family ON generation_projections(family_key, updated_at);
CREATE INDEX IF NOT EXISTS idx_audit_subject ON privileged_audit(subject_id, occurred_at);
