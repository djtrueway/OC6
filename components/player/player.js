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
}