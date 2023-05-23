var playerLifes;
playerLifes = 3;

function GameMenu() {
  var start;
  var menu;
  var play;
  var tutorial;
  var exit;
  var menuState;
  var menuOptions;
  var menuOptionIndex;

  start = document.getElementById("start-screen");
  menu = document.getElementById("menu-screen");
  play = document.getElementById("game-levelone");
  tutorial = document.getElementById("tutorial-screen");
  exit = document.getElementById("exit-screen");
  menuState = "start";
  menuOptions = menu.getElementsByTagName("li");
  menuOptionIndex = 0;

  menuOptions[menuOptionIndex].setAttribute("selected", "");

  function SelectMenuItem(index) {
    menuOptions[menuOptionIndex].removeAttribute("selected");
    menuOptionIndex = index;
    menuOptions[menuOptionIndex].setAttribute("selected", "");
  }

  function ShowGame() {
    menuState = "play";
    play.style.display = "flex";
    start.style.display = "none";
    menu.style.display = "none";
    tutorial.style.display = "none";
  }

  function ShowTutorialScreen() {
    menuState = "tutorial";
    start.style.display = "none";
    menu.style.display = "none";
    tutorial.style.display = "flex";
  }

  function ShowMenuScreen() {
    menuState = "menu";
    start.style.display = "none";
    tutorial.style.display = "none";
    menu.style.display = "block";
    for (var i = 0; i < menuOptions.length; i++) {
      if (i === 0) {
        menuOptions[i].setAttribute("selected", "");
      } else {
        menuOptions[i].removeAttribute("selected");
      }
    }
    menuOptionIndex = 0;
  }

  function ShowExitScreen() {
    menuState = "exit";
    exit.style.display = "flex";
    start.style.display = "none";
    tutorial.style.display = "none";
    menu.style.display = "none";
  }

  document.addEventListener("keydown", function (event) {
    if (menuState === "start" && event.code === "Enter") {
      ShowMenuScreen();
    } else if (event.code === "ArrowUp" && menuOptionIndex > 0) {
      SelectMenuItem(menuOptionIndex - 1);
    } else if (
      event.code === "ArrowDown" &&
      menuOptionIndex < menuOptions.length - 1
    ) {
      SelectMenuItem(menuOptionIndex + 1);
    } else if (event.code === "Enter") {
      if (menuState === "menu") {
        switch (menuOptionIndex) {
          case 0:
            ShowGame();
            break;
          case 1:
            ShowTutorialScreen();
            break;
          case 2:
            ShowExitScreen();
            break;
        }
      } else if (menuState === "tutorial") {
        ShowMenuScreen();
      }
    }
  });
}

function GameLogic() {
  var player;
  var playerX;
  var playerY;
  var key;
  var keyX;
  var keyY;
  var door;
  var doorX;
  var doorY;
  var spike;
  var button
  var buttonX
  var buttonY
  var button2X
  var button2Y
  var level1;
  var level2
  var levelLogic
  var levelIndex
  var gameOver

  level1 = [
    "**************",
    "*     *      *",
    "*     *      *",
    "D     *      *",
    "*     *      *",
    "*     *      *",
    "*     *      *",
    "***  ****  ***",
    "*     *      *",
    "*     *      *",
    "*            *",
    "*            *",
    "*     *      *",
    "*     *      *",
    "**************",
  ];

  level2 = [
    "*****************************",
    "*       *        #          *",
    "*       *    #       #      *",
    "*       *    #########      *",
    "*       *    #       #      *",
    "*       *        #          *",
    "*       *********************",
    "*####   *       #  #        *",
    "*       *       #           *",
    "*       *       #     #     *",
    "*       *             #     *",
    "*       *          #  #     *",
    "*       *          #        *",
    "*       *       #  #        *",
    "*   ####*       *************",
    "*                   #       *",
    "*                   #       *",
    "*                   #       *",
    "*                   #       *",
    "*                   #       *",
    "*                *  #   #   *",
    "*                *  #   #   *",
    "*                *  #   #   *",
    "*************    *  #   #   *",
    "*  #     #       *      #   *",
    "*  #  #  #       *      #   *",
    "D     #          *      #   *",
    "*  #  #  #       *      #   *",
    "*  #     #       *      #   *",
    "*****************************",
  ];

  levelLogic = level1
  levelIndex = 1

  player = "&";
  playerX = 1;
  playerY = 1;

  key = "@";
  keyX = 10;
  keyY = 3;

  door = "D";
  doorX = 0;
  doorY = 3;

  spike = "#"

  button = "O"
  
  doorOpen = false;
  keyUsed = false;  
  buttonPressed = false;
  button2Pressed = false;
  gameOver = false;

  document.addEventListener("keydown", (event) => {
    if (gameOver === true && event.key === "Enter") {
      gameOver = false 
      if (levelIndex === 2){
        levelLogic = level2
      }
      playerX = 1
      playerY = 1
      doorOpen = false
      keyUsed = false
      LevelMap()
    }
  })


  function LevelMap() {
  var gameLevel = "";
  
  if (gameOver === true) {
    document.getElementById("game-levelone").innerHTML = `<center>Game Over <br><br><br><br> aperte enter para tentar novamente</center>`;
    keyX = 26;
    keyY = 3;
    buttonX = 26;
    buttonY = 10;
    button2X = 26;
    button2Y = 26;
    keyUsed = false;
    buttonPressed = false;
    button2Pressed = false;
    return;
  }

  for (var y = 0; y < levelLogic.length; y++) {
    var gameLevelRow = "";
    for (var x = 0; x < levelLogic[y].length; x++) {
      if (playerX === x && playerY === y) {
        gameLevelRow += player;
        if (levelIndex === 2 && levelLogic[y][x] === spike && playerLifes === 3) {
          playerX = 1;
          playerY = 1;
          buttonX = 26;
          buttonY = 10;
          button2X = 26;
          button2Y = 26;
          doorOpen = false;
          keyUsed = false;
          buttonPressed = false;
          button2Pressed = false;
          playerLifes = 2;
          LevelMap()
          console.log(playerLifes);
          return;
        }
        else if (levelIndex === 2 && levelLogic[y][x] === spike && playerLifes === 2) {
          playerX = 1
          playerY = 1
          buttonX = 26;
          buttonY = 10;
          button2X = 26;
          button2Y = 26;
          doorOpen = false
          keyUsed = false
          buttonPressed = false;
          button2Pressed = false;
          playerLifes = 1;
          LevelMap()
          console.log(playerLifes);
          return;
        }
        if (levelIndex === 2 && levelLogic[y][x] === spike && playerLifes === 1) {
          gameOver = true
          playerLifes = 3;
          LevelMap();
          return;
        }
      } else if (keyX === x && keyY === y && !keyUsed) {
        gameLevelRow += key;
      } else if (doorX === x && doorY === y) {
        if (doorOpen) { 
          if (levelIndex === 1) {
            gameLevelRow += "=";
          } else if (levelIndex === 2 && keyUsed) {
            gameLevelRow += "=";
          }
        } else {
          gameLevelRow += door;
        }
      } else if (buttonX === x && buttonY === y) {
        gameLevelRow += button
      } else if (button2X === x && button2Y === y) {
        gameLevelRow += button
      } else if ((x === 8 && y >= 1 && y <= 5) && (buttonPressed && button2Pressed)) {
        gameLevelRow += " ";
      } else {
        gameLevelRow += levelLogic[y][x];
      }
    }
    gameLevel += gameLevelRow + "<br>";
  }

  if (levelIndex === 1 && playerX === doorX && playerY === doorY && doorOpen) {
    
    levelLogic = level2;
    levelIndex = 2;

    playerX = 1;
    playerY = 1;

    keyX = 26
    keyY = 3

    doorX = 0
    doorY = 26

    buttonX = 26
    buttonY = 10
    button2X = 26
    button2Y = 26

    doorOpen = false;
    keyUsed = false;
    buttonPressed = false;
    button2Pressed = false;
    LevelMap();
    return;
  }

  document.getElementById("game-levelone").innerHTML = gameLevel;
}

  function levelWall(x, y) {
    if ((x === 8 && y >= 1 && y <= 5) && (buttonPressed && button2Pressed)) {
      return false;
    }
    return levelLogic[y][x] === "*";
  }

  document.addEventListener("keydown", (event) => {
    var newX = playerX;
    var newY = playerY;

    if (event.key === "w") {
      newY--;
    } else if (event.key === "a") {
      newX--;
    } else if (event.key === "s") {
      newY++;
    } else if (event.key === "d") {
      newX++;
    } else if (event.key === "i") {
      if (keyX === playerX && keyY === playerY) {
        doorOpen = true;
        keyUsed = true;
        keyX = null;
        keyY = null;
      } else if (buttonX === playerX && buttonY === playerY) {
        buttonPressed = true
        buttonX = null
        buttonY = null
      } else if (button2X === playerX && button2Y === playerY) {
        button2Pressed = true
        button2X = null
        button2Y = null
      }
    //devmode(cheats) abaixo ;)
    } else if (event.key === "v") {
      buttonX = true;
      buttonY = true;
      button2X = true;
      button2Y = true;
      buttonPressed = true;
      button2Pressed = true;
      keyUsed = true;
      doorOpen = true;
    }
    //devmode(cheats) acima ;)

    if (
      !levelWall(newX, newY) &&
      !(doorX === newX && doorY === newY && !doorOpen)
    ) {
      playerX = newX;
      playerY = newY;
    }

    LevelMap();
  });

  LevelMap();
}
GameMenu();
GameLogic();
