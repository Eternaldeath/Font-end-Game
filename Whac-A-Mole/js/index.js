

var start = document.getElementById('start');
start.onclick = function(){
	//初始化
secondDown();
var t = setTimeout("getOut()",Math.random()*400+800);
}
	

//获取方块集合
var cell = document.getElementsByClassName('cell');
var score = document.getElementById('score');
var time = document.getElementById("time");
var rank;
//count需要放在外面作为全局变量，而且需要先赋值，否则无法识别基本数据类型
var count = 0 ;
//设定定时器变量
var seconds = 100;


//图片动作 出来
function getOut(){
	rank = Math.floor(Math.random()*16);
    cell[rank].style.background = "black";
    cell[rank].setAttribute("onclick","die()");
    setTimeout("away()",Math.random()*400+800);
}

//图片跑了
function away(){
	cell[rank].style.background = "blue";
	cell[rank].removeAttribute("onclick");
	setTimeout("getOut()",Math.random()*400+800);
}

//图片死了
function die(){
	cell[rank].style.background = "red";
	cell[rank].removeAttribute("onclick");
	count++;
	score.innerHTML = count;
	
}

//倒计时
function secondDown(){
	
	if(seconds>0){
		seconds = seconds - 1;
		time.innerHTML = seconds;
	}else if(seconds == 0){
		clearTimeout(t);
		clearTimeout(t2);
		alert("您的成绩"+score.innerHTML);
	}
	var t2 = setTimeout("secondDown()",1000);
}





