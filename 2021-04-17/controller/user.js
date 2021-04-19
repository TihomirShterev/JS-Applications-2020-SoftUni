import commonPartial from "./partials.js";
import { registerUser, login, logout } from "../models/user.js";
import { saveUserInfo, setHeader } from "./auth.js";
import { getAll } from "../models/items.js";

export function getRegister(ctx) {
  setHeader(ctx);

  ctx.loadPartials(commonPartial).partial("./view/user/register.hbs");
}

export function postRegister(ctx) {
  const { email, password, rePassword } = ctx.params;

  if (!email || !password || !rePassword) {
    return alert("Please fill all the fields");
  }

  if (password !== rePassword) {
    return alert("Please enter matching passwords");
  }

  if (!email.includes('@')) {
    return alert("Please enter a valid email");
  }

  registerUser(email, password)
    .then((res) => {
      saveUserInfo(res.user.email);
      ctx.redirect("#/home");
    })
    .catch((e) => console.log(e));
}

export function getLogin(ctx) {
  setHeader(ctx);

  ctx.loadPartials(commonPartial).partial("./view/user/login.hbs");
}

export function postLogin(ctx) {
  const { email, password } = ctx.params;

  if (!email || !password) {
    return alert("Please fill all the fields");
  }

  if (!email.includes('@')) {
    return alert("Please enter a valid email");
  }

  login(email, password) //
    .then((res) => {
      saveUserInfo(res.user.email);

      ctx.redirect("#/home");
    })
    .catch((e) => console.log(e));
}

export function getLogout(ctx) {
  logout()
    .then(() => {
      sessionStorage.clear();
      ctx.redirect("#/home");
    })
    .catch((e) => console.log(e));
}

export function getProfile(ctx) {
  setHeader(ctx);
  const currentUser = sessionStorage.getItem("user");

  getAll() //
    .then((res) => {
      const items = res.docs.map((x) => (x = { ...x.data(), id: x.id }));
      ctx.items = items.filter(item => item.creator === currentUser); // за да можем да използваме пропъртитата в profile.hbs
      ctx.loadPartials(commonPartial).partial("./view/user/profile.hbs");
    });

}
