import commonPartial from "./partials.js";
import { registerUser, login, logout } from "../models/user.js";
import { saveUserInfo, setHeader } from "./auth.js";

export function getLogin(ctx) {
  setHeader(ctx);

  ctx.loadPartials(commonPartial).partial("./view/user/login.hbs");
}

// export function getProfile(ctx) {
//   setHeader(ctx);

//   ctx.loadPartials(commonPartial).partial("./view/user/profile.hbs");
// }

export function getRegister(ctx) {
  setHeader(ctx);

  ctx.loadPartials(commonPartial).partial("./view/user/register.hbs");
}

export function postRegister(ctx) {
  // достъпваме name-value-тата на input-ите на form-ата, които се пазят в params
  // console.log(ctx); // за да тестваме и да видим name-value-тата на input-ите на form-ата
  const { email, password, rePassword } = ctx.params;

  if (password !== rePassword) {
    throw new Error("Passwords do not match");
  }

  registerUser(email, password) //
    .then((res) => {
      saveUserInfo(res.user.email);
      console.log(res);
      ctx.redirect("#/home");
    })
    .catch((e) => console.log(e));
}

export function postLogin(ctx) {
  const { email, password } = ctx.params;

  login(email, password) //
    .then((res) => {
      saveUserInfo(res.user.email);

      ctx.redirect("#/home");

      // notify("Logged in!", "#successBox");
      // setTimeout(() => ctx.redirect("#/home"), 2000);
    })
    .catch((e) => console.log(e));
  // .catch((e) => notify(`${e.message}`, "#errorBox"));
}

export function getLogout(ctx) {
  logout()
    .then(() => {
      sessionStorage.clear();
      ctx.redirect("#/login");
    })
    .catch((e) => console.log(e));
}

/*
function notify(message, selector) {
  const notification = document.querySelector(selector);
  notification.textContent = message;
  notification.style.display = "block";
}
*/
