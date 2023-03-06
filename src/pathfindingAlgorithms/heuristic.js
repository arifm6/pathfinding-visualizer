module.exports = {
  manhattan: function (dx, dy) {
    return dx + dy;
  },
  none: function () {
    return 0;
  },
  greedyBestFirst: function (dx, dy) {
    return 9999999 * (dx + dy);
  },
};
