import biAStar from "./biAStar";
import heuristic from "./heuristic";
export default function biGreedyBestFirst(options) {
  biAStar.call(this, options);
  this.heuristic = heuristic.greedyBestFirst;
}
biGreedyBestFirst.prototype = new biAStar();
biGreedyBestFirst.prototype.constructor = biGreedyBestFirst;
