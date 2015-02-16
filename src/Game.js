var Num = require('./Num');
var RandomNumberGenator = require('./RandomNumberGenator');
var util = require('util');
var extend = require('node.extend');


module.exports = Game;


/**
 * Prototype for the Game
 *
 * @param integer maxNumber
 * @param integer secretNumber
 *
 */
function Game(max, secretNumber) {

  this.guessNumber = null;
  this.defaultMaxNumber = 100;


  this.setMaxNumber(max);


  this.lowerBound = 0;
  this.upperBound = this.getMaxNumber() + 1;

  this.secretNumber = secretNumber || RandomNumberGenator.generateWithinRange(1, this.getMaxNumber());

  this.message = {
    "invalid_number" :     "Penalty! Finish your drink! Your guess must be a positive whole number.",
    "outside_max_range":   "Penalty! Finish your drink! Your number must be between 1 and %s.",
    "below_lower_bound":   "...But I already told you the secret number was higher!... penalty drink!",
    "above_upper_bound":   "Drunk?... I already told you the secret number was lower! penalty drink! :P",
    "bigger_than_secret":  "No drink for you. Lower!",
    "smaller_than_secret": "No drink for you. Higher!",
    "correct_number":      "Oh no! Number %s. Have a drink! Whoooooo!\n"
  };

}



/**
* Sets the messages
*
* @param string customMessages
* @return this
*/
Game.prototype.setMessages = function(customMessages) {

  extend(this.message, customMessages);
  return this;

};



/**
* Gets the messages
*
* @return string
*/
Game.prototype.getMessages = function() {

  return this.message;

};



/**
 * Sets the max number
 *
 * @param integer maxNumber
 * @return this
 */
Game.prototype.setMaxNumber = function(maxNumber) {

  maxNumber = maxNumber || this.defaultMaxNumber;

  this.maxNumber = new Num(maxNumber);

  return this;

};



/**
 * Gets the max number
 *
 * @return integer
 */
Game.prototype.getMaxNumber = function() {

  return this.maxNumber.get();

};



/**
 * Sets the guessed number
 *
 * @param integer guessNumber
 * @return this
 */
Game.prototype.setGuessNumber = function(guessNumber) {

  this.guessNumber = new Num(guessNumber);

  this.updateUpperAndLowerBounds();

  return this;
};



/**
 * Gets the guessed number
 *
 * @return integer
 */
Game.prototype.getGuessNumber = function() {

  return this.guessNumber.get();

};



/**
 * Updates the upper and lower bounds (min and max range) of the game
 *
 */
Game.prototype.updateUpperAndLowerBounds = function() {

  if ( this.getGuessNumber() > this.lowerBound && this.guessIsSmallerThanSecretNumber())
  {
    this.lowerBound = this.getGuessNumber();

  }
  else if ( this.getGuessNumber() < this.upperBound && this.guessIsBiggerThanSecretNumber())
  {
    this.upperBound = this.getGuessNumber();
  }

};



/**
 * Tells if guess is below the lower bound
 *
 * @return boolean
 */
Game.prototype.guessIsBelowLowerBound = function() {

  return this.getGuessNumber() < this.lowerBound;

};



/**
 * Tells if guess is above the upper bound
 *
 * @return boolean
 */
Game.prototype.guessIsAboveUpperBound = function() {

  return this.getGuessNumber() > this.upperBound;

};



/**
 * Tells if guess is bigger than the secret number
 *
 * @return boolean
 */
Game.prototype.guessIsBiggerThanSecretNumber = function() {

  return this.getGuessNumber()>this.secretNumber;

};



/**
 * Tells if guess is smaller than the secret number
 *
 * @return boolean
 */
Game.prototype.guessIsSmallerThanSecretNumber = function() {

  return this.getGuessNumber()<this.secretNumber;

};



/**
 * Tells if guess is outside of the maximum range
 *
 * @return boolean
 */
Game.prototype.guessIsOutsideOfMaxRange = function() {

  return this.getGuessNumber()>this.getMaxNumber() || this.getGuessNumber() < 1;

};



/**
 * Tells if guess is invalid number
 *
 * @return boolean
 */
Game.prototype.guessIsInvalidNumber = function() {

  return this.guessNumber.isNotPositiveInteger();

};



/**
 * Plays the game
 *
 * @param integer guessNumber
 */
Game.prototype.play = function(guessNumber) {

  this.setGuessNumber(guessNumber);
  return this.compareGuessNumberToSecretNumber();

};




/**
 * Tells you if the number you entered is equal
 * to the secret number
 *
 */
Game.prototype.compareGuessNumberToSecretNumber = function() {

  if (this.guessIsInvalidNumber())
  {
    return {
      'message': this.message["invalid_number"],
      'gameover': false
    };
  }

  // if guessed number is too high or too low return have a drink
  if (this.guessIsOutsideOfMaxRange())
  {
    return { // Penalty! Finish your drink! Your number must be between 1 and %s.
      'message': util.format(this.message["outside_max_range"], this.getMaxNumber()),
      'gameover': false
    };
  }


  if (this.guessIsBelowLowerBound())
  {
    return {
      'message': this.message["below_lower_bound"],
      'gameover': false
    };
  }


  if (this.guessIsAboveUpperBound())
  {
    return {
      'message': this.message["above_upper_bound"],
      'gameover': false
    };
  }


  if  (this.guessIsBiggerThanSecretNumber())
  {
    return {
      'message': (this.message["bigger_than_secret"]),
      'gameover': false,
    };
  }


  if (this.guessIsSmallerThanSecretNumber())
  {
    return {
      'message': this.message["smaller_than_secret"],
      'gameover': false
    };
  }


  // otherwise the guessed number equals the secret number return winner
  return {
    'message': util.format(this.message["correct_number"], this.getGuessNumber()),
    'gameover': true,
    'haveADrinkColor': 'choose a color'
  };

};
