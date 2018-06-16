var app= angular.module("myapp",[]);
app.controller("Democtrl",['$scope','$timeout',function($scope,$timeout){

var words=["elephant","mammal","house","doctor","farmer","mentor","friend"];
$scope.incorrectLettersChoosen=[];
$scope.correctLettersChoosen=[];
$scope.guesses=6;
$scope.displayword='';
$scope.input={
	letter : ''
}

var selectRandomWord = function(){
	var index=Math.round(Math.random()*words.length);
	return words[index];
}

var newGame = function(){
	$scope.incorrectLettersChoosen=[];
	$scope.correctLettersChoosen=[];
	$scope.guesses=6;
	$scope.displayword='';
	selectedWord=selectRandomWord();
	console.log(selectedWord);
	var tempDisplayWord= '';
	for (var i=0;i<selectedWord.length;i++){
		tempDisplayWord +='*'; 
	}
	console.log(tempDisplayWord);// this is shown in console
	$scope.displayWord=tempDisplayWord;

}
$scope.letterChosen=function(){
	for(i=0;i<$scope.correctLettersChoosen.length;i++){
		if($scope.correctLettersChoosen[i].toLowerCase()==$scope.input.letter.toLowerCase()){
			$scope.input.letter="";
			return ;
		}
	}

	for(i=0;i<$scope.incorrectLettersChoosen.length;i++){
		if($scope.incorrectLettersChoosen[i].toLowerCase()==$scope.input.letter.toLowerCase()){
			$scope.input.letter="";
			return ;
		}
	}
	
	var correct =false;
	for (var i=0;i<selectedWord.length;i++){
		if(selectedWord[i].toLowerCase()==$scope.input.letter.toLowerCase()){
			$scope.displayWord=$scope.displayWord.slice(0,i)+$scope.input.letter.toLowerCase()+$scope.displayWord.slice(i+1);
			correct=true;
		}
	}
	if(correct){
		$scope.correctLettersChoosen.push($scope.input.letter.toLowerCase());
	}else{
		$scope.guesses--;
		$scope.incorrectLettersChoosen.push($scope.input.letter.toLowerCase());
	}
	$scope.input.letter="";
	
	if ($scope.guesses==0){
		alert("You Lost!");
		$timeout(function(){
			newGame();
		},500);
	}
	
	if ($scope.displayWord.indexOf("*")==-1){
		alert("You Won. Yeaaahhhh !");
		$timeout(function(){
			newGame();
		},500);
	}
}

newGame();

}]);
