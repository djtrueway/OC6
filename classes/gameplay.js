class GamePlay{
  /**
   * launch the game
   * @param  {integer} numberOfCol       [description]
   * @param  {integer} numberOfRow       [description]
   * @param  {integer} numberOfObstacles [description]
   * @return {void} 
   */
  constructor(numberOfCol, numberOfRow, numberOfObstacles){

    //on ajoute le joueur 1
    new Player(1);

    //on créer les cases du plateau
    let board         = document.createElement("div");
    board.id          = "plateau";
    board.style.width = `${numberOfCol*3.3}rem`;
    document.body.appendChild(board);
    let col = 0;
    let row = 0;
    const rowConversion = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o"];
    window.cases = {};
    const numberOfCases = numberOfCol * numberOfRow;
    for (let i = 0; i < numberOfCases; i++) {
      new Case(rowConversion[row], col, board);
      col++;
      if (col >= numberOfCol) {
        col = 0;
        row++;
      }
    }
    //on ajoute le joueur 2
    new Player(2);

    //on place les obstacles 
    
    //on place les armes
    
    //on places les joueurs
    //on verifie si case dispo
    window.player1.place();


  }


  placePlayer(){

  }
  placeWeapon(){

  }
  placeObstacle(){

  }
}