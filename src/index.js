const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const path = require("path");
const { engine } = require("express-handlebars");
const methodOverride = require("method-override");
const MongoStore = require("connect-mongo");
const app = express();
const port = 3000;

const SortMiddleware = require("./app/middlewares/sortMiddleware");
const db = require("./config/db");
// Connect to DB
db.connect();
const mongodbURI = db.mongodbURI;

app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(morgan("combined"));

const sessionStore = MongoStore.create({
  mongoUrl: mongodbURI, // URL kết nối đến MongoDB
  collectionName: "sessions", // Tên collection để lưu trữ session
  ttl: 3600, // Thời gian sống của session (giây)
});
app.use(
  session({
    secret: "keyboard cat",
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
  })
);
//Custom Middleware
app.use(SortMiddleware);

app.use(methodOverride("_method"));
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: require("./helpers/handlebars"),
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

const route = require("./routes");
const handlebars = require("./helpers/handlebars");

const ba = "hello";
// Route

route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
