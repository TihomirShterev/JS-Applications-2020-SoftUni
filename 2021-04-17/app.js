import { getHome } from "./controller/home.js";
import { getRegister, postRegister, getLogin, postLogin, getLogout, getProfile } from "./controller/user.js";
import { getCreate, postCreate, getDetail, getEdit, postEdit, getDelete, getCount } from "./controller/items.js";

const app = Sammy("#container", function () {
  this.use("Handlebars", "hbs");

  this.get("#/home", getHome);

  this.get("#/register", getRegister);
  this.post("#/register", postRegister);

  this.get("#/login", getLogin);
  this.post("#/login", postLogin);

  this.get("#/logout", getLogout);

  this.get("#/profile", getProfile);

  this.get("#/create", getCreate);
  this.post("#/create", postCreate);

  this.get("#/details/:id", getDetail);

  this.get("#/edit/:id", getEdit);
  this.post("#/edit/:id", postEdit);

  this.get("#/delete/:id", getDelete);

  this.get("#/count/:id", getCount);
});
app.run("#/home");
