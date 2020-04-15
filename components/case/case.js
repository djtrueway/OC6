class Case{
  /**
   * [constructor description]
   * @param  {integer}     index        [description]
   * @param  {HTMLelement} DOMcontainer [description]
   * @return {[type]}              [description]
   */
  constructor(row, col, DOMcontainer){
    this.id               = row+col;
    window.cases[this.id] =this;
    this.DOM              = document.createElement("case");
    //this.DOM.innerText    = this.id;
    this.DOM.onclick      = null;

    DOMcontainer.appendChild(this.DOM);
    this.player   = null;
    this.obstacle = false;
    this.weapon   = null;
  }

  click(){
    if (!this.movable) return false;
    if (this.player) return false;
    this.update("player", this.playerMoving);
    this.playerMoving = null;
    if (this.weapon !== null) this.swapWeapon();
    window["player"+this.player].moveToCase(this.id);
  }

  update(things, newValue=null){
    switch (things) {
      case "player":
        this.player = newValue;
        break;
      case "noMorePlayer":
        this.player = null;
        break;
      case "obstacle":
        this.obstacle = true;
        break;
      case "weapon":
        this.weapon = newValue;
        break;
      case "cancelMove":
        this.DOM.classList.remove("movable");
        this.playerMoving = null;
        break;
      default:
        // statements_def
        break;
    }
    if (this.player !== null)   return this.DOM.className = "player"+newValue;
    if (this.weapon !== null)   return this.DOM.className = "weapon_"+this.weapon;
    if (this.obstacle) return this.DOM.className = "obstacle";
    this.DOM.className = "empty";
  }


  // add the click on the cases
  movable(playerId){
    if (this.obstacle) return false;
    if (this.player)   return false;
    this.DOM.classList.add("movable");
    this.DOM.onclick = this.click.bind(this);
    this.playerMoving = playerId;
    return true;
  }

  swapWeapon(){
    this.weapon = window[`player${this.player}`].updateWeapon(this.weapon);
  }
}