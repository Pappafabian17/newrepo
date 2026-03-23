const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  const className = data[0].classification_name;
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  });
};

invCont.buildByInventoryId = async function(req,res,next){
  const inv_id = req.params.invId;
  const data = await invModel.getInventoryByInvId(inv_id);

  if(!data){
    return next({status:404, message:"Vehicle not found"});
  }

  const nav = await utilities.getNav();
  const detail = await utilities.buildInventoryDetail(data);

  res.render("./inventory/detail", {
    title: `${data.inv_make} ${data.inv_model}`,
    nav,
    detail,
  });
};

invCont.triggerError = async function (req, res, next) {
  throw new Error("Intentional 500 error for testing");
};

module.exports = invCont;
