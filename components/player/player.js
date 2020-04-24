class Player{
  constructor(specs){
    window["player"+specs.id] = this;
    this.id             = specs.id;
    this.gameplay       = specs.gameplay;
    this.otherPlayer    = this.gameplay.nextPlayer(this.id);
    this.live           = live;
    this.isDefending    = false;
    this.weapon         = "defaultPlayer"+specs.id;
    this.damage         = null;
    this.name           = `joueur ${this.id}`;
    this.row            = specs.row;
    this.col            = specs.col;
    this.DOM            = document.createElement("div");
    this.availableMoves = [];

    this.getDamage();
    document.body.appendChild(this.DOM)

    // sometime this show null like value
    this.pass = this.pass.bind(this)
  }
  /**
   * show the player information
   * @return {HTMLelement}
   */
  render(){
      let html = `
      <div>
        <img src='public/images/player${this.id}.png' width='100' alt='window.player${this.id}'>
      </div>
      <input value="${this.name}" type="text" onchange="player${this.id}.updateName(this)">
      <div>live : ${this.live}</div>
      <div>weapon : ${this.weapon}</div>
      <div>damages : ${this.damage}</div>
    `;
    if ( this.gameplay.currentPlayer === this.id && this.gameplay.couldIfight()) {
      html += `
        <button onclick="window.player${this.id}.fight()">attaquer</button>
        <button onclick="window.player${this.id}.defend()">se défendre</button>
        <button onclick="window.player${this.id}.pass()">fuire</button>
        `; 
    }
    this.DOM.innerHTML = html;
  }
  /**
   * update the name of the player 
   * @param  {string} position [the name of the player]
   * @return {string}
   */
  updateName(input){
    this.name = input.value;
  }

  fight(){
    const gameGoesOn = window["player"+this.otherPlayer].update("domage", this.damage);
    if (!gameGoesOn) return;
    this.gameplay.nextTurn();
    this.render();
  }

  defend(){
    this.isDefending = true;
    this.gameplay.nextTurn();
    this.render();
  }
  pass(){
    const n = Object.keys(cases);
    let newCase = n[Math.floor(Math.random() * n.length)]
    let b = forbidden.includes(newCase);
    
    let p = positionPlayers.includes(newCase)

    // if yes try another case
    while(b || p){
      newCase = n[Math.floor(Math.random() * n.length)]
      p = positionPlayers.includes(newCase)
      b = forbidden.includes(newCase);
    }
    
    window.cases[newCase].update("player", this.id);
    this.moveToCase(newCase);

    this.render();
  }

  getDamage(){
    this.damage = weapons[this.weapon];
    this.render();
  }

  updateWeapon(newWeapon){
    const oldWeapon = this.weapon;
    this.weapon     = newWeapon;
    this.getDamage();
    return oldWeapon;
  }

  update(typeOfUpdate, newValue){

    switch (typeOfUpdate) {
      case "domage":
        if (this.isDefending) newValue = newValue/2;
        this.live -= newValue;
        if (this.live <= 0) {
          this.gameplay.end(this.otherPlayer);
          return false;
        } 
        this.render();
        break;
      default:
        // statements_def
        break;
    }
    return true;
  }

  showMoves(){
    let i;

    this.availableMoves = [];

    //boucle pour mouvement à droite
    for (i=1; i<=3; i++){
      if (! this.addMovable(this.row, this.col+i) ) i=10;
    }

    //boucle pour mouvement à gauche
    for (i=1; i<=3; i++){
      if (! this.addMovable(this.row, this.col-i) ) i=10;
    }

    //boucle pour mouvement bas
    for (i=1; i<=3; i++){
      if (! this.addMovable(this.row+i, this.col) ) i=10;
    }

    //boucle pour mouvement haut
    for (i=1; i<=3; i++){
      if (! this.addMovable(this.row-i, this.col) ) i=10;
    }
    this.render();
  }

  addMovable(row, col){
    if (! isInTheBoard(row, col)) return false;
    const target = rowConversion[row]+col;
    if (!window.cases[target].movable(this.id)) return false;
    this.availableMoves.push(target);
    return true;
  }

  moveToCase(newCase){

    // hide and remove  position to move
    this.hideMoves(newCase);
    // remove player on this case
    window.cases[rowConversion[this.row]+this.col].update("noMorePlayer");
    // add col and row player on the new case
    const newPosition = this.gameplay.convertPosition(newCase);
    this.col = newPosition.col;
    this.row = newPosition.row;

    // let other player to move
    this.gameplay.nextTurn();
  }


  // remove position to move
  hideMoves(newCase){
    const entries = this.availableMoves.length;

    for(let i=0; i< entries; i++){
      // do nothing 
      if ((this.availableMoves[i].includes(newCase)) ||(this.availableMoves[i].includes(positionPlayers[0])) || (this.availableMoves[i].includes(positionPlayers[1]))  ){
     
      }
      // just cancel move
      else{
        window.cases[this.availableMoves[i]].update("cancelMove");
      }
    }
  }

  isPlaying(){
    this.isDefending = false;
    let place1 = rowConversion[player1.row]+player1.col
    let place2 = rowConversion[player2.row]+player2.col
    let positionPlayers= [place1]
    positionPlayers.push(place2)

    window.positionPlayers = positionPlayers
    if( !this.gameplay.couldIfight()) this.showMoves();
    else this.render()
  }

  remove(){
    this.DOM.parentNode.removeChild(this.DOM);
    delete(window[`player${this.id}`]);
  }
}