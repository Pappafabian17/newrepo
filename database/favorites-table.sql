CREATE TABLE IF NOT EXISTS public.account_favorites (
  favorite_id SERIAL PRIMARY KEY,
  account_id INT NOT NULL REFERENCES public.account(account_id) ON DELETE CASCADE,
  inv_id INT NOT NULL REFERENCES public.inventory(inv_id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT account_favorites_unique UNIQUE (account_id, inv_id)
);
