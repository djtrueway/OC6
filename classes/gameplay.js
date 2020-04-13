class GamePlay{
  /**
   * launch the game
   * @param  {integer} numberOfCol       [description]
   * @param  {integer} numberOfRow       [description]
   * @param  {integer} numberOfObstacles [description]
   * @return {void} 
   */
  constructor(game){

    let numberOfCol       = game.row;
    let numberOfRow       = game.col;
    let numberOfObstacles = game.obstacles;
    let started           = false;

    //on créer le plaeau et les cases du plateau
    this.board         = document.createElement("div");
    this.board.id          = "plateau";
    this.board.style.width = `${numberOfCol*3.3}rem`;
    this.numberOfCol = numberOfCol;
    this.numberOfRow = numberOfRow;
    let col = 0;
    let row = 0;
    
    window.cases = {};
    const numberOfCases = numberOfCol * numberOfRow;
    for (let i = 0; i < numberOfCases; i++) {
      new Case(rowConversion[row], col, this.board);
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
    for (let i=2; i<weaponNames.length; i++){
      window.cases[weaponList[i]].update("weapon", weaponNames[i]);
    }

    //on défini la place du joueur 1
    forbidden      = forbidden.concat(weaponList);

    let playerCase = false;
    while (!playerCase) {
      let total = 0;
      playerCase = this.getItemsPostion(1, forbidden)[0];
      playerCase = this.convertPosition(playerCase);
      if (this.checkCaseAvailable( playerCase.row -1, playerCase.col    , forbidden )) total++;
      if (this.checkCaseAvailable( playerCase.row,    playerCase.col -1 , forbidden )) total++;
      if (this.checkCaseAvailable( playerCase.row,    playerCase.col +1 , forbidden )) total++;
      if (this.checkCaseAvailable( playerCase.row +1, playerCase.col    , forbidden )) total++;
      if ( total !== 0) playerCase = false;
      else playerCase = rowConversion[playerCase.row]+playerCase.col;
    }


    window.cases[playerCase].update("player", 1);

    //on ajoute le joueur 1 et le plateau
    new Player({ "id":1, ...this.convertPosition(playerCase), "gameplay":this});
    document.body.appendChild(this.board);

    //on ajoute la position du joueur à la liste des positions indisponibles
    forbidden.push(playerCase);

    //on ajoute les cases autour du joeur 1 afin d'éviter que les joueurs soient mis à coté l'un de l'autre
    // console.log(playerCase);
    playerCase = this.convertPosition(playerCase);


    // console.log(playerCase);
    if (isInTheBoard( playerCase.row -1, playerCase.col -1 )) forbidden.push(rowConversion[playerCase.row -1] + (playerCase.col -1));
    if (isInTheBoard( playerCase.row -1, playerCase.col    )) forbidden.push(rowConversion[playerCase.row -1] + (playerCase.col));
    if (isInTheBoard( playerCase.row -1, playerCase.col +1 )) forbidden.push(rowConversion[playerCase.row -1] + (playerCase.col +1));
    if (isInTheBoard( playerCase.row,    playerCase.col -1 )) forbidden.push(rowConversion[playerCase.row]    + (playerCase.col -1));
    if (isInTheBoard( playerCase.row,    playerCase.col +1 )) forbidden.push(rowConversion[playerCase.row]    + (playerCase.col +1));
    if (isInTheBoard( playerCase.row +1, playerCase.col -1 )) forbidden.push(rowConversion[playerCase.row +1] + (playerCase.col -1));
    if (isInTheBoard( playerCase.row +1, playerCase.col    )) forbidden.push(rowConversion[playerCase.row +1] + (playerCase.col));
    if (isInTheBoard( playerCase.row +1, playerCase.col +1 )) forbidden.push(rowConversion[playerCase.row +1] + (playerCase.col +1));

    //on défini la place du joueur 2
    // console.log(forbidden);
    playerCase = this.getItemsPostion(1, forbidden)[0];
    window.cases[playerCase].update("player", 2);
    new Player({ "id":2, ...this.convertPosition(playerCase), "gameplay":this});

    //on lance le jeu
    this.currentPlayer = 0;
    this.nextTurn();
    this.started = true;
  }

  checkCaseAvailable(row, col, forbidden){
    if (forbidden.indexOf(rowConversion[row]+col) >= -1) return false;
    return true;
  }

  /**
   * generate a random position on the board
   * @return {string} [description]
   */
  getPosition(){
   return rowConversion[Math.floor(Math.random() * Math.floor(this.numberOfRow))]+(Math.floor(Math.random() * Math.floor(this.numberOfCol)));
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
   * convert the string position to an object "player" where row is a number
   * @param  {string} position [description]
   * @return {json}
   */
  convertPosition(position){
    position = position.split('');
    return {
      "col" : Number(position[1]),
      "row" : rowConversion.indexOf(position[0])
    }
  }

  couldIfight(){
    let common = 0;
    if (window.player1.col === window.player2.col    ) common++;
    if (window.player1.col === window.player2.col -1 ) common++;
    if (window.player1.col === window.player2.col +1 ) common++;
    if (window.player1.row === window.player2.row    ) common++;
    if (window.player1.row === window.player2.row -1 ) common++;
    if (window.player1.row === window.player2.row +1 ) common++;
    if (common === 2){
      console.log('fight')
      return true;
    } 
    return false;
  }

  nextPlayer(player){
    player++;
    if (player>2) return 1;
    return player;
  }

  nextTurn(){
    this.currentPlayer = this.nextPlayer(this.currentPlayer);
    //console.log("joueur",this.currentPlayer, "joue");
    window["player"+this.currentPlayer].isPlaying();
  }

  end(other){
    // alert(`le joueur ${winnerName} a gagné`);
    const winnerName      = window[`player${other}`].name+"";
    window.player1.remove();
    window.player2.remove();
    this.board.parentNode.removeChild(this.board);
    this.DOMend           = document.createElement("endscreen");
    this.DOMend.innerHTML = this.renderEnd (winnerName);
    // this.DOMend.onclick = 
    document.body.appendChild(this.DOMend);
  }

  renderEnd(winnerName){
      return `       
      <modale>${winnerName} a gagné<br></br>
      <button onclick='replay()'> replay </button>
      </modale>
      `;
  }
}