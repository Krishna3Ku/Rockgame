/* All functions in this script have an ending of "_Fn" */
//* global variable declaration
let cardBody = document.getElementById( "cardBody" );
let howToPlay = document.getElementById( "howToPlay" );
let roundTracker = document.getElementById( "roundTracker" );
let helpInfo = document.getElementById( "helpInfo" );
let helpBtn = document.getElementById( "helpBtn" );
let currentRound = document.getElementById( "currentRound" );
let chosenRounds = document.getElementById( "chosenRounds" );
let human = document.getElementById( "human" );
let humanValue = document.getElementById( "humanValue" );
let comp = document.getElementById( "comp" );
let compValue = document.getElementById( "compValue" );
let outcomeMessage = document.getElementById( "outcomeMessage" );
let startGame = document.getElementById( "startGame" );
let resetScore = document.getElementById( "resetScore" );
let resetInfo = document.getElementById( "resetInfo" );
let resetBtn = document.getElementById( "resetBtn" );
let restart = document.getElementById( "restart" );
let restartMsg = document.getElementById( "restartMsg" );
let yesRestart = document.getElementById( "yesRestart" );
let noRestart = document.getElementById( "noRestart" );
let reload = document.getElementById( "reload" );
let reloadBtn = document.getElementById( "reloadBtn" );
let gameBtns = document.getElementById( "gameBtns" );
let toggleHowToPlay = document.getElementById( "toggleHowToPlay" );
let rock = document.getElementById( "rock" );
let paper = document.getElementById( "paper" );
let scissors = document.getElementById( "scissors" );
let social = document.getElementById( "social" );
let footer = document.getElementById( "footer" );
let humanScore = 0;
let computerScore = 0;
let winAmount = 3;
let drawAmount = 1;
let playerSelection;
let computerSelection;
let texToDisplay = "";
let progressTracker = 0;
currentRound.innerHTML = progressTracker;
chosenRounds.innerHTML = 10;
let roundOutcome = {
  computer: undefined,
  player: undefined
};
//show help message
let showHelp_Fn = () => {
  (helpInfo.style.display !== "block") ? helpInfo.style.display = "block" 
  : helpInfo.style.display = "none";
}
//function to get computer selection
function computerPlay_Fn() {
  computerSelection = Number( Math.floor( Math.random() * 10 ) );
    if ( computerSelection <= 3 ) return ( "PAPER" );
      else if ( ( computerSelection > 3 ) && ( computerSelection <= 6 ) ) return ( "SCISSORS" );
        else return ( "ROCK" );
}
//play one round and return the result
function playRound_Fn( computerSelection, playerSelection ) {
  //todo can this be minimized by switch case?
  //check if computer won
  if ( ( computerSelection === "ROCK" ) && ( playerSelection === "SCISSORS" ) ) {
    computerScore += winAmount; // * Consider a function that to these two lines
    progressTracker += 1;
    currentRound.innerHTML = progressTracker;
    texToDisplay = `Computer won! ${computerSelection} crushes ${playerSelection}`;
      return texToDisplay;

  } else if ( ( computerSelection === "SCISSORS" ) && ( playerSelection === "PAPER" ) ) {
    computerScore += winAmount;
    progressTracker += 1;
    currentRound.innerHTML = progressTracker;
    texToDisplay = `Computer won! ${computerSelection} cuts ${playerSelection} into pieces`;
      return texToDisplay;

  } else if ( ( computerSelection === "PAPER" ) && ( playerSelection === "ROCK" ) ) {
    computerScore += winAmount;
    progressTracker += 1;
    currentRound.innerHTML = progressTracker;
    texToDisplay = `Computer won! ${computerSelection} covers ${playerSelection}`;
      return texToDisplay;

  }
  //check if human won
  if ( ( playerSelection === "ROCK" ) && ( computerSelection === "SCISSORS" ) ) {
    humanScore += winAmount;
    progressTracker += 1;
    currentRound.innerHTML = progressTracker;
    texToDisplay = `Wow!! Your ${playerSelection} smashes ${computerSelection}. YOU WIN`;
      return texToDisplay;

  } else if ( ( playerSelection === "SCISSORS" ) && ( computerSelection === "PAPER" ) ) {
    humanScore += winAmount;
    progressTracker += 1;
    currentRound.innerHTML = progressTracker;
    texToDisplay = `CONGRATULATIONS! ${playerSelection} cuts through ${computerSelection} easily`;
      return texToDisplay;

  } else if ( ( playerSelection === "PAPER" ) && ( computerSelection === "ROCK" ) ) {
    humanScore += winAmount;
    progressTracker += 1;
    currentRound.innerHTML = progressTracker;
    texToDisplay = `BINGO! ${playerSelection} actually covers ${computerSelection}`;
      return texToDisplay;

  } //check for a tie
  else if ( computerSelection === playerSelection ) {
    computerScore += drawAmount;
    humanScore += drawAmount;
    progressTracker += 1;
    currentRound.innerHTML = progressTracker;
    texToDisplay = `It's a DRAW! Tough round!`;
      return texToDisplay;

  } else return console.log( "Invalid entry" );
}

let showResetScore_Fn = () => {
  if ( progressTracker === 0 ) resetInfo.style.display = "block";
   else {
      outcomeMessage.style.minHeight = "min-content";
      humanScore = 0;
      humanValue.value = 0;
      computerScore = 0;
      compValue.value = 0;
      progressTracker = 0;
      currentRound.innerHTML = 0;
      outcomeMessage.innerHTML = "Score has been RESET";
    }
}
let getWinner_Fn = () => {
  if ( humanScore === computerScore ) return `It's a TIE`; 
    else return ( humanScore > computerScore ) ? `CONGRATULATIONS. You Won \nPlay Again?` : `Computer wins the round.\n Play Again?`;
  }
let playgame_Fn = ( clickedBtn ) => {
  playerSelection = clickedBtn.toUpperCase();
  roundOutcome.player = playerSelection;
  roundOutcome.computer = computerPlay_Fn();
  playRound_Fn( roundOutcome.computer, roundOutcome.player );
  humanValue.value = humanScore;
  compValue.value = computerScore;
  outcomeMessage.innerHTML = texToDisplay.toString();
  //if rounds played = 10, prompt the user to restart or not
    if ( progressTracker === 10 ) {
      outcomeMessage.style.minHeight = "min-content";
      footer.style.display = "none";
      gameBtns.style.display = "none";
      restart.classList.remove("hide");
      restartMsg.innerHTML = 
      `Game over. \nYou score ${humanScore} while Computer scores ${computerScore}.\n${getWinner_Fn()}`;
    }
}
let postGameMsg_Fn = () => {
  if ( humanScore > computerScore ) return "You WON";
  else if ( humanScore === computerScore ) return "It's a TIE";
  else return "You LOST";
}
let yesRestart_Fn = () => {
  location.reload( true );
}
let noRestart_Fn = () => {
  cardBody.style.height = "50vh";
  roundTracker.innerHTML = postGameMsg_Fn();
  restart.style.display = "none";
  humanScore = 0;
  computerScore = 0;
  progressTracker = 0;
  howToPlay.style.display = "none";
  reload.style.display = "block";
  outcomeMessage.innerHTML = "";
}
//button click functions
howToPlay.addEventListener( "click", showHelp_Fn );
helpBtn.addEventListener( "click", () => {
  helpInfo.style.display = "none"
} );
startGame.addEventListener( "click", () => {
  outcomeMessage.style.minHeight = "105px";
  footer.style.display = "block";
} );
resetScore.addEventListener( "click", showResetScore_Fn );
resetBtn.addEventListener( "click", () => {
  resetInfo.style.display = "none"
} );
yesRestart.addEventListener( "click", () => {
  location.reload( true ); 
} );
noRestart.addEventListener( "click", noRestart_Fn );
reloadBtn.addEventListener( "click", () => {
  location.reload( true );
} );
