#! /usr/local/bin/node

/*
   Play Game File
   ==============

   Play the game simply by entering:

     > node playGame.js

*/


// requirements
var Game     = require('./src/Game');
var argv     = require('minimist')(process.argv.slice(2));
var chalk    = require('chalk');
var readline = require('readline');
var rl       = readline.createInterface(process.stdin, process.stdout);




// override messages by writing one of the existing keys and adding your own
// message or color if you want
var messages = {
  // "correct_number": chalk.red("%s") +" 맞네!! 마셔라 마셔라!!!\n",
  "bigger_than_secret":  "No drink for you. " + chalk.red("Lower!"),
  "smaller_than_secret": "No drink for you. " + chalk.red("Higher!")
};




function startTheGame() {
  game = new Game(argv.max);
  game.setMessages(messages);
  console.log( chalk.cyan('Guess the secret number between 1 and ' + game.getMaxNumber()));

}

startTheGame();

rl.setPrompt('Your guess: ');


rl.prompt();

rl.on('line', function(line) {

    result = game.play(line);

    if ( result.haveADrinkColor ) {
      // color any result with calk.somecolor()
      console.log(  chalk.magenta(result.message) );
    }
    else
    {
      console.log( result.message );
    }

    if ( result.gameover === true) {
      startTheGame();
    }



    rl.prompt();

});


rl.on('close', function() {
  rl.setPrompt('');
  console.log('Already too drunk?! Come on!');
  process.exit(0);
});
