function CreateRandomBoard(){
var width=Math.floor((Math.random()*12)+3);
var height=Math.floor((Math.random()*10)+3)
let board=new Board(width, height);
board.draw();
FindGroups(board);
setClickEvents(board);
$("body").removeClass("noOverflow");
//buildFireWorks()
}
Board=function(width, height){
this.width=width;
this.height=height;
this.values=generateBoard();
this.draw=function(){
	var str=""
	for(let i=0; i<this.values.length;i++){
		str+="<div id='row"+i+"'>";
		for(let j=0;j<this.values[i].length;j++){
			str+="<span class='gamePiece sphere' id='piece"+j+"'>"+this.values[i][j].value+"</span>";
		}
		str+="</div>";
	}
	$("#board").html(str);
}
return this;
function generateBoard(){
	var res=[];
	do{
	for(let i=0;i<width;i++){
		res[i]=[];
		for(let j=0;j<height;j++){
			res[i][j]=generatePiece();
		}
	}}while(!CanWin(res));	
	return res;
}
function generatePiece(){
	return {value: Math.floor((Math.random()*5)+1)};
}


}
function FindGroups(board){
	for(let i=0; i<board.values.length;i++){
		
		for(let j=0;j<board.values[i].length;j++){
			let downChain=getChain([],"DOWN",board,i,j);
			if(downChain.length>3)
			downChain.forEach(function(location){
				highlightPiece(location.row, location.col)
			});
			let rightChain=getChain([],"RIGHT",board,i,j);
			if(rightChain.length>3)
			rightChain.forEach(function(location){
				highlightPiece(location.row, location.col)
			});
		}
		
	}
}

function getChain(pieces, direction, board, rowIndex, colIndex){
	if(direction=="DOWN")
	{
		let match=false;
		let current=board.values[rowIndex][colIndex]
		if(rowIndex+1<board.values.length)
			 match=board.values[rowIndex+1][colIndex].value==current.value;
		if(match){
			pieces.push({row:rowIndex, col:colIndex})
			pieces.push({row:rowIndex+1, col:colIndex});
			return getChain(pieces,"DOWN",board,rowIndex+1,colIndex);
		}
		return pieces;
	}
	if(direction=="RIGHT"){
		
		let match=false;
		let current=board.values[rowIndex][colIndex]
		if(colIndex+1<board.values[rowIndex].length)
			 match=board.values[rowIndex][colIndex+1].value==current.value;
		if(match){
			pieces.push({row:rowIndex, col:colIndex})
			pieces.push({row:rowIndex, col:colIndex+1});
			return getChain(pieces,"RIGHT",board,rowIndex,colIndex+1);
		}
		return pieces;
	}
	
}
function highlightPiece(row, col){
	let elem=$("#row"+row).find("#piece"+col)[0];
	$(elem).addClass("hilight")
}
var Clicked;
function setClickEvents(board){
	$(".gamePiece").on("click",function(){
		$(".gamePiece").removeClass("selected");
		let piece=this;
		$(piece).addClass("selected");
		//get piece coords
		let col=parseInt(piece.id.match(/\d+/g)[0]);
		let elem=$(piece).closest("div")[0];
		let row=parseInt(elem.id.match(/\d+/g));
		var location={row:row, col:col}
		if(Clicked!=undefined)
		{
			swap(Clicked,location,board);
			checkForWin(board);
		}
		else{
			Clicked=location;
		}
		
		
	});
}
function disableClickEvents(){
	$(".gamePiece").off("click");
}
function swap(piece1, piece2,board){
let piece1Value=board.values[piece1.row][piece1.col];
let piece2Value=board.values[piece2.row][piece2.col];
board.values[piece1.row][piece1.col]=piece2Value;
board.values[piece2.row][piece2.col]=piece1Value;
board.draw();
FindGroups(board);
Clicked=undefined;
setClickEvents(board);

}
function checkForWin(board){
	let pieces=$('.gamePiece:not(.hilight)');
	if(pieces.length==0){
		disableClickEvents()
		buildFireWorks();
	}
}
function CanWin(values){
	var counts=[];
	for(let i=0;i<values.length;i++){
		
		for(let j=0;j<values[i].length;j++){
			if(counts[values[i][j].value]==undefined)
			{
				counts[values[i][j].value]=1;
			}
			else{
				counts[values[i][j].value]++;
			}
		}
	}
	var enough=true;
	counts.forEach(function(count){
			if(count<3)
				enough=false;
	});
	return enough;
}