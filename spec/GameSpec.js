var Game = require('../src/Game');
var readline = require('readline');
var rl       = readline.createInterface(process.stdin, process.stdout);
var chalk    = require('chalk');



  it("should tell me not to drink if i guess the wrong number", function(){

    // assemble
    var guess = 6;
    var secret = 3;

    // act
    var game = new Game(7,secret);

    var expectedResult = "No drink for you. Lower!";
    var test = game.play(guess).message;

    // assert
    expect(test).toBe(expectedResult);

  });


  it("should tell me to drink if i guess the right number", function(){

    // assemble
    var guess = 6;
    var secret = 6;

    // act
    var game = new Game(7,secret);

    var expectedResult = "Oh no! Number 6. Have a drink! Whoooooo!\n";
    var test = game.play(guess).message;

    // assert
    expect(test).toBe(expectedResult);


  });

  it("should tell me to drink if i don't type in a number", function(){

    // assemble
    var guess = "skff";

    // act
    var game = new Game(7);

    var expectedResult = "Penalty! Finish your drink! Your guess must be a positive whole number.";
    var test = game.play(guess).message;

    // assert
    expect(test).toBe(expectedResult);


  });

  it("should tell me not to drink if i type in a number higher than the max number", function(){

    // assemble
    var game = new Game(10);
    var guess = 11;

    // act
    var expectedResult = "Penalty! Finish your drink! Your number must be between 1 and 10.";
    var test = game.play(guess).message;

    // assert
    expect(test).toBe(expectedResult);

  });

  it("", function() {

    // assemble
    var guess = 6;
    var secret = 6;

    // act
    var game = new Game(7,secret);

    var expectedResult = 'choose a color';
    var test = game.play(guess).haveADrinkColor;

    // assert
    expect(test).toBe(expectedResult);


  });

  it("should save the lowest and highest guessed number in a bound", function() {

    // assemble
    var secret = 4;
    var game   = new Game(10, secret);


    // Play a round guessing 3 (game should say "higher":
    game.play(3);
    game.play(2);

    // assert
    expect(game.guessIsBelowLowerBound()).toBe(true);

    // Play a round guessing 5 (game should say "lower":
    game.play(5);
    game.play(6);

    // assert
    expect(game.guessIsAboveUpperBound()).toBe(true);


  });


  it("should save the merge messages", function() {

    // assemble
    var replace = {
      "invalid_number":     "Penalty!",
    };

    // act
    var game = new Game();


    var originalMessages = {
      "invalid_number":      "Penalty! Finish your drink! Your guess must be a positive whole number.",
      "outside_max_range":   "Penalty! Finish your drink! Your number must be between 1 and %s.",
      "below_lower_bound":   "...But I already told you the secret number was higher!... penalty drink!",
      "above_upper_bound":   "Drunk?... I already told you the secret number was lower! penalty drink! :P",
      "bigger_than_secret":  "No drink for you. Lower!",
      "smaller_than_secret": "No drink for you. Higher!",
      "correct_number":      "Oh no! Number %s. Have a drink! Whoooooo!\n"
    };

    // assert
    expect(game.getMessages()).toEqual(originalMessages);

    var customisedMessages = {
      "invalid_number":      "Penalty!",
      "outside_max_range":   "Penalty! Finish your drink! Your number must be between 1 and %s.",
      "below_lower_bound":   "...But I already told you the secret number was higher!... penalty drink!",
      "above_upper_bound":   "Drunk?... I already told you the secret number was lower! penalty drink! :P",
      "bigger_than_secret":  "No drink for you. Lower!",
      "smaller_than_secret": "No drink for you. Higher!",
      "correct_number":      "Oh no! Number %s. Have a drink! Whoooooo!\n"
    };

    // act
    game.setMessages(replace);

    // assert
    expect(game.getMessages()).toEqual(customisedMessages);


  });
