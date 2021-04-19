import commonPartial from "./partials.js";
import { setHeader } from "./auth.js";
import { getAll } from "../models/items.js";

export function getHome(ctx) {
  setHeader(ctx);

  getAll() //
    .then((res) => {
      const items = res.docs.map((x) => (x = { ...x.data(), id: x.id }));
      ctx.items = items;
      ctx.loadPartials(commonPartial).partial("./view/home.hbs");
    });
}
