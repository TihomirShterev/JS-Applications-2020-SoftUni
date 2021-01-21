import commonPartial from "./partials.js";
import { setHeader } from "./auth.js";
import { getAll } from "../models/items.js";

export function getDashboard(ctx) {
  setHeader(ctx);

  getAll() //
    .then(res => {
      // console.log(res.docs[0].data());
      const items = res.docs.map(x => (x = { ...x.data(), id: x.id }));
      ctx.items = items;
      // console.log(ctx.items);
      // ctx.isCreator = ctx.items.creator === sessionStorage.getItem("user");
      ctx.loadPartials(commonPartial).partial("./view/dashboard.hbs");
    });
}
