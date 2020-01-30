class Case{
	/**
	 * [constructor description]
	 * @param  {integer}     index        [description]
	 * @param  {HTMLelement} DOMcontainer [description]
	 * @return {[type]}              [description]
	 */
	constructor(row, col, DOMcontainer){
		this.id								= row+col;
		window.cases[this.id]	=this;
		this.DOM							= document.createElement("case");
		this.DOM.innerHTML		= this.id;
		this.DOM.onclick			= null;

		DOMcontainer.appendChild(this.DOM);
		this.player		= null;
		this.obstacle	= false;
		this.weapon		= null;
	}

	click(){
		alert(this.id)
	}
	
	showPlayer(){
		
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
			default:
				// statements_def
				break;
		}
		if (this.player !== null)   return this.DOM.className = "player"+newValue;
		if (this.weapon !== null)   return this.DOM.className = "weapon_"+this.weapon;
		if (this.obstacle) return this.DOM.className = "obstacle";
		this.DOM.className = "empty";
	}

	movable(){
		if (this.obstacle) return false;
		this.DOM.classList.add("movable");
		this.DOM.onclick = this.click.bind(this);
		return true;
	}
	
}

