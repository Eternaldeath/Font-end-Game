window.onload=function(){
	alert('请选择对战模式后开始');
	
	var chess=document.getElementById('chess');
	var friend=document.getElementById('friend');
	var comp=document.getElementById('comp');
	var context=chess.getContext('2d');
	var me=true;
	var chessBorad=[];
	var wins = [];
	//赢法种类
	var count=0;
	var myWin=[];
	var computerWin=[];
	var over=false;
	
	context.strokeStyle ="lightgray";

	//棋盘数组化
	for(var i=0;i<15;i++){
		chessBorad[i]=[];
		for(var j=0;j<15;j++){
			chessBorad[i][j]=0;
		}
	}
	
	//算法——赢法数组

//遍历棋盘
	for(var i=0;i<15;i++){
		wins[i] = [];
		for(var j=0;j<15;j++){
			wins[i][j]=[];
		}
	}
	for(var i=0;i<15;i++){
		for(var j=0;j<11;j++){
			for(k=0;k<5;k++){
				wins[i][j+k][count]=true;
			}
			count++;
		}
	}
	
		for(var i=0;i<15;i++){
		for(var j=0;j<11;j++){
			for(k=0;k<5;k++){
				wins[j+k][i][count]=true;
			}
			count++;
		}
	}
		
			for(var i=0;i<11;i++){
		for(var j=0;j<11;j++){
			for(k=0;k<5;k++){
				wins[i+k][j+k][count]=true;
			}
			count++;
		}
	}
		
		for(var i=0;i<11;i++){
			for(var j=14;j>3;j--){
				for(k=0;k<5;k++){
					wins[i+k][j-k][count]=true;
			}
			count++;
		}
	}
	
	
	var drayLine =function(){	
		for(var i=0;i<15;i++){
		//纵向线
		context.moveTo(15+i*30,15);
		context.lineTo(15+i*30,435);

		//横向线
		context.moveTo(15,15+i*30);
		context.lineTo(435,15+i*30);
		context.stroke();
		
		}
	}	
	//设置背景图片(*)
	var logo=new Image();
		logo.src="img/免扣中国龙.png";
		//必须要使用onload调用，否则只是缓存了图片而已
		logo.onload=function(){
			context.drawImage(logo,0,0,450,450);
			drayLine();

		}
		
	//设计棋子的图片
	var onestep = function(i,j,me){
		context.beginPath();
		context.arc(15+i*30,15+j*30,13,0,2*Math.PI);
		context.closePath();
		//设计棋子的颜色渐变
		var gradient= context.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,0);
		if(me){
			gradient.addColorStop(0,"#0A0A0A");
			gradient.addColorStop(1,"#636766");
		}else{
			gradient.addColorStop(0,"#D1D1D1");
			gradient.addColorStop(1,"#F9F9F9");
		}
		context.fillStyle=gradient;
		context.fill();
	}
	

				
				//赢法统计数组
			
				
				for(var i=0;i<count;i++){
					myWin[i]=0;
					computerWin[i]=0;
				}
				
					//落子
	friend.onclick=function(){	
		alert('基友对战');
	chess.onclick=function(e){
		if(over){
			return ;
		}

		var x=e.offsetX;
		var y=e.offsetY;
		var i=Math.floor(x/30);
		var j=Math.floor(y/30);
		if(chessBorad[i][j]==0){
			onestep(i,j,me);
			if(me){
			chessBorad[i][j]=1;
			}else {
			chessBorad[i][j]=2;	
			}
			me=!me;
		for(var k=0;k<count;k++){
			if(me==false){
			if(wins[i][j][k]){
				myWin[k]++;
				computerWin[k]=6;
				if(myWin[k]==5){
					over=true;
					window.alert("傻吊，你以为你赢了我就会表扬你！");
				}
			}
			}else{
				if(wins[i][j][k]){
				computerWin[k]++;
				myWin[k]=6;
				if(computerWin[k]==5){
					over=true;
					window.alert("赢了很了不起吗");
				}
			}
			}
		}
//		if(!over){
//			me=!me;
//			computerAI();
//		}
		}
	}
}	
	
	
	comp.onclick=function(){
		alert('听说单身的才玩人机');
	chess.onclick=function(e){
		if(over){
			return ;
		}
		if(!me){
			return ;
		}
		var x=e.offsetX;
		var y=e.offsetY;
		var i=Math.floor(x/30);
		var j=Math.floor(y/30);
		if(chessBorad[i][j]==0){
			onestep(i,j,me);
			chessBorad[i][j]=1;
		for(var k=0;k<count;k++){
			if(wins[i][j][k]){
				myWin[k]++;
				computerWin[k]=6;
				if(myWin[k]==5){
					window.alert("傻吊，你以为你赢了我就会表扬你！");
					over=true;
				}
			}
		}
		if(!over){
			me=!me;
			computerAI();
		}
		}
	}
	}
	var computerAI =function(){
		var myScore=[];
		var computerScore=[];
		//保存分数
		var max=0;
		//保存坐标
		var u=0,v=0;
		for(var i=0;i<15;i++){
			myScore[i]=[];
			computerScore[i]=[];
			for(var j=0;j<15;j++){
				myScore[i][j]=0;
				computerScore[i][j]=0;
			}
		}
		for(var i=0;i<15;i++){
			for(var j=0;j<15;j++){
				if(chessBorad[i][j]==0){
					for(var k=0;k<count;k++){
						if(wins[i][j][k]){
							if(myWin[k]==1){
								myScore[i][j]+=200;
							}else if(myWin[k]==2){
								myScore[i][j]+=400;
							}else if(myWin[k]==3){
								myScore[i][j]+=2000;
							}else if(myWin[k]==4){
								myScore[i][j]+=10000;
							}
							if(computerWin[k]==1){
								computerScore[i][j]+=220;
							}else if(computerWin[k]==2){
								computerScore[i][j]+=420;
							}else if(computerWin[k]==3){
								computerScore[i][j]+=2200;
							}else if(computerWin[k]==4){
								computerScore[i][j]+=20000;
							}
						}
					}
					if(myScore[i][j]>max){
						max=myScore[i][j];
						u=i;
						v=j;
					}
					else if(myScore[i][j]==max){
						if(computerScore[i][j]>computerScore[u][v]){
							u=i;
							v=j;
						}
					}
					if(computerScore[i][j]>max){
						max=computerScore[i][j];
						u=i;
						v=j;
					}
					else if(computerScore[i][j]==max){
						if(myScore[i][j]>myScore[u][v]){
							u=i;
							v=j;
						}
					}
				}
			}
		}
		onestep(u,v,false);
		//表示落子
		chessBorad[u][v]=2;
				for(var k=0;k<count;k++){
			if(wins[u][v][k]){
				computerWin[k]++;
				myWin[k]=6;
				if(computerWin[k]==5){
					window.alert("计算机赢了，这智商也就撒尿和泥玩了");
					over=true;
				}
			}
		}
		if(!over){
			me=!me;
		}
	}
	
}
