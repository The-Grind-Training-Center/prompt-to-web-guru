-- Existing-row backfill and project-specific cron scheduling are applied separately
-- through the database data-change tool, not stored as executable migration SQL.
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;