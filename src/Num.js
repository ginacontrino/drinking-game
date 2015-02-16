module.exports = Num;

/**
 * Takes a number and stores it in this.number
 *
 * @param a number
 *
 */
function Num(number) {
  this.number = +number;
}


/**
 * Tells you if this.number(prototype Num())is a positive integer
 *
 */
Num.prototype.isPositiveInteger = function()
{
  if (isNaN(this.number)) {
    return false;
  }

  return this.isWholeNumber() && this.number > 0;

};


/**
 * !== isPositiveInteger
 *
 */
Num.prototype.isNotPositiveInteger = function()
{
  return !this.isPositiveInteger();
};


/**
 * Tells you if this.number(prototype Num()) is a whole number
 *
 */
Num.prototype.isWholeNumber = function()
{
  return this.number % 1 === 0;
};


/**
 * Gets the number from prototype Num()
 *
 */
Num.prototype.get = function() {

  return this.number;
};
