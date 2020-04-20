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

  updateName(input){
    this.name = input.value;
  }

  fight(){
    const gameGoesOn = window["player"+this.otherPlayer].update("domage", this.damage);
    if (!gameGoesOn) return;
    //this.hideMoves(rowConversion[this.row]+this.col);
    this.gameplay.nextTurn();
    this.render();
  }

  defend(){
    // if (this.otherPlayer === null) this.otherPlayer = this.gameplay.nextPlayer(this.id);
    // window["player"+this.otherPlayer].update("defend", this.damage);
    this.isDefending = true;
    this.gameplay.nextTurn();
    //this.hideMoves(rowConversion[this.row]+this.col);
    this.render();
  }
  pass(){
    const n = Object.keys(cases);
    //console.log(n);
    let newCase = n[Math.floor(Math.random() * n.length)]
    // verify if the case is forbidden
    let b = forbidden.includes(newCase);
    

    //console.log(positionPlayers)
    let p = positionPlayers.includes(newCase)

    // if yes try another case
    while(b || p){
      newCase = n[Math.floor(Math.random() * n.length)]
      p = positionPlayers.includes(newCase)
      b = forbidden.includes(newCase);
      //alert('forbidden')
    }
    
    //const newCase = this.availableMoves[Math.floor(Math.random()* this.availableMoves.length)];
    window.cases[newCase].update("player", this.id);
    this.moveToCase(newCase);

    // this.gameplay.nextTurn();
    // this.hideMoves();
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
    //console.log("update", typeOfUpdate, this.otherPlayer);
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
      // case "defend":
      //   this.live -= newValue;
      //   if (this.live <= 0) return this.gameplay.end(this.otherPlayer);
      //   this.render();
      //   break;
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
    //console.log("moveToCase", newCase);

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
    //console.log(this.availableMoves)
    //console.log(`new Case is ${newCase}`)
    for(let i=0; i< entries; i++){
      if ((this.availableMoves[i].includes(newCase)) ||(this.availableMoves[i].includes(positionPlayers[0])) || (this.availableMoves[i].includes(positionPlayers[1]))  ){
        //console.log(this.availableMoves[i].includes(newCase))
        //console.log('player1 ' + this.availableMoves[i].includes(positionPlayers[0]) + ' and' + positionPlayers[0])
        //console.log('player2  '+this.availableMoves[i].includes(positionPlayers[1]) +' and' + positionPlayers[1])
      }
      else{
        window.cases[this.availableMoves[i]].update("cancelMove");
        //console.log('pase')
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
