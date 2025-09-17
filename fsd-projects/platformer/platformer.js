$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }

    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); // top wall
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "navy"); // bottom wall
    createPlatform(-50, -50, 50, canvas.height + 500); // left wall
    createPlatform(canvas.width, -50, 50, canvas.height + 100); // right wall

    //////////////////////////////////
    // ONLY CHANGE BELOW THIS POINT //
    //////////////////////////////////

    // TODO 1 - Enable the Grid
     toggleGrid();


    // TODO 2 - Create Platforms
createPlatform(500, 625, 200, 100);
createPlatform(850, 590, 200, 100, "red");
createPlatform(490, 400, 150, 100, "blue");
createPlatform(1150, 527, 200, 100, "yellow");
createPlatform(870, 392, 150, 100, "green");
createPlatform(1100, 720, 200, 20, "black");
createPlatform(1350, 620, 50, 20, "black");
    // TODO 3 - Create Collectables
createCollectable("steve", 1350, 570);
createCollectable("diamond", 300, 250);
createCollectable("diamond", 1050, 700);

    
    // TODO 4 - Create Cannons
createCannon("top", 1400, 600);
createCannon("right", 300, 600);
createCannon("top", 850, 1300);
    
    
    //////////////////////////////////
    // ONLY CHANGE ABOVE THIS POINT //
    //////////////////////////////////
  }

  registerSetup(setup);
});
