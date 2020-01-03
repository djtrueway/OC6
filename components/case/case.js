class Case{
	/**
	 * [constructor description]
	 * @param  {integer}     index        [description]
	 * @param  {HTMLelement} DOMcontainer [description]
	 * @return {[type]}              [description]
	 */
	constructor(index, DOMcontainer){
		window.cases.push(this);
		this.id = index;
		this.DOM = document.createElement("case");
		DOMcontainer.appendChild(this.DOM);
	}

	showPlayer(){
		this.DOM.className = "player1";
	}
}