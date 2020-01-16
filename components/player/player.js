class Player{
  constructor(id){
    window["player"+id] = this;
    this.id             = id;
    this.live           = 10;
    this.weapon         = undefined;
    this.name           = `joueur ${id}`;
    this.row;
    this.col;
    this.DOM = document.createElement("div");
    this.DOM.innerHTML = this.template();
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
   cases.a0.DOM.innerHTML = this.name
  }
}