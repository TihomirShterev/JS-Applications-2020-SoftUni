import commonPartial from "./partials.js";
import { setHeader } from "./auth.js";
import { getAll } from "../models/items.js";

export function getHome(ctx) {
  setHeader(ctx);

  // // за да покажем в home page-а списъка със създадените items
  getAll() //
    .then((res) => {
      // console.log(res); // за да проверим какво има в обекта и да вземем необходимия масив със създадените items
      // console.log(res.docs[0].data());
      const items = res.docs.map((x) => (x = { ...x.data(), id: x.id })); // за да създадем масив с обекти(items), които съдържат необходимите пропъртита
      // console.log(items);
      ctx.items = items; // за да можем да използваме създадените items в home.hbs
      ctx.loadPartials(commonPartial).partial("./view/home.hbs");
    });
}
