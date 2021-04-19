import commonPartial from "./partials.js";
import { setHeader } from "./auth.js";
import { getAll } from "../models/items.js";

export function getHome(ctx) {
  setHeader(ctx);

  getAll() //
    .then((res) => {
      // console.log(res.docs[0].data());
      const items = res.docs.map((x) => (x = { ...x.data(), id: x.id })).sort((a, b) => b.count - a.count);
      // console.log(items);
      ctx.items = items;
      ctx.loadPartials(commonPartial).partial("./view/home.hbs");
    });
}
