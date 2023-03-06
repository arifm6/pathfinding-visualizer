import aStar from "./aStar";
import heuristic from "./heuristic";
export default function dijkstra(options) {
  aStar.call(this, options);
  this.heuristic = heuristic.none;
}
dijkstra.prototype = new aStar();
dijkstra.prototype.constructor = dijkstra;
