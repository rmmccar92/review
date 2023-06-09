const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");
const { v4: uuidv4 } = require("uuid");

const db = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

// const sequelize = require('./config/connection');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

// const sess = {
//   secret: 'Super secret secret',
//   cookie: {
//     maxAge: 300000,
//     httpOnly: true,
//     secure: false,
//     sameSite: 'strict',
//   },
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize
//   })
// };

// app.use(session(sess));

// This is how you can configure the session for use with your MongoDB database
const MongoStore = require("connect-mongo");

const sess = {
  genid: (req) => {
    return uuidv4();
  },
  secret: "super secret",
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
  store: MongoStore.create({
    client: db.getClient(),
    dbName: "demo_db",
    collection: "sessions",
    stringify: false,
    autoRemove: "interval",
    autoRemoveInterval: 10,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(require("./routes"));

// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}!`);
//   sequelize.sync({ force: false });
// });

// !⬆️ Sequelize server start ⬇️ Mongoose server start
// Don't forget we'll need to install the mongoose package to use it
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
