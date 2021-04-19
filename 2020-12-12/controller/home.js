import commonPartial from "./partials.js";
import { setHeader } from "./auth.js";
import { getAll } from "../models/items.js";

export function getHome(ctx) {
  setHeader(ctx);

  // // за да покажем в home page-а списъка със създадените динамични items. Разкоментирам във втората половина от задачата
  // getAll() //
  //   .then((res) => {
  //     // console.log(res); // за да проверим какво има в обекта и да вземем необходимия масив със създадените items
  //     // console.log(res.docs[0].data());
  //     const items = res.docs.map((x) => (x = { ...x.data(), id: x.id }));
  //     //       const items = res.docs.map((x) => (x = { ...x.data(), id: x.id })).sort((a, b) => b.count - a.count); // разкоментиране само ако се изисква сортиране
  //     // console.log(items);
  //     ctx.items = items; // за да можем да използваме пропъртитата в home.hbs
  ctx.loadPartials(commonPartial).partial("./view/home.hbs");
  //   });
}
