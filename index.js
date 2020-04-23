 $(function(){

  const game = {
    col : 10,
    row : 10
  }

  let DOM = document.createElement('div')
  //let DOM = $('div').attr('id', 'option')
  DOM.id = 'option'

  document.body.appendChild(DOM)
  //$('body').append(DOM)

  function render(){

   
      let html = `
    <div class='container start'>
      <div class='row'>
        <div class='col-12'>
          <div class='form-group'>
            <input  type="text" id='obstacle' class='form-control' placeholder='obstacle'">
          </div>
          
          
          <div class='form-group'>
           <input  type="text" id='live'  class='form-control' placeholder='live'">
          </div>
        </div>
      </div>
  `
    html += `
    <div class='col-5 mx-auto'>
      <button class='btn btn-primary' >Commencer</button>
    </div>
    </div>
      `; 
  DOM.innerHTML = html;
    return false
    
}
  
  /**
   * check if the position asked is in the board
   * @param  {integer}  row [description]
   * @param  {integer}  col [description]
   * @return {Boolean}     [description]
   */
  function isInTheBoard(row, col){
    // console.log('isInTheBoard row:',row,"col:",col);
    if (row < 0 || col < 0 || row >= game.row || col >= game.col) return false;
    return true;
  }
  window.isInTheBoard = isInTheBoard
  window.rowConversion = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o"];

  // this function will run the game
    function run(){
    game.obstacles = $('#obstacle').val()
    window.live = $('#live').val()
    if((game.obstacles >= 6 && game.obstacles <= 15) && (window.live >= 50 && window.live <= 250)){
      $('#option').hide();
      delete window.player2;
      delete window.player1;
      new GamePlay(game);
    }
    else alert('Obstacle entre 6 et 15 && live entre 50 et 250')
   
  }
  render()

  function replay(){
    $('endscreen').hide()
    new GamePlay(game);
  }

  window.replay = replay
  document.querySelector('button').onclick = run 
  
})