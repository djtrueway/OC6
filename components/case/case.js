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
		DOMcontainer.appendChild(this.DOM);
	}

	showPlayer(){
		this.DOM.className = "player1";
	}
	
	showPlayer2(){
		this.DOM.className = "player2";
	}
}

