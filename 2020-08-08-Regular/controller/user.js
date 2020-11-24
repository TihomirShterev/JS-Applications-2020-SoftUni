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
  // ctx e обектът (текущата инстанция), който съдържа params
  // console.log(ctx); // за да тестваме и да видим в конзолата на браузъра key-value-тата на въведените от потребителя input-ит във form-ата.
  // ! чрез name-атрибутите на шаблона достъпваме стойностите на input-полетата във form-ата, които се пазят в params
  const { email, password, repeatPassword } = ctx.params; // създаваме си обект, чиито пропъртита ще използваме, за да правим заявки

  // правим си валидации
  if (password !== repeatPassword) {
    throw new Error("Passwords do not match");
  }

  // правим заявка за създаване и обработваме получения response-a
  registerUser(email, password) //
    .then((res) => {
      // console.log(res); // за да проверим какъв response сме получили, т.е. за да дебъгнем
      saveUserInfo(res.user.email);
      ctx.redirect("#/home");
    })
    .catch((e) => console.log(e)); // ако нещо не е наред в конзолата на браузъра ще ни се подскаже
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
