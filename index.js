const game = {
  row : 10,
  col : 10,
  obstacles : 12
}

/**
 * check if the position asked is in the board
 * @param  {integer}  row [description]
 * @param  {integer}  col [description]
 * @return {Boolean}     [description]
 */
function isInTheBoard(row, col){
  console.log('isInTheBoard row:',row,"col:",col);
  if (row < 0 || col < 0 || row >= game.row || col >= game.col) return false;
  return true;
}

const rowConversion = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o"];
// const gameplay =
new GamePlay(game);