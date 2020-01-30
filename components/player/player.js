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

    //boucle pour mouvement à droite
    for (i=1; i<=3; i++){
      pointer = this.col+i;
      if (isInTheBoard(this.row, pointer)) window.cases[rowConversion[this.row]+pointer].movable()
    }

    //boucle pour mouvement à gauche
    for (i=1; i<=3; i++){
      pointer = this.col-i;
      if (isInTheBoard(this.row, pointer)) {
        console.log(window.cases[rowConversion[this.row]+pointer].movable())
        if (!window.cases[rowConversion[this.row]+pointer].movable()) i=10;
      }
    }
  }
}