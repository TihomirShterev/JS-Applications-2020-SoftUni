import commonPartial from "./partials.js";
import { setHeader } from "./auth.js";
import { create, get, update, erase } from "../models/items.js";
import { getAll } from "../models/items.js";

// export function getItems(ctx) {
//   setHeader(ctx);

//   // за да покажем в items page-а списъка със създадените динамични items. Разкоментирам във втората половина от задачата
//   getAll() //
//     .then(res => {
//       // console.log(res); // за да проверим какво има в обекта и да вземем необходимия масив със създадените items
//       // console.log(res.docs[0].data());
//       const items = res.docs.map(x => (x = { ...x.data(), id: x.id }));
//       //       const items = res.docs.map((x) => (x = { ...x.data(), id: x.id })).sort((a, b) => b.count - a.count); // разкоментиране само ако се изисква сортиране
//       // console.log(items);
//       ctx.items = items; // за да можем да използваме пропъртитата в items.hbs
//       ctx.loadPartials(commonPartial).partial("./view/items/items.hbs");
//     });
// }

export function getCreate(ctx) {
  setHeader(ctx);
  ctx.loadPartials(commonPartial).partial("./view/items/create.hbs");
}

export function postCreate(ctx) {
  const { product, description, price, pictureUrl } = ctx.params;
  // // add index (counter)
  // let index = 0
  // let itemList = [];
  // if (itemList.length > 0) {
  //   index++;
  // }
  const creator = sessionStorage.getItem("user");

  create({ index: 0, product, description, price, pictureUrl, creator, count: 0, usersWhoCounted: [] })
    .then(res => {
      // console.log(res);
      // itemList.push('item');
      ctx.redirect("#/dashboard");
    })
    .catch(e => console.log(e));
}

export function getEdit(ctx) {
  const id = ctx.params.id;

  get(id)
    .then(res => {
      const item = { ...res.data(), id: res.id };
      ctx.item = item;
      ctx.loadPartials(commonPartial).partial("./view/items/edit.hbs");
    })
    .catch(e => console.log(e));
}

export function postEdit(ctx) {
  const { product, description, price, pictureUrl } = ctx.params;
  const id = ctx.params.id;

  // променяме данните и пренасочваме
  update(id, { product, description, price, pictureUrl })
    .then(res => {
      // console.log(res);
      ctx.redirect("#/dashboard");
    })
    .catch(e => console.log(e));
}

export function getDelete(ctx) {
  setHeader(ctx);
  ctx.loadPartials(commonPartial).partial("./view/items/delete.hbs");
}

export function postDelete(ctx) {
  const id = ctx.params.id;

  erase(id)
    .then(res => {
      // console.log(res);
      ctx.redirect("#/dashboard");
    })
    .catch(e => console.log(e));
}
export function getDetail(ctx) {
  setHeader(ctx);
  const id = ctx.params.id;

  get(id) //
    .then(res => {
      const item = { ...res.data(), id: res.id }; // събираме необходимите пропъртита в обект
      // ctx.isCreator = item.creator === sessionStorage.getItem("user"); // ако създателят съвпада с текущия потребител ще ни върне true

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
    .catch(e => console.log(e));
}

/*
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
          ctx.redirect("#/dashboard");
        })
        .catch(e => console.log(e));
      // }
    })
    .catch((e) => console.log(e));
}
*/
