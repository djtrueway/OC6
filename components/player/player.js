class Player{
  constructor(specs){
    window["player"+specs.id] = this;
    this.id             = specs.id;
    this.gameplay       = specs.gameplay;
    this.otherPlayer = this.gameplay.nextPlayer(this.id);
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
  }

  render(){
      let html = `
      <div>
        <img src='' alt='window.player${this.id}'>
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
        <button onclick="window.player${this.id}.pass()">ne rien faire</button>
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
    this.hideMoves();
    this.gameplay.nextTurn();
    this.render();
  }

  defend(){
    // if (this.otherPlayer === null) this.otherPlayer = this.gameplay.nextPlayer(this.id);
    // window["player"+this.otherPlayer].update("defend", this.damage);
    this.isDefending = true;
    this.gameplay.nextTurn();
    this.hideMoves();
    this.render();
  }
  pass(){
    this.gameplay.nextTurn();
    this.hideMoves();
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
    console.log("update",typeOfUpdate, this.otherPlayer);
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
    let pointer;

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
    this.hideMoves(newCase);
    window.cases[rowConversion[this.row]+this.col].update("noMorePlayer");
    const newPosition = this.gameplay.convertPosition(newCase);
    this.col = newPosition.col;
    this.row = newPosition.row;
    // this.render();
    

    // if (!this.gameplay.couldIfight()) this.gameplay.nextTurn();
    // else this.gameplay.couldIfight();
     this.gameplay.nextTurn();
  }

  hideMoves(newCase=rowConversion[this.row]+this.col){
    const entries = this.availableMoves.length;
    for(let i=0; i< entries; i++){
      if (this.availableMoves[i] === newCase) continue;
      window.cases[this.availableMoves[i]].update("cancelMove");
    }
  }

  isPlaying(){
    this.isDefending = false;
    this.showMoves();
  }

  remove(){
    this.DOM.parentNode.removeChild(this.DOM);
    delete(window[`player${this.id}`]);
  }
}