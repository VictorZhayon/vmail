-- ============================================================
-- 1. PROFILES
-- One row per user, auto-created on signup via trigger.
-- ============================================================

CREATE TABLE IF NOT EXISTS profiles (
  id           UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email        TEXT        NOT NULL,
  full_name    TEXT,
  avatar_url   TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can only read/update their own profile
CREATE POLICY "Users can view own profile"   ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Auto-create a profile row whenever a new user signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();


-- ============================================================
-- 2. TRANSACTIONS
-- Every transaction is linked to a profile via user_id.
-- ============================================================

CREATE TABLE IF NOT EXISTS transactions (
  id               UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id          UUID          NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount           DECIMAL(15,2) NOT NULL,
  type             TEXT          NOT NULL CHECK (type IN ('income', 'expense')),
  category         TEXT          NOT NULL,
  note             TEXT,
  customer_name    TEXT,
  transaction_date DATE          NOT NULL,
  created_at       TIMESTAMPTZ   DEFAULT NOW() NOT NULL
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Users can only access their own transactions
CREATE POLICY "Users can view own transactions"   ON transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own transactions" ON transactions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own transactions" ON transactions FOR DELETE USING (auth.uid() = user_id);


-- ============================================================
-- 3. MIGRATIONS (run only if tables already exist)
-- ============================================================

-- Add user_id to transactions if missing:
-- ALTER TABLE transactions ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES profiles(id) ON DELETE CASCADE;

-- Backfill profiles for existing auth users (run once if you had users before adding this table):
-- INSERT INTO profiles (id, email)
-- SELECT id, email FROM auth.users
-- ON CONFLICT (id) DO NOTHING;
