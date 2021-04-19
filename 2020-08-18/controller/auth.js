// authentication
export function saveUserInfo(userInfo) {
  sessionStorage.setItem("user", userInfo);
}

export function setHeader(ctx) {
  ctx.isAuth = sessionStorage.getItem("user"); // isAuth = isLoggedIn
  ctx.user = sessionStorage.getItem("user");
}
