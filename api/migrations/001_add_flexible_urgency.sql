-- Migration: add 'flexible' to the urgency check constraint on users
-- Run once against your PostgreSQL database.

ALTER TABLE users
  DROP CONSTRAINT IF EXISTS users_urgency_check;

ALTER TABLE users
  ADD CONSTRAINT users_urgency_check
  CHECK (urgency IN ('not_urgent', 'slightly_urgent', 'extremely_urgent', 'flexible'));
