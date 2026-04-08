const utilities = require("../utilities/")
const favoritesModel = require("../models/favorites-model")
const invModel = require("../models/inventory-model")

const favoritesCont = {}

favoritesCont.buildFavoritesView = async function (req, res, next) {
  const nav = await utilities.getNav()
  const account_id = res.locals.accountData.account_id
  const favorites = await favoritesModel.getFavoritesByAccountId(account_id)
  res.render("account/favorites", {
    title: "My Favorites",
    nav,
    errors: null,
    favorites,
  })
}

favoritesCont.addFavorite = async function (req, res, next) {
  const account_id = res.locals.accountData.account_id
  const inv_id = parseInt(req.body.inv_id)

  if (!Number.isInteger(inv_id)) {
    req.flash("notice", "Invalid vehicle selection.")
    return res.redirect("/account/")
  }

  const vehicle = await invModel.getInventoryByInvId(inv_id)
  if (!vehicle) {
    req.flash("notice", "Vehicle not found.")
    return res.redirect("/account/")
  }

  const addResult = await favoritesModel.addFavorite(account_id, inv_id)
  if (addResult.rowCount > 0) {
    req.flash("notice", "Vehicle added to favorites.")
  } else {
    req.flash("notice", "Vehicle is already in favorites.")
  }

  return res.redirect(`/inv/detail/${inv_id}`)
}

favoritesCont.removeFavorite = async function (req, res, next) {
  const account_id = res.locals.accountData.account_id
  const inv_id = parseInt(req.body.inv_id)
  const source = req.body.source

  if (!Number.isInteger(inv_id)) {
    req.flash("notice", "Invalid vehicle selection.")
    return res.redirect("/favorites")
  }

  await favoritesModel.removeFavorite(account_id, inv_id)
  req.flash("notice", "Vehicle removed from favorites.")

  if (source === "favorites") {
    return res.redirect("/favorites")
  }

  return res.redirect(`/inv/detail/${inv_id}`)
}

module.exports = favoritesCont
