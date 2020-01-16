class GamePlay{
  /**
   * launch the game
   * @param  {integer} numberOfCol       [description]
   * @param  {integer} numberOfRow       [description]
   * @param  {integer} numberOfObstacles [description]
   * @return {void} 
   */
  constructor(numberOfCol, numberOfRow, numberOfObstacles){
    //on créer le plaeau et les cases du plateau
    let board         = document.createElement("div");
    board.id          = "plateau";
    board.style.width = `${numberOfCol*3.3}rem`;
    this.numberOfCol = numberOfCol;
    this.numberOfRow = numberOfRow;
    let col = 0;
    let row = 0;
    this.rowConversion = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o"];
    window.cases = {};
    const numberOfCases = numberOfCol * numberOfRow;
    for (let i = 0; i < numberOfCases; i++) {
      new Case(this.rowConversion[row], col, board);
      col++;
      if (col >= numberOfCol) {
        col = 0;
        row++;
      }
    }

    //on place les obstacles 
    let forbidden = this.getItemsPostion(numberOfObstacles);
    for (let i=0; i<numberOfObstacles; i++){
      window.cases[forbidden[i]].update("obstacle");
    }
   
    //on place les armes
    const weaponNames = Object.keys(weapons);
    const weaponList = this.getItemsPostion(weaponNames.length, forbidden);
    for (let i=0; i<weaponNames.length; i++){
      window.cases[weaponList[i]].update("weapon", weaponNames[i])
    }

    //on défini la place du joueur 1
    forbidden      = forbidden.concat(weaponList);
    let playerCase = this.getItemsPostion(1, forbidden)[0];
    window.cases[playerCase].update("player", 1);

    //on ajoute le joueur 1 et le plateau
    new Player({ "id":1, ...this.convertPosition(playerCase)});
    document.body.appendChild(board);

    //on ajoute la position du joueur à la liste des positions indisponibles
    forbidden.push(playerCase);

    //on ajoute les cases autour du joeur 1 afin d'éviter que les joueurs soient mis à coté l'un de l'autre
    playerCase = this.convertPosition(playerCase);
    if (this.isInTheBoard( playerCase.row -1, playerCase.col -1 )) forbidden.push(this.rowConversion[playerCase.row -1] + (playerCase.col -1));
    if (this.isInTheBoard( playerCase.row -1, playerCase.col    )) forbidden.push(this.rowConversion[playerCase.row -1] + (playerCase.col));
    if (this.isInTheBoard( playerCase.row -1, playerCase.col +1 )) forbidden.push(this.rowConversion[playerCase.row -1] + (playerCase.col +1));
    if (this.isInTheBoard( playerCase.row,    playerCase.col -1 )) forbidden.push(this.rowConversion[playerCase.row]    + (playerCase.col -1));
    if (this.isInTheBoard( playerCase.row,    playerCase.col +1 )) forbidden.push(this.rowConversion[playerCase.row]    + (playerCase.col +1));
    if (this.isInTheBoard( playerCase.row +1, playerCase.col -1 )) forbidden.push(this.rowConversion[playerCase.row +1] + (playerCase.col -1));
    if (this.isInTheBoard( playerCase.row +1, playerCase.col    )) forbidden.push(this.rowConversion[playerCase.row +1] + (playerCase.col));
    if (this.isInTheBoard( playerCase.row +1, playerCase.col +1 )) forbidden.push(this.rowConversion[playerCase.row +1] + (playerCase.col +1));

    //on défini la place du joueur 2
    playerCase = this.getItemsPostion(1, forbidden)[0];
    window.cases[playerCase].update("player", 2);
    new Player({ "id":2, ...this.convertPosition(playerCase)});
  }

  /**
   * generate a random position on the board
   * @return {string} [description]
   */
  getPosition(){
   return this.rowConversion[Math.floor(Math.random() * Math.floor(this.numberOfRow))]+(Math.floor(Math.random() * Math.floor(this.numberOfCol)));
  }

  /**
   * check if the position asked is in the board
   * @param  {integer}  row [description]
   * @param  {integer}  col [description]
   * @return {Boolean}     [description]
   */
  isInTheBoard(row, col){
    if (row < 0 || col < 0 ) return false;
    return true;
  }


  /**
   * generate a list of positions only where it's allowed
   * @param  {integer}  qty     the number of positions wanted
   * @param  [{Array}]  exclude optional: array where the generated position couldn't be
   * @return {Array}            the positions list
   */
  getItemsPostion(qty, exclude=[]){
    let list = [];
    let position;
    for (let i=0; i<qty; i++){
      position = this.getPosition();
      if (list.indexOf(position) !== -1 || exclude.indexOf(position) !== -1 ) {
        i--;
        continue;
      }
      list.push(position);
    }
    return list;
  }

  /**
   * convert the string position to an object where row is a number
   * @param  {string} position [description]
   * @return {json}
   */
  convertPosition(position){
    position = position.split('');
    return {
      "col" : Number(position[1]),
      "row" : this.rowConversion.indexOf(position[0])
    }
  }
}