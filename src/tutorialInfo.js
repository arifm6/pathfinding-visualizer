export default [
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
    image: "./pathfinding-map.png",
    imageAlt: "pathfinding map",
  },
  {
    header: "Choosing a pathfinding algorithm",
    subheader:
      'You can choose a pathfinding algorithm from the "Algorithms" drop-down',
    description:
      "Pathfinding algorithms calculate the shortest distance between two nodes in a variety of ways. Some algorithms may be unweighted which means they do not consider the cost to travel between weighted nodes. Not all algorithms guarantee the shortest path and bidirectional algorithms are not weighted.",
    image: "./algorithms-dropdown.png",
    imageAlt: "algorithms-dropdown",
  },
];
