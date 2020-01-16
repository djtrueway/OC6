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
		this.DOM.innerHTML = this.id;
		this.DOM.onclick = this.click.bind(this)

		DOMcontainer.appendChild(this.DOM);
	}

	click(){
		alert(this.id)
	}
	
	showPlayer(){
		
	}
	
}

