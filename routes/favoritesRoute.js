const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/")
const favoritesController = require("../controllers/favoritesController")

router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(favoritesController.buildFavoritesView)
)

router.post(
  "/add",
  utilities.checkLogin,
  utilities.handleErrors(favoritesController.addFavorite)
)

router.post(
  "/remove",
  utilities.checkLogin,
  utilities.handleErrors(favoritesController.removeFavorite)
)

module.exports = router
