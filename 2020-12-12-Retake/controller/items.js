import commonPartial from "./partials.js";
import { setHeader } from "./auth.js";
import { create, get, update, erase } from "../models/items.js";

export function getCreate(ctx) {
  setHeader(ctx);
  ctx.loadPartials(commonPartial).partial("./view/items/create.hbs");
}

export function postCreate(ctx) {
  const { name, price, imageURL, description, brand } = ctx.params;
  const creator = sessionStorage.getItem("user");

  create({ name, price, imageURL, description, brand, creator, count: 0, usersWhoCounted: [] })
    .then((res) => {
      // console.log(res);
      ctx.redirect("#/home");
    })
    .catch((e) => console.log(e));
}

/*
export function getDetail(ctx) {
  setHeader(ctx);
  const id = ctx.params.id;

  get(id) //
    .then((res) => {
      const item = { ...res.data(), id: res.id }; // събираме необходимите пропъртита в обект
      ctx.isCreator = item.creator === sessionStorage.getItem("user"); // ако създателят съвпада с текущия потребител ще ни върне true

      // // разкоментиране, когато е време за getCount фунцията и само ако в задачата се изисква скриването на бутона
      // const currentUser = sessionStorage.getItem("user");
      // if (item.usersWhoCounted.includes(currentUser)) {
      //   ctx.isAlreadyCounted = true;
      // } else {
      //   ctx.isAlreadyCounted = false;
      // }

      ctx.item = item; // прикачаме данните към обекта, за да ги използваме в шаблона
      ctx.loadPartials(commonPartial).partial("./view/items/details.hbs");
    })
    .catch((e) => console.log(e));
}

export function getEdit(ctx) {
  const id = ctx.params.id;

  get(id)
    .then((res) => {
      const item = { ...res.data(), id: res.id };
      ctx.item = item;
      ctx.loadPartials(commonPartial).partial("./view/items/edit.hbs");
    })
    .catch((e) => console.log(e));
}

export function postEdit(ctx) {
  const { name, price, imageURL, description, brand } = ctx.params;
  const id = ctx.params.id;

  // променяме данните и пренасочваме
  update(id, { name, price, imageURL, description, brand })
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
      // console.log(res);
      ctx.redirect("#/home");
    })
    .catch((e) => console.log(e));
}

export function getCount(ctx) {
  const id = ctx.params.id;

  get(id)
    .then((res) => {
      // console.log(res);
      const item = res.data();
      // // разкоментиране само ако в задачата се изисква скриването на бутона
      // const currentUser = sessionStorage.getItem("user");
      // const usersWhoCounted = item.usersWhoCounted;

      // if (!usersWhoCounted.includes(currentUser)) {
      // // проверката е, за да не се инкрементира, когато се натисне back бутона
      const count = item.count + 1;
      // usersWhoCounted.push(currentUser);

      // update(id, { count, usersWhoCounted })
      update(id, { count })
        .then(() => {
          ctx.redirect(`#/details/${id}`);
        })
        .catch(e => console.log(e));
      // }
    })
    .catch((e) => console.log(e));
}
*/
