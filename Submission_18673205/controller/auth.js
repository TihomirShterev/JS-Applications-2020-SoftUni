// authentication
export function saveUserInfo(userInfo) {
  sessionStorage.setItem("user", userInfo);
}

// за да ни се показват бутоните на header-a за логнат или гост потребител
export function setHeader(ctx) {
  ctx.isAuth = sessionStorage.getItem("user"); // isAuth = isLoggedIn
  ctx.user = sessionStorage.getItem("user");
}
