import { getHome } from "./controller/home.js";
import { getLogin, getRegister, postRegister, postLogin, getLogout } from "./controller/user.js";
import { getCreate, postCreate, getDetail, getEdit, postEdit, getDelete, getCount } from "./controller/items.js";

const app = Sammy("body", function () {
  this.use("Handlebars", "hbs");

  this.get("#/home", getHome);
  this.get("#/login", getLogin);
  // this.get("#/profile", getProfile);

  this.get("#/register", getRegister);
  this.post("#/register", postRegister);

  this.post("#/login", postLogin);
  this.get("#/logout", getLogout);

  this.get("#/create", getCreate);
  this.post("#/create", postCreate);

  this.get("#/details/:id", getDetail);

  this.get("#/edit/:id", getEdit);
  this.post("#/edit/:id", postEdit);

  this.get("#/delete/:id", getDelete);
  this.get("#/count/:id", getCount);
});
app.run("#/home");
