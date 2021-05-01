const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const exphbs = require("express-handlebars");
const path = require("path");
const helpers = require("./utils/helpers");
const { ServerResponse, Server } = require("http");
const hbs = exphbs.create({ helpers });

const app = express();
const PORT = process.env.PORT || 3001;

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));
app.use(require(""));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(routes);
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});