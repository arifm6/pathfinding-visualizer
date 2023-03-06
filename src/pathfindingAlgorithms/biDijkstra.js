import biAStar from "./biAStar";
import heuristic from "./heuristic";
export default function biDijkstra(options) {
  biAStar.call(this, options);
  this.heuristic = heuristic.none;
}
biDijkstra.prototype = new biAStar();
biDijkstra.prototype.constructor = biDijkstra;
