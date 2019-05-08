import { join } from "lodash-es";
import a from "@/a";
import b from "@/b";
// import $ from "jquery";
import click from "@/click";

import "@/styles/base.css";
import "@/styles/main.scss";

import "@/fonts/iconfont.css";

// console.log(a);

// console.log(b);

console.log($(document.body));

console.log(join(["a", "b", "c"]));

// console.log(click);

console.log(jQuery);

$("#ProvidePlugin").addClass("new");

jQuery("#ProvidePlugin").addClass("old");

document.addEventListener("click", () => {
  click.then(func => {
    func();
  });
});

$.get(
  "/comments/hotflow",
  {
    id: "4263554020904293",
    mid: "4263554020904293",
    max_id_type: "0"
  },
  function(data) {
    console.log(data);
  }
);

if (module.hot) {
  // 检测是否有模块热更新
  module.hot.accept("./a.js", function() {
    // 针对被更新的模块, 进行进一步操作
    console.log("/a.js is changed");
  });
}
