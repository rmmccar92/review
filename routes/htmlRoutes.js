const router = require("express").Router();
const axios = require("axios");

async function getPeeps() {
  return await axios.get("https://randomuser.me/api/");
}
// Oh boy everyone's favorite handlebars :D
router.get("/", async (req, res) => {
  const num = Math.floor(Math.random() * 10 + 1);
  let peepArr = [];
  for (let i = 0; i < num; i++) {
    const { data } = await getPeeps();
    peepArr.push(data.results[0]);
  }
  console.log("Any peeps?", peepArr);
  // const peeps = peepArr.map((peep) => peep.get({ plain: true }));

  res.render("landing", { peeps: peepArr });
});
module.exports = router;

router.get("/profile", (req, res) => {
  res.render("profile");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});
// Congratulations you found the secret comment :D
