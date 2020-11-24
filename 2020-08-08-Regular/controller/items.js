import commonPartial from "./partials.js";
import { setHeader } from "./auth.js";
import { create, get, update, erase } from "../models/items.js";

export function getCreate(ctx) {
  setHeader(ctx);
  ctx.loadPartials(commonPartial).partial("./view/items/create.hbs");
}

export function postCreate(ctx) {
  const { title, description, imageURL } = ctx.params;
  const creator = sessionStorage.getItem("user");

  create({ title, description, imageURL, creator, count: 0, usersWhoCounted: [] })
    .then((res) => {
      // console.log(res);
      ctx.redirect("#/home");
    })
    .catch((e) => console.log(e));
}

export function getDetail(ctx) {
  setHeader(ctx);
  const id = ctx.params.id;
  // console.log(id);

  get(id) //
    .then((res) => {
      // console.log(res.data());
      const item = { ...res.data(), id: res.id }; // събираме необходимите пропъртита в обект
      ctx.isCreator = item.creator === sessionStorage.getItem("user"); // ако създателят съвпада с текущия потребител ще ни върне true

      const currentUser = sessionStorage.getItem("user");
      if (item.usersWhoCounted.includes(currentUser)) {
        ctx.isAlreadyCounted = true;
      } else {
        ctx.isAlreadyCounted = false;
      }

      // console.log(item);
      ctx.item = item; // прикачаме данните към обекта, за да ги използваме в шаблона
      ctx.loadPartials(commonPartial).partial("./view/items/details.hbs");
    })
    .catch((e) => console.log(e));
}

export function getEdit(ctx) {
  const id = ctx.params.id;
  // console.log(id);

  get(id)
    .then((res) => {
      // console.log(res.data());
      const item = { ...res.data(), id: res.id };
      ctx.item = item;
      ctx.loadPartials(commonPartial).partial("./view/items/edit.hbs");
    })
    .catch((e) => console.log(e));
}

export function postEdit(ctx) {
  const { title, description, imageURL } = ctx.params;
  const id = ctx.params.id;

  // променяме данните и пренасочваме
  update(id, { title, description, imageURL })
    .then((res) => {
      // console.log(res);
      ctx.redirect(`#/details/${id}`);
    })
    .catch((e) => console.log(e));
}

export function getDelete(ctx) {
  const id = ctx.params.id;

  erase(id)
    .then((res) => {
      console.log(res);
      ctx.redirect("#/home");
    })
    .catch((e) => console.log(e));
}

// функционалност тип "брояч"
export function getCount(ctx) {
  const id = ctx.params.id;

  get(id)
    .then((res) => {
      // console.log(res);
      const item = res.data();

      const count = item.count + 1;

      const currentUser = sessionStorage.getItem("user");
      const usersWhoCounted = item.usersWhoCounted;
      usersWhoCounted.push(currentUser);

      update(id, { count, usersWhoCounted })
        .then(() => {
          ctx.redirect(`#/details/${id}`);
        })
        .catch((e) => console.log(e));
    })
    .catch((e) => console.log(e));
}
