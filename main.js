
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
          "> this is the the story of ellis ",
          "> ellis used to be just a normal worker at the &nterprise",
          "> there, their main function was to code E-thereo",
          "> though, the truth is, they never understood what E-thereo's purpose was",
          "> ellis always assumed it was a game",
          "> however ",
          "> that couldn't be further from the truth ",
          "> one day, while staying for longer in the office, they overheard two other employees talking",
          "> 'did you hear about that employee #427?'",
          "> 'the one who vanished? wasn't he involved in some kind of conspiracy'",
          "> 'they call it a conspiracy, but what if it's actually the truth?'",
          "> 'you really think so? that the code is-'",
          "> 'SHHH! others might hear us!'",

          "> given their strong sense of justice and lots of time to spare...",
          "> ellis decided to find out what they were talking about",
          "> so they had a plan:",
          "> #1: break in employee #427's house and steal the keys to the &nterprise's garbage dump",
          "> #2: infiltrate the main computer room through the dump",
          "> #3: find out the true purpose of E-thereo",
           "> so, when the day came, they left their home to put the plan in practice",
          "> in the way, they thought they heard a faint voice saying:",
          "> press y to begin"]
  
      document.getElementById("lore").innerHTML = `<br>> Alright, I've been thinking.`;
      
      var tamanho = texto.length
      var i = 0
      var count = 0
      
      document.addEventListener("keydown", (event) =>{
          if (count < tamanho) {
              if (event.key === "Enter") {
                  dialogo.innerHTML = "<br>"
                  const intervalo = setInterval(function() {
                      var frase = texto[count]
                      if (i < frase.length) {
                          const letra = frase.charAt(i)
                          dialogo.innerHTML += letra
                          i++
                      } else {
                          clearInterval(intervalo)
                          count++
                          i = 0
                      }
                  }, 20)
              }
          }
      })

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
            
            document.addEventListener("keydown", (event) =>{
              if (event.key === "y") {
                ShowGame();
              }
            })
            
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
  var spikeInterval;
  var dialogueTimer;
  var attackTimer;
  var button;
  var buttonX;
  var buttonY;
  var button2X;
  var button2Y;
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
    "*    ⚘  *        #       ⚘   *",
    "*       *    #       #       *",
    "*       *    #########       *",
    "*  ⚘    *    #       #       *",
    "*       *        #           *",
    "*       **********************",
    "*####   *       #  #         *",
    "*       *       #            *",
    "*       *       #     #      *",
    "* ⚘     *             #      *",
    "*       *          #  #      *",
    "*       *          #         *",
    "*       *       #  #     ⚘   *",
    "*   ####*       **************",
    "*                   #    ⚘   *",
    "*              ⚘    #        *",
    "*                   #        *",
    "*     +             #        *",
    "*    +++            #        *",
    "*   +++++        *  #        *",
    "* ⚘   ||         *  #  #     *",
    "*   ⚘            *  #  #     *",
    "*************    *  #  #     *",
    "*     #     #    *     #     *",
    "*     #  #  #    *     #     *",
    "D        #       *     #     *",
    "*     #  #  #    *     #     *",
    "*     #     #  ⚘ *     #     *",
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
    "*                                      *   \\__/   *                                     *",
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
  spikeX = []
  spikeY = []
  spikeArray = []

  button = "O"

  teleport = ">"
  teleportX = null
  teleportY = null
  teleport2X = null
  teleport2Y = null

  
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
      } else if (levelIndex === 3){
        levelLogic = level3
      } else if (levelIndex === 4){
        levelLogic = level4
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
        Ethereo();
      }
    }
  })



  function LevelMap() {  if (playerLifes===3 && levelLogic==level2 ||playerLifes===3 && levelLogic==level3 ||playerLifes===3 && levelIndex==level1 ) {
    document.getElementById("life-counter").innerHTML = ` <center>
    ---------------
    | lives:      |
    |   ♥  ♥  ♥   |
    ---------------
    </center>`

  }else if (playerLifes===2 &&level2||playerLifes===3 && levelLogic==level3) {
    document.getElementById("life-counter").innerHTML = ` <center>
    ---------------
    | lives:      |
    |   ♥  ♥  ♡   |
    ---------------
    </center>`
    
  }else if (playerLifes===1||playerLifes===3 && levelLogic==level3) {
    document.getElementById("life-counter").innerHTML = ` <center>
    ---------------
    | lives:      |
    |   ♥  ♡  ♡   |
    ---------------</center>`
    
  }else if (playerLifes===0||playerLifes===3 && levelLogic==level3) {
    document.getElementById("life-counter").innerHTML = ` <center>
    ---------------
    | lives:      |
    |  ♡  ♡  ♡    |
    ---------------</center>`
    
  }
  var gameLevel = "";
  if (gameOver) {
   
    document.getElementById("life-counter").innerHTML = ` <center>
    ---------------
    | lives:      |
    |  ♡  ♡  ♡    |
    ---------------</center>`
    
    if (levelIndex === 2) {
        document.getElementById("game-levelone").innerHTML = `
        <center>Game Over <br><br><br><br> aperte enter para tentar novamente</center>`;
        document.getElementById("life-counter").innerHTML = `<center> 
        ---------------
        | lives:      |
        |  ♡  ♡  ♡    |
        ---------------</center>`
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
        document.getElementById("game-levelone").innerHTML = `<center>Game Over <br><br><br><br> aperte enter para tentar novamente</center>`;
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
        document.getElementById("game-levelone").innerHTML = `<center>Game Over <br><br><br><br> aperte enter para tentar novamente</center>`;
        keyX = null;
        keyY = null;
        buttonX = 43;
        buttonY = 2;
        button2X = 46;
        button2Y = 2;
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
        else if (levelIndex === 3 && levelLogic[y][x] === spike && playerLifes === 3) {
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
          LevelMap()
          console.log(playerLifes);
          return;
        }
        else if (levelIndex === 3 && levelLogic[y][x] === spike && playerLifes === 2) {
          playerX = 1;
          playerY = 1;
          buttonX = 43;
          buttonY = 55;
          button2X = 45;
          button2Y = 55;
          doorOpen = false
          keyUsed = false
          buttonPressed = false;
          button2Pressed = false;
          playerLifes = 1;
          LevelMap()
          console.log(playerLifes);
          return;
        }
        else if (levelIndex === 4 && spikeX.indexOf(x) !== -1 && spikeY[spikeX.indexOf(x)] === y && playerLifes === 3) {
          playerX = 45;
          playerY = 12;
          buttonX = 43;
          buttonY = 2;
          button2X = 46;
          button2Y = 2;
          doorOpen = false;
          keyUsed = false;
          buttonPressed = false;
          button2Pressed = false;
          playerLifes = 2;
          LevelMap()
          console.log(playerLifes);
          return;
        }
        else if (levelIndex === 4 && spikeX.indexOf(x) !== -1 && spikeY[spikeX.indexOf(x)] === y && playerLifes === 2) {
          playerX = 45;
          playerY = 12;
          buttonX = 43;
          buttonY = 2;
          button2X = 46;
          button2Y = 2;
          doorOpen = false;
          keyUsed = false;
          buttonPressed = false;
          button2Pressed = false;
          playerLifes = 1;
          LevelMap()
          console.log(playerLifes);
          return;
        }
        if (
          ((levelIndex === 2 || levelIndex === 3) && levelLogic[y][x] === spike && playerLifes === 1) ||
          (levelIndex === 4 && spikeX.indexOf(x) !== -1 && spikeY[spikeX.indexOf(x)] === y && playerLifes === 1)
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
        gameLevelRow += button
      } else if (button2X === x && button2Y === y) {
        gameLevelRow += button
      } else if (teleportX === x && teleportY === y) {
        gameLevelRow += teleport
      } else if (teleport2X === x && teleport2Y === y) {
        gameLevelRow += teleport
      } else if ((x === 8 && y >= 1 && y <= 5) && (buttonPressed && button2Pressed)) {
        gameLevelRow += " ";
      } else if (spikeX.indexOf(x) !== -1 && spikeY[spikeX.indexOf(x)] === y) {
        gameLevelRow += spike
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
  if (levelIndex === 2 && playerX === doorX && playerY === doorY && doorOpen) {
    
    levelLogic = level3;
    levelIndex = 3;

    playerX = 1;
    playerY = 1;

    keyX = 19
    keyY = 17

    doorX = 23
    doorY = 35

    buttonX = 43
    buttonY = 55
    button2X = 45
    button2Y = 55

    teleportX = 51
    teleportY = 3
    teleport2X = 30
    teleport2Y = 57

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

  function Ethereo() {
    clearInterval(spikeMoving)
    clearInterval(spikeInterval)
    clearTimeout(dialogueTimer)
    clearTimeout(attackTimer)

    spikeX = []
    spikeY = []
    spikeArray = []

    function dialogue() {
        levelLogic[24] = "seu merda"
        LevelMap()
    }

    function moveSpike() {
      for (var i = 0; i < spikeArray.length; i++) {
        spikeArray[i].y++;

        spikeX[i] = spikeArray[i].x;
        spikeY[i] = spikeArray[i].y;
        
        if (spikeArray[i].y === 22) {
            spikeArray[i].x = null
        }

        LevelMap()
      }
    }

    function addSpike() {
      newSpike = {
        x: Math.floor(Math.random()*88)+1,
        y: 1
      }
      if (newSpike.x > 38 && newSpike.x < 51) {
          newSpike.y = 6;
      }
      
      spikeX.push(newSpike.x);
      spikeY.push(newSpike.y);
      spikeArray.push(newSpike)
    }
    
    setTimeout(dialogue, 1500)
    dialogueTimer = setTimeout(function() {
      spikeMoving = setInterval(moveSpike, 500)
      spikeInterval = setInterval(addSpike, 750)
      attackTimer = setTimeout(function() {
        clearInterval(spikeMoving);
        clearInterval(spikeInterval);
        spikeX = []
        spikeY = []
        spikeArray = []
        teleportX = 45;
        teleportY = 12;

        function dialogue2() {
          levelLogic[24] = "mais diálogo"
          LevelMap()
        }

        function vulnerable() {
          buttonX = null;
          buttonY = null;
          teleport2X = 43;
          teleport2Y = 2;
        }

        LevelMap()

        setTimeout(dialogue2, 1500)
        setTimeout(vulnerable, 3000 /*placeholder*/)
      }, 15000);
    }, 3000 /*placeholder*/)
    return;
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
      } else if (levelIndex === 2 && buttonX === playerX && buttonY === playerY) {
        buttonPressed = true
        buttonX = null
        buttonY = null
      } else if (levelIndex === 2 && button2X === playerX && button2Y === playerY) {
        button2Pressed = true
        button2X = null
        button2Y = null
      } else if (
        levelIndex === 3 && (
          (buttonX === playerX && buttonY === playerY) ||
          (levelIndex === 3 && button2X === playerX && button2Y === playerY)
        )
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

        doorOpen = false;
        keyUsed = false;
        buttonPressed = false;
        button2Pressed = false;
        LevelMap();
        Ethereo()
        return;
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
      levelIndex = 1
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
      LevelMap()
    } else if (event.key === "2") {
      levelLogic = level2;
      levelIndex = 2
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
      LevelMap()
    } else if (event.key === "3") {
      levelLogic = level3;
      levelIndex = 3
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
      LevelMap()
    } else if (event.key === "4") {
      levelLogic = level4;
      levelIndex = 4
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
      doorOpen = false;
      keyUsed = false;  
      buttonPressed = false;
      button2Pressed = false;
      LevelMap()
      Ethereo()
    }
    //level selector acima
    
    if (
      !levelWall(newX, newY) &&
      !(doorX === newX && doorY === newY && !doorOpen)
    ) {
      playerX = newX;
      playerY = newY;
    }
    if (teleportX === newX && teleportY === newY && teleport2X !== null && teleport2X !== null) {
      playerX = teleport2X
      playerY = teleport2Y
    }
    if (teleport2X === newX && teleport2Y === newY && teleportX !== null && teleportX !== null) {
      playerX = teleportX
      playerY = teleportY
    }

    LevelMap();
  });

  LevelMap();
}
GameMenu();
GameLogic();