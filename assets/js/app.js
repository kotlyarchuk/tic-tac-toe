$(document).ready(function(){
  renderField();
});

var gameField = [[]];
for (var i = 0; i < 3; i++) {
    gameField[i] = [];
    for (var j = 0; j < 3; j++) {
      gameField[i][j] =  "<div class='field-block' x="+i+" y="+j+"></div>";
    }
}

var p1turn = true;
var winType = [];



// ********************************
//           FUNCTIONS
// ********************************

function renderField(){
  container = $(".container");
  container.empty();
  for (var i = 0; i < gameField.length; i++) {
    for (var j = 0; j < gameField[i].length; j++) {
      container.append( gameField[i][j] );
    }
  }
  $(".field-block").on("click", placeSymbol);
}

function placeSymbol(){
  p1turn ? $(this).addClass("x") : $(this).addClass("circle");
  checkGame();
  p1turn = !p1turn;
}

function checkGame(){
  //row checkGame
  for(var i = 0; i < 3; i++){
    if ( ($("div[x=0][y="+i+"]").hasClass("x") && $("div[x=1][y="+i+"]").hasClass("x") &&  $("div[x=2][y="+i+"]").hasClass("x") )) {
      winType.push("col", i);
      endGame();
    }
    if ( $("div[x=0][y="+i+"]").hasClass("circle") && $("div[x=1][y="+i+"]").hasClass("circle") &&  $("div[x=2][y="+i+"]").hasClass("circle") ) {
      winType.push("col", i);
      endGame();
    }
  }


  //cols check
  for(var i = 0; i < 3; i++){
    if ( $("div[x="+i+"][y=0]").hasClass("x") && $("div[x="+i+"][y=1]").hasClass("x") &&  $("div[x="+i+"][y=2]").hasClass("x") ) {
      winType.push("row", i);
      endGame();
    }
    if ( $("div[x="+i+"][y=0]").hasClass("circle") && $("div[x="+i+"][y=1]").hasClass("circle") &&  $("div[x="+i+"][y=2]").hasClass("circle") ) {
      winType.push("row", i);
      endGame();
    }
  }

  //diagonal check
  if( $("div[x=0][y=0]").hasClass("x") && $("div[x=1][y=1]").hasClass("x") && $("div[x=2][y=2]").hasClass("x") ){
    winType.push("diag", 1);
    endGame();
  }
  if( $("div[x=0][y=0]").hasClass("circle") && $("div[x=1][y=1]").hasClass("circle") &&  $("div[x=2][y=2]").hasClass("circle") ){
    winType.push("diag", 1);
    endGame();
  }

  if( $("div[x=2][y=0]").hasClass("x") && $("div[x=1][y=1]").hasClass("x") && $("div[x=0][y=2]").hasClass("x") ){
    winType.push("diag", 2);
    endGame();
  }
  if( $("div[x=2][y=0]").hasClass("circle") && $("div[x=1][y=1]").hasClass("circle") &&  $("div[x=0][y=2]").hasClass("circle") ){
    winType.push("diag", 2);
    endGame();
  }
}


function endGame(){
  $(".field-block").off();
  if(winType[0] === "col"){
    for(var i = 0; i < 3; i++){
      $("div[x="+i+"][y="+winType[1]+"]").addClass("ychecked");
    }
  }
  if(winType[0] === "row"){
    for(var i = 0; i < 3; i++){
      $("div[x="+winType[1]+"][y="+i+"]").addClass("xchecked");
    }
  }
  if(winType[0] === "diag"){
    if(winType[1] === 1){
      $("div[x=0][y=0]").addClass("diagchecked1");
      $("div[x=1][y=1]").addClass("diagchecked1");
      $("div[x=2][y=2]").addClass("diagchecked1");
    }
    if(winType[1] === 2){
      $("div[x=2][y=0]").addClass("diagchecked2");
      $("div[x=1][y=1]").addClass("diagchecked2");
      $("div[x=0][y=2]").addClass("diagchecked2");
    }
  }
}

function newGame(){

}
