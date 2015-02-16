var random = require("random-js")(); // uses the nativeMath engine

module.exports = new RandomNumberGenator();
function RandomNumberGenator () {}


RandomNumberGenator.prototype.generateWithinRange = function(minimum, maximum)
{
  return random.integer(minimum, maximum);

};
