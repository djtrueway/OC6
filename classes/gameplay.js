class GamePlay{
  /**
   * launch the game
   * @param  {integer} numberOfObstacles [description]
   * @param  {integer} numberOfCases     [description]
   * @return {void} 
   */
  constructor(numberOfCases, numberOfObstacles){
    //on créer les cases du plateau
    let board         = document.createElement("div");
    board.id          = "plateau";
    board.style.width = `${Math.sqrt(numberOfCases)*3.3}rem`;
    document.body.appendChild(board);
    for (let i = 0; i < numberOfCases; i++) {
      new Case(i, board);
    }
  }


  placePlayer(){

  }
  placeWeapon(){

  }
  placeObstacle(){

  }
}