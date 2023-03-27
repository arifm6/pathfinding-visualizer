const tutorialInfo = [
  {
    header: "Welcome to my Pathfinding Visualizer",
    subheader:
      "This tutorial will briefly walk you through the features of this application",
    description:
      'You can always skip this by hitting the "Skip Tutorial button."',
    image: "./pathfinding.png",
    imageAlt: "pathfinding logo",
  },
  {
    header: "A little pathfinding background",
    subheader:
      "A pathfinding program is an application that takes two points on a plane and finds the shortest path between those two points",
    description:
      "In the real world, you may be unaware that you are using some sort of pathfinding algorithms when you use applications such as google maps or a GPS. This application however, finds the shortest path on a 2D grid.",
    image: "./pathfinding-map.webp",
    imageAlt: "pathfinding map",
  },
  {
    header: "Choosing a pathfinding algorithm",
    subheader:
      'You can choose a pathfinding algorithm from the "Algorithms" drop-down',
    description:
      "Pathfinding algorithms calculate the shortest distance between two nodes in a variety of ways. Some algorithms may be unweighted which means they do not consider the cost to travel between weighted nodes. Not all algorithms guarantee the shortest path and bidirectional algorithms are not weighted.",
    image: "./algorithms-dropdown.jpg",
    imageAlt: "algorithms-dropdown",
  },
  {
    header: "Bidirectional Algorithms",
    subheader:
      "You can select whether you would like to search bidirectionally or not.",
    description:
      "Bidirectional search uses both the start and end point to try and find a path that meet in the middle. Although they can be just as effective as their unidirectional counterpart, they may have trouble finding the shortest path when weights are involved.",
    image: "./bidirectional.webp",
    imageAlt: "bidirectional",
  },
  {
    header: "Mazes",
    subheader:
      "You can choose from a maze generation algorithm to quickly develop a prebuilt board",
    description:
      "There are a variety of maze generation algorithms that you can use to build a board and test our algorithms.",
    image: "./maze.webp",
    imageAlt: "maze",
  },
  {
    header: "Adding a carrot",
    subheader: 'Click "Add Carrot" ',
    description:
      "You can add a carrot to the board to have an additional end destination. The algorithm will first try to find the closest path to the carrot node (from the start), and will then look for the closest path to the finish node (from the carrot)",
    image: "./carrot.png",
    imageAlt: "carrot",
  },
  {
    header: "Obstacles",
    subheader:
      "Click (and drag) on the grid to add an obstacle. You can change the current obstacle in the navigation bar ",
    description:
      "Walls block paths and weights have an added cost to traverse through that node. It costs 16 units to pass through a weight and 1 unit to pass through an empty node",
    image: "./obstacles.gif",
    imageAlt: "obstacles animation",
  },
  {
    header: "Dragging Nodes",
    subheader: "Click (and drag) permanent nodes to move them ",
    description:
      "You can drag, add, or remove nodes after an algorithm has finished running to instantly see the new results",
    image: "./dragging-nodes.gif",
    imageAlt: "dragging nodes",
  },
  {
    header: "Other features",
    subheader: "Use the navigation bar to explore all the possible features  ",
    description:
      "You can also reset the board, change the animation speed, and visualize the pathfinding algorithms using the navigation bar. Some of these interact with each other so feel free to explore and try different combinations!",
    image: "./other-features.png",
    imageAlt: "other features navigation bar",
  },
];
export default tutorialInfo;
