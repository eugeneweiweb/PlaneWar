const QFTools=require("../libs/tools.js");
const myPlane=require("./myPlane.js");

class Enemy{
	constructor(type,bodyMain){
		this.type=type;
		this.bodyMain=bodyMain;
		this.init();
	}
	init(){
		switch(this.type){
			case 1:
				this.ele=QFTools.createDiv("enemy-small");
				this.speed=5;
				this.blood=1;
			break;
			case 2:
				this.ele=QFTools.createDiv("enemy-middle");
				this.speed=3;
				this.blood=8;
			break;
			case 3:
				this.ele=QFTools.createDiv("enemy-large");
				this.speed=1;
				this.blood=16;
			break;
		}
		//console.log(this.bodyMain);
		var min=this.bodyMain.offsetLeft;
		var max=this.bodyMain.offsetLeft+this.bodyMain.offsetWidth-this.ele.offsetWidth;
		var _left=parseInt(Math.random()*(max-min)+min);		
		var _top=-this.ele.offsetHeight;
		this.ele.style.top=_top+"px";
		this.ele.style.left=_left+"px";
		this.move();
	}
	move(){
		this.timer=setInterval(()=>{
			this.ele.style.top=this.ele.offsetTop+this.speed+"px";
			if(this.ele.style.top>this.bodyMain.offsetHeight){
				this.die();
			}
			var mleft=myPlane.ele.offsetLeft;
			var mright=mleft+myPlane.ele.offsetWidth;
			var mtop=myPlane.ele.offsetTop;
			var mbottom=mtop+myPlane.ele.offsetHeight;
			var eleft=this.ele.offsetLeft;
			var eright=eleft+this.ele.offsetWidth;
			var etop=this.ele.offsetTop;
			var ebottom=etop+this.ele.offsetHeight;
			if(!(ebottom<mtop||eleft>mright||etop>mbottom||eright<mleft)){
				if(confirm("失败，是否重新开始？")){
					window.location.reload(true);
			}
		}

		for(var i=0; i<myPlane.aBulltes.length; i++){
			var bleft=myPlane.aBulltes[i].ele.offsetLeft,
				bright=bleft+myPlane.aBulltes[i].ele.offsetWidth,
				btop=myPlane.aBulltes[i].ele.offsetTop,
				bbottom=btop+myPlane.aBulltes[i].ele.offsetHeight;

			if(!(ebottom<btop||eleft>bright||etop>bbottom||eright<bleft)){
				myPlane.aBulltes[i].die();

				if(--this.blood==0){
					this.die();
				}
			}
		}	


		},30);
	}
	die(){
		document.body.removeChild(this.ele);
		clearInterval(this.timer);
	}

}

module.exports=Enemy;