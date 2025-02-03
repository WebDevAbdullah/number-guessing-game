import inquirer from "inquirer";

class NumberGuessingGame {
  private chances: number = 0;
  private numberToGuess: number;
  private attempts: number = 0;

  constructor() {
    this.numberToGuess = Math.floor(Math.random() * 100) + 1;
  }

  private welcome(): void {
    console.log("Welcome to the Number Guessing Game!");
    console.log("I'm thinking of a number between 1 and 100.");
    console.log("You have to guess the correct number.");
  }

  private async selectDifficulty(): Promise<void> {
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "difficulty",
        message: "Select a Difficulty level:",
        choices: ["Easy (10 chances)", "Medium (5 chances)", "Hard (3 chances)"],
      },
    ]);

    switch (answer.difficulty) {
      case "Easy (10 chances)":
        this.chances = 10;
        break;
      case "Medium (5 chances)":
        this.chances = 5;
        break;
      case "Hard (3 chances)":
        this.chances = 3;
        break;
    }
  }

  private async guessNumber(): Promise<boolean> {
    while (this.attempts < this.chances) {
      const answer = await inquirer.prompt([
        {
          type: "input",
          name: "guess",
          message: `Enter your guess:`,
        },
      ]);

      const guess: number = parseInt(answer.guess, 10);

      if (guess === this.numberToGuess) {
        return true;
      } else if (guess < this.numberToGuess) {
        console.log("Try a higher number.\n");
      } else {
        console.log("Try a lower number.\n");
      }

      this.attempts++;
    }

    return false;
  }

  private printResult(result: boolean): void {
    if (result) {
      const totalAttempts = this.attempts + 1;
      console.log(`Congratulations! You guessed the correct number in ${totalAttempts} attempt${totalAttempts === 1 ? "" : "s"}.`);
    } else {
      console.log(`You ran out of chances. The correct number was ${this.numberToGuess}.`);
    }
  }

  private async play(): Promise<void> {
    this.attempts = 0;
    this.numberToGuess = Math.floor(Math.random() * 100) + 1;
    console.clear();
    console.log("\n");
    await this.selectDifficulty();
    console.log("\n");
    const result = await this.guessNumber();
    console.log("\n");
    this.printResult(result);
    console.log("\n");
  }

  public async startGame(): Promise<void> {
    this.welcome();

    let playAgain: boolean = true;

    while (playAgain) {
      await this.play();
      const answer = await inquirer.prompt([
        {
          type: "confirm",
          name: "playAgain",
          message: "Do you want to play again? (Y/N)",
        },
      ]);

      playAgain = answer.playAgain;
    }
  }
}

// Create an instance of the NumberGuessingGame class
const numberGuessingGame: NumberGuessingGame = new NumberGuessingGame();

numberGuessingGame.startGame();
