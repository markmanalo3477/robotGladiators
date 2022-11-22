// Game States
// "WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robots
//    * Defeat each enemy robot
// "LOSE" - Player robot-s health is zero or less

var fightOrSkip = function() {
    //ask user if they would like to fight or skip using function
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
  
    // Conditional Recursive Function Call
    if (promptFight === "" || promptFight === null) {
      window.alert("You need to provide a valid answer! Please try again.");
      return fightOrSkip();
    }
  
    promptFight = promptFight.toLowerCase(); // makes input of prompt fight or skip all lowercase
  
    if (promptFight === "skip") {
      // confirm user wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");
      // if yes, (true), leave fight
      if (confirmSkip) {
        window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
        // subtract money from playerInfo.money for skipping, but don't let them go into the negative
        playerInfo.money = Math.max(0, playerInfo.money - 10);
       
        // return true if user wants to leave
        return true;
      } 
      else {
        return false;
      }   
    }
  };
  
  var fight = function(enemy) {
    // keep track of who goes first
    var isPlayerTurn = true;
      // randomly change turn order
      if (Math.random() > 0.5) {
        isPlayerTurn = false;
      }  
  
      // repeat and execute as long as the player is alive
      while(playerInfo.health > 0 && enemy.health > 0) {
        if (isPlayerTurn) {
        // ask user if they would like to fight or skip using fightOrSkip function
        if (fightOrSkip()) {
          // if true, leave fight by breaking loop
          break;
        }
        
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
  
        //remove enemy's health by subtracting the amount we set in the damage variable
        enemy.health = Math.max(0, enemy.health - damage);
  
        // Log a resulting message to the console so we know that it worked.
        console.log(
          playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
        );
     
        // Check enemy's health
        if (enemy.health <= 0) {
          window.alert(enemy.name + " has died!");
          
          //award player money for winning
          playerInfo.money = playerInfo.money + 20;
  
          //exit while loop if enemy.health goes below 0 (enemy is dead)
          break;
        } else {
          window.alert(enemy.name + " still has " + enemy.health + " health left. ");
        }
  
        // player gets attacked first
      } else {
  
        // Remove player's health by subtracting the amount set in the enemy.attack variable
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
  
        //remove enemy's health by subtracting the amount we set in the damage variable
        playerInfo.health = Math.max(0, playerInfo.health - damage);
  
        // Log a resulting message to the console so we know that it worked.
        console.log(
          enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
        );
  
        // check player's health
        if (playerInfo.health <= 0) {
          window.alert(playerInfo.name + " has died!");
          //exit while loop if playerInfo.health goes below 0 (player is dead)
          break;
        } else {
          window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
      } 
      // switch turn order for the next round
      isPlayerTurn = !isPlayerTurn;
    }   
  };
  
  //call the function with a for loop
  var startGame = function() {
    // reset player stats
    playerInfo.reset();
  
    for (var i = 0; i < enemyInfo.length; i++) {
    // check on the state of the player robot's health
    if (playerInfo.health > 0) {
      //let user know what round they are in, remember that arrays start at 0, so it needs to have 1 added to it
      window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ) );
          
      //pick new enemy to fight based on the index of the enemyNames array
      var pickedEnemyObj = enemyInfo[i];
  
      //reset enemy.health before starting new fight
      pickedEnemyObj.health = randomNumber(40, 60);
  
      //pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
      fight(pickedEnemyObj);
  
      // if player is still alive and we're not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        //ask if user wants to use the store before the next round
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
  
        // if yes, take them to the store() function
        if (storeConfirm) {
          shop();
        }  
      }
    }
  
      if (playerInfo.health <= 0) {
        window.alert("You have lost your robot in battle! Game Over!");
        break;
      }
    }
   
    // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
  };
  
  //function to end the entire game
  var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");
  
    // check localStorage for high score, if it's not there, use 0
    var highScore = localStorage.getItem("highscore");
      if (highScore === null) {
        highScore = 0;
      }
      // if player has more money than the high score, player has new high score
      if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money)
        localStorage.setItem("name", playerInfo.name);
        // report current high score
        alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
      } else {
        alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
      }  
        
      // ask the player if they would like to play again
      var playAgainConfirm = window.confirm("Would you like to play again?");
  
      if (playAgainConfirm) {
        startGame();
      }
      else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
      }
  };
  
  var shop = function() {
    // ask player what they would like to do
    var shopOptionPrompt = window.prompt(
      "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."  
    );
  
    // converts string from window.prompt to an integer that will work in the upcoming switch
    shopOptionPrompt = parseInt(shopOptionPrompt); 
  
    //use switch to carry out action where 1 is refill, 2 is upgrade, 3 is leave
    switch (shopOptionPrompt) {
      case 1:
        playerInfo.refillHealth();
        break;
  
      case 2:
        playerInfo.upgradeAttack();
        break;
  
      case 3:
        window.alert("Leaving the store.");
  
        // do nothing, so function will end
        break;
  
      default:
        window.alert("You did not pick a valid option. Try again");
  
        // call shop() again to force player to pick a valid option
        shop();
        break;
    }
  };
  
  //function to generate a random numeric value
  var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
  
    return value;
  };
  
  // function to set name
  var getPlayerName = function() {
    var name = "";
  
  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }
    console.log("Your robot's name is " + name);
    return name;
  };
  
  // objects playerInfo and enemyInfo moved to bottom. All objects should be at bottom directly before functions are called to ensure all functions are defined before other objects or methods try to use them.
  var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
      this.health = 100;
      this.money = 10;
      this.attack = 10;
    }, // comma, not semicolon or it will break!
    refillHealth: function() {
      if (this.money >= 7) {
        window.alert("Refilling player's health by 20 for 7 dollars");
        this.health += 20;
        this.money -= 7;
      }
      else {
        window.alert("You don't have enough money!");
      }  
    },
    upgradeAttack: function() {
      if (this.money >= 7) {
        window.alert("Upgrading player's attack by 6 for 7 dollars.");
        this.attack += 6;
        this.money -= 7;
      }
      else {
        window.alert("You don't have enough money!");
      }
    }  
  };
  
  // object enemyInfo
  var enemyInfo = [
    {
      name: "Roborto",
      attack: randomNumber(10, 14)
    },
    {
      name: "Amy Android",
      attack: randomNumber(10, 14)
    },
    {
      name: "Robo Trumble",
      attack: randomNumber(10, 14)
    }
  ];
  
  //start the game when the page loads
  startGame();