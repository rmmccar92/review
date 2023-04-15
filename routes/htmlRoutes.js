const router = require("express").Router();
const { Peep } = require("../models");

router.get("/", async (req, res) => {
  try {
    // const peepData = await Peep.findAll();
    //! ⬆️ Sequelize ⬇️ Mongoose
    const peepData = await Peep.find();
    // const peeps = peepData.map((peep) => peep.get({ plain: true }));
    //! ⬆️ Sequelize ⬇️ Mongoose
    const peeps = peepData.map((peep) => peep.toObject());
    res.render("landing", { peeps: peeps, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    // Oh boy it's our favorite handlebars
    res.status(500).json(err);
  }
});
router.get("/edit-peep/:id", async ({ params }, res) => {
  try {
    const peepData = await Peep.findByPk(params.id);
    const peep = peepData.get({ plain: true });
    res.render("edit-peep", { peep });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
