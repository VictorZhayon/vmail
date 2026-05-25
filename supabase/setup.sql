-- Run this in your Supabase SQL editor to set up the transactions table.

CREATE TABLE IF NOT EXISTS transactions (
  id               UUID         DEFAULT gen_random_uuid() PRIMARY KEY,
  amount           DECIMAL(15,2) NOT NULL,
  type             TEXT         NOT NULL CHECK (type IN ('income', 'expense')),
  category         TEXT         NOT NULL,
  note             TEXT,
  customer_name    TEXT,
  transaction_date DATE         NOT NULL,
  created_at       TIMESTAMPTZ  DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security (service role key bypasses RLS automatically)
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
