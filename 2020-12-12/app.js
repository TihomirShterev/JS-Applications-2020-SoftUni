import { getHome } from "./controller/home.js";
import { getRegister, postRegister, getLogin, postLogin, getLogout } from "./controller/user.js";
// import { getRegister, postRegister, getLogin, postLogin, getLogout, getProfile } from "./controller/user.js";
import { getDashboard } from "./controller/dashboard.js";
import { getCreate, postCreate, getEdit, postEdit, getDelete, postDelete, getDetail } from "./controller/items.js";
// import { getCount } from "./controller/items.js";

const app = Sammy("body", function () {
  // const app = Sammy("main", function () { // разкоментирам, ако се чупят стиловете на home страницата
  this.use("Handlebars", "hbs");

  this.get("#/home", getHome);

  this.get("#/register", getRegister);
  this.post("#/register", postRegister);

  this.get("#/login", getLogin);
  this.post("#/login", postLogin);

  this.get("#/logout", getLogout);

  this.get("#/dashboard", getDashboard);

  // this.get("#/profile", getProfile); // само ако в задачата се изисква

  this.get("#/create", getCreate);
  this.post("#/create", postCreate);

  this.get("#/edit/:id", getEdit);
  this.post("#/edit/:id", postEdit);

  this.get("#/delete/:id", getDelete);
  this.get("#/delete/:id", postDelete);
  this.get("#/details/:id", getDetail);
  /*
  
  this.get("#/count/:id", getCount);
*/
});
app.run("#/home");
