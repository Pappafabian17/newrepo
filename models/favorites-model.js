const pool = require("../database/")

async function addFavorite(account_id, inv_id) {
  const sql = `
    INSERT INTO public.account_favorites (account_id, inv_id)
    VALUES ($1, $2)
    ON CONFLICT (account_id, inv_id) DO NOTHING
    RETURNING *`
  return await pool.query(sql, [account_id, inv_id])
}

async function removeFavorite(account_id, inv_id) {
  const sql = `
    DELETE FROM public.account_favorites
    WHERE account_id = $1 AND inv_id = $2
    RETURNING *`
  return await pool.query(sql, [account_id, inv_id])
}

async function getFavoritesByAccountId(account_id) {
  const sql = `
    SELECT f.created_at, i.*, c.classification_name
    FROM public.account_favorites AS f
    JOIN public.inventory AS i ON f.inv_id = i.inv_id
    JOIN public.classification AS c ON i.classification_id = c.classification_id
    WHERE f.account_id = $1
    ORDER BY f.created_at DESC`
  const data = await pool.query(sql, [account_id])
  return data.rows
}

async function isFavorite(account_id, inv_id) {
  const sql = `
    SELECT 1
    FROM public.account_favorites
    WHERE account_id = $1 AND inv_id = $2
    LIMIT 1`
  const data = await pool.query(sql, [account_id, inv_id])
  return data.rowCount > 0
}

module.exports = {
  addFavorite,
  removeFavorite,
  getFavoritesByAccountId,
  isFavorite,
}
