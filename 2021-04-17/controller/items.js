import commonPartial from "./partials.js";
import { setHeader } from "./auth.js";
import { create, get, update, erase } from "../models/items.js";

export function getCreate(ctx) {
  setHeader(ctx);
  ctx.loadPartials(commonPartial).partial("./view/items/create.hbs");
}

export function postCreate(ctx) {
  const { name, imageURL, description, type } = ctx.params;
  const creator = sessionStorage.getItem("user");

  if (!name || !imageURL || !description || !type) {
    return alert('Please fill all the fields');
  }

  create({ name, imageURL, description, type, creator, count: 0, usersWhoCounted: [] })
    .then((res) => {
      ctx.redirect("#/home");
    })
    .catch((e) => console.log(e));
}

export function getDetail(ctx) {
  setHeader(ctx);
  const id = ctx.params.id;

  get(id) //
    .then((res) => {
      const item = { ...res.data(), id: res.id };
      ctx.isCreator = item.creator === sessionStorage.getItem("user");

      const currentUser = sessionStorage.getItem("user");
      if (item.usersWhoCounted.includes(currentUser)) {
        ctx.isAlreadyCounted = true;
      } else {
        ctx.isAlreadyCounted = false;
      }

      ctx.item = item;
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
  const { name, imageURL, description, type } = ctx.params;
  const id = ctx.params.id;

  if (!name || !imageURL || !description || !type) {
    return alert('Please fill all the fields');
  }

  update(id, { name, imageURL, description, type })
    .then((res) => {
      ctx.redirect(`#/details/${id}`);
    })
    .catch((e) => console.log(e));
}

export function getDelete(ctx) {
  const id = ctx.params.id;
  const confirmed = confirm("Are you sure that you want to delete this?");

  if (confirmed) {
    erase(id)
      .then((res) => {
        ctx.redirect("#/home");
      })
      .catch((e) => console.log(e));
  }
}

export function getCount(ctx) {
  const id = ctx.params.id;

  get(id)
    .then((res) => {
      const item = res.data();
      const currentUser = sessionStorage.getItem("user");
      const usersWhoCounted = item.usersWhoCounted;

      if (!usersWhoCounted.includes(currentUser)) {
        const count = item.count + 1;
        usersWhoCounted.push(currentUser);

        update(id, { count, usersWhoCounted })
          .then(() => {
            ctx.redirect(`#/details/${id}`);
          })
          .catch(e => console.log(e));
      }
    })
    .catch((e) => console.log(e));
}
