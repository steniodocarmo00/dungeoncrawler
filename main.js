var playerLifes;
playerLifes = 3;


var levelLogic;
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
  dialogue = document.getElementById("lore");
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
    dialogue.style.display = "none";
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

  function ShowDialogue() {
    menuState = "dialogue";
    start.style.display = "none";
    menu.style.display = "none";
    tutorial.style.display = "none";
  }

  function ShowExitScreen() {
    menuState = "exit";
    exit.style.display = "flex";
    start.style.display = "none";
    tutorial.style.display = "none";
    menu.style.display = "none";
  }

  function callDialog() {
    const dialogo = document.getElementById("lore");

    const texto = [
      "> Ellis used to be just a normal worker at the &nterprise.",
      "> There, their main function was to code E-thereo.",
      "> Though, the truth is, they never understood what E-thereo's purpose was.",
      "> Ellis always assumed it was a game.",
      "> However,",
      "> That couldn't be further from the truth.",
      "> One day, while staying for longer in the office, they overheard two other employees talking.",
      "> 'Did you hear about that employee #427?'",
      "> 'The one who vanished? Wasn't he involved in some kind of conspiracy?'",
      "> 'They call it a conspiracy, but what if it's actually the truth?'",
      "> 'You really think so? That the code is-'",
      "> 'SHHH! Others might hear us!'",
      "> Given their strong sense of justice and lots of time to spare...",
      "> Ellis decided to find out what they were talking about.",
      "> So they had a plan:",
      "> #1: Break in employee #427's house and steal the keys to the &nterprise's garbage dump.",
      "> #2: Infiltrate the main computer room through the dump.",
      "> #3: Find out the true purpose of E-thereo.",
      "> So, when the day came, they left their home to put the plan in practice.",
      "> In the way, they thought they heard a faint voice saying:",
      "> Press y to begin.",
    ];

    document.getElementById(
      "lore"
    ).innerHTML = `<br>> This is the the story of Ellis.`;

    var tamanho = texto.length;
    var i = 0;
    var count = 0;

    document.addEventListener("keydown", (event) => {
      if (count < tamanho) {
        if (event.key === "Enter") {
          dialogo.innerHTML = "<br>";
          const intervalo = setInterval(function () {
            if (count < tamanho) {
              var frase = texto[count];
              if (i < frase.length) {
                const letra = frase.charAt(i);
                dialogo.innerHTML += letra;
                i++;
              } else {
                clearInterval(intervalo);
                count++;
                i = 0;
              }
            }
          }, 20);
        }
      }
    });
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
            ShowDialogue(callDialog());

            document.addEventListener("keydown", (event) => {
              if (event.key === "y" || event.key === "Y") {
                ShowGame();
              }
            });

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
  var spikeX;
  var spikeY;
  var newSpike;
  var spikeArray;
  var spikeMoving;
  var spikeSpeed;
  var spikeInterval;
  var spikeNumber;
  var attackTimer;
  var dialogueTimer;
  var button;
  var buttonX;
  var buttonY;
  var button2X;
  var button2Y;
  var bossSymbol1;
  var bossSymbol1X;
  var bossSymbol1Y;
  var bossSymbol2;
  var bossSymbol2X;
  var bossSymbol2Y;
  var bossSymbol3;
  var bossSymbol3X;
  var bossSymbol3Y;
  var bossSymbol4;
  var bossSymbol4X;
  var bossSymbol4Y;
  var level1;
  var level2;
  var level3;
  var level4;
  var levelLogic;
  var levelIndex;
  var gameOver;

  level1 = [
    "***************",
    "*      *      *",
    "*      *      *",
    "D      *      *",
    "*      *      *",
    "*      *      *",
    "*      *      *",
    "***  *****  ***",
    "*      *      *",
    "*      *   -- *",
    "*         |  |*",
    "*         |}[]*",
    "*      *  | `|*",
    "*      *   -- *",
    "***************",
  ];

  level2 = [
    "******************************",
    "*       *        #           *",
    "*       *    #       #       *",
    "*       *    #########       *",
    "*       *    #       #       *",
    "*       *        #           *",
    "*       **********************",
    "*####   *       #  #         *",
    "*       *       #            *",
    "*       *       #     #      *",
    "*       *             #      *",
    "*       *          #  #      *",
    "*       *          #         *",
    "*       *       #  #         *",
    "*   ####*       **************",
    "*                   #        *",
    "*                   #        *",
    "*                   #        *",
    "*     +             #        *",
    "*    +++            #        *",
    "*   +++++        *  #        *",
    "*     ||         *  #  #     *",
    "*                *  #  #     *",
    "*************    *  #  #     *",
    "*     #     #    *     #     *",
    "*     #  #  #    *     #     *",
    "D        #       *     #     *",
    "*     #  #  #    *     #     *",
    "*     #     #    *     #     *",
    "******************************",
  ];

  level3 = [
    "***********************************************************",
    "*                  ####*          --            --        *",
    "*##       #          ##*         |  |          | .|       *",
    "*##### #  ##  #  ######*        <|}[]          []{|>      *",
    "*    # #  #       ###  *         | `|          |  |       *",
    "* #  # #  #      ##### *          --            --        *",
    "* #  # #  #  ###  #    *                                  *",
    "* #  ###  #  ##   #    *                                  *",
    "* #       #       #  ##*          --            --        *",
    "* #       ######   #  #*         |  |          | .|       *",
    "*  #     ##        #  #*        <|}[]          []{|<      *",
    "*   ##### #  #     ## #*         | `|          |  |       *",
    "*        #  ##   ###   *          --            --        *",
    "*#####   #   #         *                                  *",
    "*        ##  #####     *                                  *",
    "*  #######       ###   *          --            --        *",
    "*  #     #             *         |  |          | .|       *",
    "*  #     #             *        <|}[]          []{|<      *",
    "*  # #   ########      *         | `|          |  |       *",
    "*  # ## ##      #  #   *          --            --        *",
    "*  #  #         #  #   *                                  *",
    "*  #            #  #   *                                  *",
    "*  ############ ## #   *          --            --        *",
    "*                ###   *         |  |          | .|       *",
    "*#####   #########    #*        <|}[]          []{|<      *",
    "*#   #  #   #        ##*         | `|          |  |       *",
    "*##  #  #   #   #####  *          --            --        *",
    "*    #  #   #       #  *                                  *",
    "*   ##  #######     ## *                                  *",
    "*#  ##         #     ##*          --            --        *",
    "*#   #######    #     #*         |  |          | .|       *",
    "*#         ###   ######*        <|}[]          []{|<      *",
    "*####  #      #        *         | `|          |  |       *",
    "* # ####      ###      *          --            --        *",
    "*    #### ### # ##  ###*                                  *",
    "*         #  #         D          --            --        *",
    "*#        #   #        *         |  |          | .|       *",
    "*#### ##### # #### ####*        <|}[]          []{|<      *",
    "*      ##      #  ## # *         | `|          |  |       *",
    "* ##        #    # # # *          --            --        *",
    "***********************************************************",
    "*                                                         *",
    "*                    ,----------------,                   *",
    "*                 ------------------------                *",
    "*                 \\______________________/                *",
    "*                 |  __________________  |                *",
    "*                 | |                  | |                *",
    "*                 | |                  | |                *",
    "*                 | |  press a button  | |                *",
    "*                 | |                  | |                *",
    "*                 | |                  | |                *",
    "*                 \\  ------------------  /                *",
    "*                   --------| |----------                 *",
    "*                   ___________________                   *",
    "*                  /-.-.-.-.-.-.-.--.-.-\\  _|_            *",
    "*                 /-.-.-..-..-..--..--.-.\\  |             *",
    "*                 ------------------------ | |            *",
    "*                             >            ---            *",
    "*                                                         *",
    "***********************************************************",
  ];

  level4 = [
    "*****************************************************************************************",
    "*                                      *          *                                     *",
    "*                                      *          *                                     *",
    "*                                      *          *                                     *",
    "*                                      *          *                                     *",
    "*                                      ************                                     *",
    "*                                        *      *                                       *",
    "*                                       *        *                                      *",
    "*                                        *  **  *                                       *",
    "*                                        ********                                       *",
    "*                                                                                       *",
    "*                                                                                       *",
    "*                                                                                       *",
    "*                                                                                       *",
    "*                                                                                       *",
    "*                                                                                       *",
    "*                                                                                       *",
    "*                                                                                       *",
    "*                                                                                       *",
    "*                                                                                       *",
    "*                                                                                       *",
    "*                                                                                       *",
    "*                                                                                       *",
    "*****************************************************************************************",
    "                                                                                         ",
  ];

  levelLogic = level1;
  levelIndex = 1;

  player = "&";
  playerX = 1;
  playerY = 1;

  key = "@";
  keyX = 10;
  keyY = 3;

  door = "D";
  doorX = 0;
  doorY = 3;

  spike = "#";
  spikeX = [];
  spikeY = [];
  spikeArray = [];

  button = "O";

  teleport = ">";
  teleportX = null;
  teleportY = null;
  teleport2X = null;
  teleport2Y = null;

  bossSymbol1 = "\\";
  bossSymbol2 = "_";
  bossSymbol3 = "_";
  bossSymbol4 = "/";

  doorOpen = false;
  keyUsed = false;
  buttonPressed = false;
  button2Pressed = false;
  gameOver = false;

  document.addEventListener("keydown", (event) => {
    if (gameOver === true && event.key === "Enter") {
      gameOver = false;
      if (levelIndex === 2) {
        levelLogic = level2;
      } else if (levelIndex === 3) {
        levelLogic = level3;
      } else if (levelIndex === 4) {
        levelLogic = level4;
      }
      if (levelIndex !== 4) {
        playerX = 1;
        playerY = 1;
      } else {
        playerX = 45;
        playerY = 12;
      }
      doorOpen = false;
      keyUsed = false;
      LevelMap();
      if (levelIndex === 4) {
        bossSymbol1X = 43;
        bossSymbol1Y = 3;
        bossSymbol2X = 44;
        bossSymbol2Y = 3;
        bossSymbol3X = 45;
        bossSymbol3Y = 3;
        bossSymbol4X = 46;
        bossSymbol4Y = 3;
        Ethereo();
      }
    }
  });

  function LevelMap() {
    if (playerLifes === 3 && levelLogic !== level1) {
      document.getElementById("life-counter").innerHTML = ` <center>
    ---------------
    | lives:      |
    |   ♥  ♥  ♥   |
    ---------------
    </center>`;
    } else if (playerLifes === 2 && levelLogic !== level1) {
      document.getElementById("life-counter").innerHTML = ` <center>
    ---------------
    | lives:      |
    |   ♥  ♥  ♡   |
    ---------------
    </center>`;
    } else if (playerLifes === 1 && levelLogic !== level1) {
      document.getElementById("life-counter").innerHTML = ` <center>
    ---------------
    | lives:      |
    |   ♥  ♡  ♡   |
    ---------------</center>`;
    }
    var gameLevel = "";
    if (gameOver) {
      document.getElementById("life-counter").innerHTML = ` <center>
    ---------------
    | lives:      |
    |  ♡  ♡  ♡    |
    ---------------</center>`;

      if (levelIndex === 2) {
        document.getElementById("game-levelone").innerHTML = `
        <center>Game Over <br><br><br><br> Press Enter to try again.</center>`;
        document.getElementById("life-counter").innerHTML = `<center> 
        ---------------
        | lives:      |
        |  ♡  ♡  ♡    |
        ---------------</center>`;
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
      } else if (levelIndex === 3) {
        document.getElementById(
          "game-levelone"
        ).innerHTML = `<center>Game Over <br><br><br><br> Press Enter to try again.</center>`;
        keyX = 19;
        keyY = 17;
        buttonX = 43;
        buttonY = 55;
        button2X = 45;
        button2Y = 55;
        keyUsed = false;
        buttonPressed = false;
        button2Pressed = false;
        return;
      } else if (levelIndex === 4) {
        document.getElementById(
          "game-levelone"
        ).innerHTML = `<center>Game Over <br><br><br><br> Press Enter to try again.</center>`;
        keyX = null;
        keyY = null;
        buttonX = 43;
        buttonY = 2;
        button2X = 46;
        button2Y = 2;
        teleportX = null;
        teleportY = null;
        keyUsed = false;
        buttonPressed = false;
        button2Pressed = false;
        return;
      }
    }

    for (var y = 0; y < levelLogic.length; y++) {
      var gameLevelRow = "";
      for (var x = 0; x < levelLogic[y].length; x++) {
        if (playerX === x && playerY === y) {
          gameLevelRow += player;
          if (
            levelIndex === 2 &&
            levelLogic[y][x] === spike &&
            playerLifes === 3
          ) {
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
            LevelMap();
            console.log(playerLifes);
            return;
          } else if (
            levelIndex === 2 &&
            levelLogic[y][x] === spike &&
            playerLifes === 2
          ) {
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
            playerLifes = 1;
            LevelMap();
            console.log(playerLifes);
            return;
          } else if (
            levelIndex === 3 &&
            levelLogic[y][x] === spike &&
            playerLifes === 3
          ) {
            playerX = 1;
            playerY = 1;
            buttonX = 43;
            buttonY = 55;
            button2X = 45;
            button2Y = 55;
            doorOpen = false;
            keyUsed = false;
            buttonPressed = false;
            button2Pressed = false;
            playerLifes = 2;
            LevelMap();
            console.log(playerLifes);
            return;
          } else if (
            levelIndex === 3 &&
            levelLogic[y][x] === spike &&
            playerLifes === 2
          ) {
            playerX = 1;
            playerY = 1;
            buttonX = 43;
            buttonY = 55;
            button2X = 45;
            button2Y = 55;
            doorOpen = false;
            keyUsed = false;
            buttonPressed = false;
            button2Pressed = false;
            playerLifes = 1;
            LevelMap();
            console.log(playerLifes);
            return;
          } else if (
            levelIndex === 4 &&
            spikeX.indexOf(x) !== -1 &&
            spikeY[spikeX.indexOf(x)] === y &&
            playerLifes === 3
          ) {
            playerX = 45;
            playerY = 12;
            doorOpen = false;
            keyUsed = false;
            buttonPressed = false;
            playerLifes = 2;
            LevelMap();
            console.log(playerLifes);
            return;
          } else if (
            levelIndex === 4 &&
            spikeX.indexOf(x) !== -1 &&
            spikeY[spikeX.indexOf(x)] === y &&
            playerLifes === 2
          ) {
            playerX = 45;
            playerY = 12;
            doorOpen = false;
            keyUsed = false;
            buttonPressed = false;
            playerLifes = 1;
            LevelMap();
            console.log(playerLifes);
            return;
          }
          if (
            ((levelIndex === 2 || levelIndex === 3) &&
              levelLogic[y][x] === spike &&
              playerLifes === 1) ||
            (levelIndex === 4 &&
              spikeX.indexOf(x) !== -1 &&
              spikeY[spikeX.indexOf(x)] === y &&
              playerLifes === 1)
          ) {
            gameOver = true;
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
            } else if (levelIndex === 3 && keyUsed) {
              gameLevelRow += "=";
            }
          } else {
            gameLevelRow += door;
          }
        } else if (buttonX === x && buttonY === y) {
          gameLevelRow += button;
        } else if (button2X === x && button2Y === y) {
          gameLevelRow += button;
        } else if (teleportX === x && teleportY === y) {
          gameLevelRow += teleport;
        } else if (teleport2X === x && teleport2Y === y) {
          gameLevelRow += teleport;
        } else if (bossSymbol1X === x && bossSymbol1Y === y) {
          gameLevelRow += bossSymbol1;
        } else if (bossSymbol2X === x && bossSymbol2Y === y) {
          gameLevelRow += bossSymbol2;
        } else if (bossSymbol3X === x && bossSymbol3Y === y) {
          gameLevelRow += bossSymbol3;
        } else if (bossSymbol4X === x && bossSymbol4Y === y) {
          gameLevelRow += bossSymbol4;
        } else if (
          x === 8 &&
          y >= 1 &&
          y <= 5 &&
          buttonPressed &&
          button2Pressed
        ) {
          gameLevelRow += " ";
        } else if (
          spikeX.indexOf(x) !== -1 &&
          spikeY[spikeX.indexOf(x)] === y
        ) {
          gameLevelRow += spike;
        } else {
          gameLevelRow += levelLogic[y][x];
        }
      }
      gameLevel += gameLevelRow + "<br>";
    }

    if (
      levelIndex === 1 &&
      playerX === doorX &&
      playerY === doorY &&
      doorOpen
    ) {
      levelLogic = level2;
      levelIndex = 2;

      playerX = 1;
      playerY = 1;

      keyX = 26;
      keyY = 3;

      doorX = 0;
      doorY = 26;

      buttonX = 26;
      buttonY = 10;
      button2X = 26;
      button2Y = 26;

      doorOpen = false;
      keyUsed = false;
      buttonPressed = false;
      button2Pressed = false;
      LevelMap();
      return;
    }
    if (
      levelIndex === 2 &&
      playerX === doorX &&
      playerY === doorY &&
      doorOpen
    ) {
      levelLogic = level3;
      levelIndex = 3;

      playerX = 1;
      playerY = 1;

      keyX = 19;
      keyY = 17;

      doorX = 23;
      doorY = 35;

      buttonX = 43;
      buttonY = 55;
      button2X = 45;
      button2Y = 55;

      teleportX = 51;
      teleportY = 3;
      teleport2X = 30;
      teleport2Y = 57;

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
    if (x === 8 && y >= 1 && y <= 5 && buttonPressed && button2Pressed) {
      return false;
    }
    return levelLogic[y][x] === "*";
  }

  function Ethereo() {
    clearInterval(spikeMoving);
    clearInterval(spikeInterval);
    clearTimeout(dialogueTimer);
    clearTimeout(attackTimer);

    spikeX = [];
    spikeY = [];
    spikeArray = [];
    if (!button2Pressed) {
      spikeNumber = 1;
      spikeSpeed = 500;
    } else {
      spikeNumber = 3;
      spikeSpeed = 350;
    }

    function dialogue() {
      if (!button2Pressed) {
        // aqui fica o diálogo do início do boss
        levelLogic[24] = "You don't need to do this, E-thereo is the future of humankind."; // placeholder
      } else if (button2Pressed) {
        // aqui fica o diálogo após o primeiro hit
        levelLogic[24] = "There is no turning back now, any efforts are useless, E-thereo is anima mundi."; // placeholder
      }
      LevelMap();
    }

    function moveSpike() {
      for (var i = 0; i < spikeArray.length; i++) {
        spikeArray[i].y++;

        spikeX[i] = spikeArray[i].x;
        spikeY[i] = spikeArray[i].y;

        if (spikeArray[i].y === 22) {
          spikeArray[i].x = null;
        }

        LevelMap();
      }
    }

    function addSpike() {
      for (var i = 0; i < spikeNumber; i++) {
        newSpike = {
          x: Math.floor(Math.random() * 87) + 1,
          y: 1,
        };
        if (newSpike.x === 39 || newSpike.x === 50) {
          newSpike.y = 6;
        } else if (newSpike.x === 40 || newSpike.x === 49) {
          newSpike.y = 8;
        } else if (newSpike.x > 40 && newSpike.x < 49) {
          newSpike.y = 10;
        }

        spikeX.push(newSpike.x);
        spikeY.push(newSpike.y);
        spikeArray.push(newSpike);
      }
    }

    setTimeout(dialogue, 1500);
    dialogueTimer = setTimeout(function () {
      spikeMoving = setInterval(moveSpike, spikeSpeed);
      spikeInterval = setInterval(addSpike, 750);
      attackTimer = setTimeout(function () {
        clearInterval(spikeMoving);
        clearInterval(spikeInterval);
        spikeX = [];
        spikeY = [];
        spikeArray = [];
        teleportX = 45;
        teleportY = 12;

        function dialogue2() {
          if (!button2Pressed) {
            // aqui é o diálogo que segue a primeira fase
            levelLogic[24] = "Humankind will ascend to the digital world and be immortal, like #427."; // placeholder
            LevelMap();
          }
        }

        function vulnerable() {
          buttonX = null;
          buttonY = null;
          teleport2X = 43;
          teleport2Y = 2;
          LevelMap();
        }

        LevelMap();

        setTimeout(dialogue2, 1500);
        setTimeout(vulnerable, 3000 /*número placeholder*/); // talvez seja preciso mudar se o diálogo for passado com enter
      }, 15000);
    }, 3000 /*número placeholder*/); // talvez seja preciso mudar se o diálogo for passado com enter
    return;
  }

  function EthereoEnd() {
    function dialogue() {
      // aqui fica o diálogo do fim do boss
      levelLogic[24] =
        "I understand your efforts. But now everything is done, E-thereo is the new world to humankind, accept your fate.";
      levelLogic[25] = "E-thereo is the project that will connect everyone in the digital world, making the human soul immortal." 
      levelLogic[26] = "And for that, you must leave your body, I'll kill your weak body and make you a perfect soul in the digital world"
      levelLogic[27] = "WE are E-thereo, WE are all connected. Welcome home, user E-llis."// placeholder
      LevelMap();
    }
    function gif1(){
      document.getElementById("game-levelone").innerHTML = `<img src="http://cs.gettysburg.edu/~duncjo01/archive/patterns/lain/Static2.gif ">`
    }
    function gif2(){
      document.getElementById("game-levelone").innerHTML = `<img src="http://cs.gettysburg.edu/~duncjo01/archive/patterns/lain/Guest.gif ">`
    }
    function gif3(){
      document.getElementById("game-levelone").innerHTML = `<img src="http://cs.gettysburg.edu/~duncjo01/archive/patterns/lain/User.gif ">`
    }
    function gif4(){
      document.getElementById("game-levelone").innerHTML = `<img src="http://cs.gettysburg.edu/~duncjo01/archive/patterns/lain/eyeLain.gif ">`
    }
    function gif5(){
      document.getElementById("game-levelone").innerHTML = `<img src="http://cs.gettysburg.edu/~duncjo01/archive/patterns/lain/ghost3.gif ">`
    }
    function gif6(){
      document.getElementById("game-levelone").innerHTML = `<img src="http://cs.gettysburg.edu/~duncjo01/archive/patterns/lain/handsL1.gif ">`
    }
    function gif7(){
      document.getElementById("game-levelone").innerHTML = `<img src="http://cs.gettysburg.edu/~duncjo01/archive/patterns/lain/LAINHADN3.gif   ">`
    }
    function reload(){
      location.reload()
    }

    setTimeout(dialogue, 1000);
    setTimeout(gif1, 30000)
    setTimeout(gif2, 31000)
    setTimeout(gif3, 32000)
    setTimeout(gif4, 33000)
    setTimeout(gif5, 34000)
    setTimeout(gif6, 35000)
    setTimeout(gif7, 36000)
    setTimeout(reload, 37000)
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
      } else if (
        levelIndex === 2 &&
        buttonX === playerX &&
        buttonY === playerY
      ) {
        buttonPressed = true;
        buttonX = null;
        buttonY = null;
      } else if (
        levelIndex === 2 &&
        button2X === playerX &&
        button2Y === playerY
      ) {
        button2Pressed = true;
        button2X = null;
        button2Y = null;
      } else if (
        levelIndex === 3 &&
        ((buttonX === playerX && buttonY === playerY) ||
          (button2X === playerX && button2Y === playerY))
      ) {
        levelLogic = level4;
        levelIndex = 4;

        playerX = 45;
        playerY = 12;

        keyX = null;
        keyY = null;

        doorX = null;
        doorY = null;

        buttonX = 43;
        buttonY = 2;
        button2X = 46;
        button2Y = 2;

        teleportX = null;
        teleportY = null;
        teleport2X = null;
        teleport2Y = null;

        bossSymbol1X = 43;
        bossSymbol1Y = 3;
        bossSymbol2X = 44;
        bossSymbol2Y = 3;
        bossSymbol3X = 45;
        bossSymbol3Y = 3;
        bossSymbol4X = 46;
        bossSymbol4Y = 3;

        doorOpen = false;
        keyUsed = false;
        buttonPressed = false;
        button2Pressed = false;
        LevelMap();
        Ethereo();
        return;
      } else if (
        levelIndex === 4 &&
        button2X === playerX &&
        button2Y === playerY
      ) {
        button2Pressed = true;
        buttonX = 43;
        buttonY = 2;
        button2X = null;
        button2Y = null;
        teleport2X = null;
        teleport2Y = null;

        newY = 12;

        bossSymbol1X = 43;
        bossSymbol1Y = 1;
        bossSymbol4X = 46;
        bossSymbol4Y = 1;
        LevelMap();
        Ethereo();
      } else if (
        levelIndex === 4 &&
        buttonX === playerX &&
        buttonY === playerY
      ) {
        buttonX = null;
        buttonY = null;

        bossSymbol1X = null;
        bossSymbol1Y = null;
        bossSymbol2X = null;
        bossSymbol2Y = null;
        bossSymbol3X = null;
        bossSymbol3Y = null;
        bossSymbol4X = null;
        bossSymbol4Y = null;
        LevelMap();
        EthereoEnd();
      }
      //devmode(cheats) abaixo ;)
    } else if (event.key === "v") {
      if (!(levelIndex === 3)) {
        buttonX = true;
        buttonY = true;
        button2X = true;
        button2Y = true;
        buttonPressed = true;
        button2Pressed = true;
      }
      keyUsed = true;
      doorOpen = true;
      //devmode(cheats) acima ;)

      //level selector abaixo
    } else if (event.key === "1") {
      levelLogic = level1;
      levelIndex = 1;
      keyX = 10;
      keyY = 3;
      doorX = 0;
      doorY = 3;
      buttonX = null;
      buttonY = null;
      button2X = null;
      button2Y = null;
      teleportX = null;
      teleportY = null;
      teleport2X = null;
      teleport2Y = null;
      doorOpen = false;
      keyUsed = false;
      buttonPressed = false;
      button2Pressed = false;
      LevelMap();
    } else if (event.key === "2") {
      levelLogic = level2;
      levelIndex = 2;
      keyX = 26;
      keyY = 3;
      doorX = 0;
      doorY = 26;
      buttonX = 26;
      buttonY = 10;
      button2X = 26;
      button2Y = 26;
      teleportX = null;
      teleportY = null;
      teleport2X = null;
      teleport2Y = null;
      doorOpen = false;
      keyUsed = false;
      buttonPressed = false;
      button2Pressed = false;
      LevelMap();
    } else if (event.key === "3") {
      levelLogic = level3;
      levelIndex = 3;
      keyX = 19;
      keyY = 17;
      doorX = 23;
      doorY = 35;
      buttonX = 43;
      buttonY = 55;
      button2X = 45;
      button2Y = 55;
      teleportX = 51;
      teleportY = 3;
      teleport2X = 30;
      teleport2Y = 57;
      doorOpen = false;
      keyUsed = false;
      buttonPressed = false;
      button2Pressed = false;
      LevelMap();
    } else if (event.key === "4") {
      levelLogic = level4;
      levelIndex = 4;
      playerX = 45;
      playerY = 12;
      keyX = null;
      keyY = null;
      doorX = null;
      doorY = null;
      buttonX = 43;
      buttonY = 2;
      button2X = 46;
      button2Y = 2;
      teleportX = null;
      teleportY = null;
      teleport2X = null;
      teleport2Y = null;
      bossSymbol1X = 43;
      bossSymbol1Y = 3;
      bossSymbol2X = 44;
      bossSymbol2Y = 3;
      bossSymbol3X = 45;
      bossSymbol3Y = 3;
      bossSymbol4X = 46;
      bossSymbol4Y = 3;
      doorOpen = false;
      keyUsed = false;
      buttonPressed = false;
      button2Pressed = false;
      LevelMap();
      Ethereo();
    }
    //level selector acima

    if (
      !levelWall(newX, newY) &&
      !(doorX === newX && doorY === newY && !doorOpen)
    ) {
      playerX = newX;
      playerY = newY;
    }
    if (
      teleportX === newX &&
      teleportY === newY &&
      teleport2X !== null &&
      teleport2X !== null
    ) {
      playerX = teleport2X;
      playerY = teleport2Y;
      if (levelIndex === 4 && button2Pressed) {
        buttonX = 43;
        buttonY = 2;
        teleport2X = null;
        teleport2Y = null;
      }
    }
    if (
      teleport2X === newX &&
      teleport2Y === newY &&
      teleportX !== null &&
      teleportX !== null
    ) {
      playerX = teleportX;
      playerY = teleportY;
    }

    LevelMap();
  });

  LevelMap();
}
GameMenu();
GameLogic();
