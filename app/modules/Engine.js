const myPlane=require("./myPlane.js");
const Enemy=require("./Enemy.js");
const QFTools=require("../libs/tools.js");

function Engine(){
	this.init();
}

Engine.prototype.init=function(){
	var _this=this;
	this.bodyMain=QFTools.$("#body_main");
	this.options=QFTools.$("#options");

	this.options.onclick=function(e){
		e=e||event;
		var target=e.target||e.srcElement;
		if(target.nodeName==="LI"){
			_this.diff=target.value;
			_this.bodyMain.removeChild(_this.options);
			_this.startAnimation();
		}
	};
}

Engine.prototype.startAnimation=function(){
	var top=0;
	setInterval(function(){
		top+=10;
		this.bodyMain.style.backgroundPositionY=top+"px";
	}.bind(this),30);
	var logo=QFTools.createDiv("logo");
	var loading=QFTools.createDiv("loading");
	var n=0;
	var timer=setInterval(function(){
		n++;
		loading.style.background="url(images/loading"+(n%3+1)+".png)";
		if(n>4){
			clearInterval(timer);
			document.body.removeChild(logo);
			document.body.removeChild(loading);
			this.startGame();
		}
	}.bind(this),500);
	
}

Engine.prototype.startGame=function(){
	myPlane.init(this.bodyMain).fire(this.diff);
	
	setInterval(()=>{
		var rand=Math.random().toFixed(2);
		if(rand<0.4){
			new Enemy(1,this.bodyMain);
		}else if(rand<0.6){
			new Enemy(2,this.bodyMain);
		}else if(rand<0.65){
			new Enemy(3,this.bodyMain);
		}
	},500);
}

module.exports=Engine;