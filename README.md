# Pathfinding Visualizer

Welcome to my pathfinding visualizer. In this app, you can test various pathfinding algorithms with different mazes and settings to see how they work in real time. One thing to note is that this app uses many webp image formats so on unsupported browsers (namely ie), you will run into visual clarity issues. For a demo, you can visit [https://pathfinding-visualizer-arifm6.vercel.app/](https://pathfinding-visualizer-arifm6.vercel.app/). You can also clone the repo and run yarn start or npm start to view it on your local machine.

## The Algorithms

### `Dijkstra`

Dijkstra's algorithm is a weighted best first search algorithm that guarantees the shortest path. It calculates the shortest path by traversing the node that is closest to the current node and saving the path until it reaches the target node.

### `A*`

A* is another weighted pathfinding algorithm that uses a heuristic function to add more information to determine the shortest path. A* takes into account the distance from the current node (similar to dijkstra) as well as a heuristic function to determine what node to visit next. In this app, I used the manhattan (Taxicab) distance for the heuristic function.The first path that reaches the target node will always be the shortest path.

### `Greedy Best-First`

Greedy Best-First only uses a heuristic function to determine the next node to visit. In this app, I used the manhattan distance and so this search algorithm will not function for weighted searches.

### `Breadth First Search`

Breadth First Search is an unweighted search algorithm that searches all nodes at the current depth (or closest node) before moving on to the next depth.

## Bidirectional Search

Bidirectional search is a variant of a search algorithm in which both the start and target nodes are used simultaenously to determine the shortest path. In this app, bidirectional search guarantees shortest path (for algorithms that guarantee shortest path) except for in some edge cases of weighted graphs. I chose this because it makes the search faster on average at the cost of reliability in some cases.

## The Mazes

### `Recursive Division`

Recursive division is a subclass of maze generation algorithms that essentially functions as a wall adder. It essentially recursively goes through field and recursively adds walls in a manner that they do not interfere with each other.

### `Random Maze`

A simple random maze. Each node has a certain probability of having that obstacle type. Note that when weights are selected, the probability is greater.

### `Stair Maze`

A simple stair pattern on the board

## The Carrot Target

The carrot adds a second target node to the board. The search algorithm will first try to reach the carrot, and then the finish node.

## The Obstacles

### `Wall`

Walls are impassible objects. The search algorithm ignores these nodes.

### `Weight`

Weights have a cost associated to traversing through them. In this app, weights have a cost of 16 whereas regular nodes have a cost of 1. One can traverse 16 regular nodes for each weighted node.

## Animation Speeds

Animation speeds simply determine how fast the animation runs.
