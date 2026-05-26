-- Run this in your Supabase SQL editor to set up the transactions table.

CREATE TABLE IF NOT EXISTS transactions (
  id               UUID         DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id          UUID         REFERENCES auth.users(id) ON DELETE CASCADE,
  amount           DECIMAL(15,2) NOT NULL,
  type             TEXT         NOT NULL CHECK (type IN ('income', 'expense')),
  category         TEXT         NOT NULL,
  note             TEXT,
  customer_name    TEXT,
  transaction_date DATE         NOT NULL,
  created_at       TIMESTAMPTZ  DEFAULT NOW() NOT NULL
);

-- If you already created the table without user_id, run this migration instead:
-- ALTER TABLE transactions ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Enable Row Level Security
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
