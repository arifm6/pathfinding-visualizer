import util from "../utils";
import heuristic from "./heuristic";
import aStar from "./aStar";
var Heap = require("heap");
export default function greedyBestFirst(options) {
  aStar.call(this, options);

  this.heuristic = heuristic.greedyBestFirst;
  //we are conflating the heuristic by so much so that any addition of weights is negligible. technically this is not
  //bestFirst but it should do the trick in our case.
}
greedyBestFirst.prototype = new aStar();
greedyBestFirst.prototype.constructor = greedyBestFirst;
