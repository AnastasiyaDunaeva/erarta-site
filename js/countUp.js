import { CountUp } from "./countUp.min.js";

var options = {
  useEasing: true,
  useGrouping: true,
  separator: "",
  decimal: ".",
  prefix: "",
  suffix: "",
};

window.onload = function () {
  var countUp40 = new CountUp("num40", 40, options);
  countUp40.start();
  var countUp2800 = new CountUp("num2800", 2800, options);
  countUp2800.start();
  var countUp8 = new CountUp("num8", 8, options);
  countUp8.start();
  var countUp10k = new CountUp("num10k", 10000, options);
  countUp10k.start();
};
