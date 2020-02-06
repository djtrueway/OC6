class Player{
  constructor(specs){
    window["player"+specs.id] = this;
    this.id             = specs.id;
    this.live           = 10;
    this.weapon         = "defaultPlayer"+specs.id;
    this.name           = `joueur ${this.id}`;
    this.row            = specs.row;
    this.col            = specs.col;
    this.DOM            = document.createElement("div");
    this.DOM.innerHTML  = this.template();
    this.availableMoves = [];
    document.body.appendChild(this.DOM)
  }

  template(){
    return `
      <input value="${this.name}" type="text" onchange="player${this.id}.updateName(this)">
      <div>live : ${this.live}</div>
      <div>weapon : ${this.weapon}</div>
    `;
  }

  updateName(input){

  }

  place(){
   // cases.a0.DOM.innerHTML = this.name
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
  }

  addMovable(row, col){
    if (! isInTheBoard(row, col)) return false;
    const target = rowConversion[row]+col;
    if (!window.cases[target].movable(this.id)) return false;
    this.availableMoves.push(target);
    return true;
  }

  moveToCase(newCase){
    const entries = this.availableMoves.length;
    for(let i=0; i< entries; i++){
      if (this.availableMoves[i] !== newCase) window.cases[this.availableMoves[i]].update("cancelMove");
    }
    window.cases[rowConversion[this.row]+this.col].update("noMorePlayer");
    const newPosition = gameplay.convertPosition(newCase);
    this.col = newPosition.col;
    this.row = newPosition.row;
    gameplay.nextTurn();
  }
}