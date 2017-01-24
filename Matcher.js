function CreateRandomBoard(){
var width=Math.floor((Math.random()*12)+3);
var height=Math.floor((Math.random()*12)+3)
let board=new Board(width, height);
board.draw();
}
Board=function(width, height){
this.width=width;
this.height=height;
let board=generateBoard();
this.draw=function(){
	var str=""
	for(let i=0; i<board.length;i++){
		str+="<div id='row"+i+"'>";
		for(let j=0;j<board[i].length;j++){
			str+="<span id='piece"+j+"'>"+board[i][j]+"</span>";
		}
		str+="</div>";
	}
	$("#board").html(str);
}
return this;
function generateBoard(){
	var res=[];
	for(let i=0;i<width;i++){
		res[i]=[];
		for(let j=0;j<height;j++){
			res[i][j]=Math.floor((Math.random()*5))
		}
	}
	return res;
}
function generatePiece(){
	return Math.floor((Math.random()*5));
}
function FindGroups(){
	for(let i=0; i<board.length;i++){
		
		for(let j=0;j<board[i].length;j++){
			//get pieces touching this piece
			
		
		}
		
	}
}
}