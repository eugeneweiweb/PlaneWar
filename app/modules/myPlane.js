const QFTools=require("../libs/tools.js");
const Bullet=require("./Bullet.js");

var myPlane={
	aBulltes:[],
	init:function(bodyMain){
		this.bodyMain=bodyMain;
		this.ele=QFTools.createDiv("my-warplain");
		var _left=(QFTools.getBody().width-this.ele.offsetWidth)/2;
		var _top=QFTools.getBody().height-this.ele.offsetHeight;
		this.ele.style.top=_top+"px";
		this.ele.style.left=_left+"px";
		this.move();
		return this;		
	},

	move:function(){
		QFTools.on(document.body,"mousemove",function(e){
			e=e||event;
			var _top=e.clientY-this.ele.offsetHeight/2;
			var _left=e.clientX-this.ele.offsetWidth/2;
			if(_left<this.bodyMain.offsetLeft){
				_left=this.bodyMain.offsetLeft;
			}
			if(_left>this.bodyMain.offsetLeft+this.bodyMain.offsetWidth-this.ele.offsetWidth)
			{
				_left=this.bodyMain.offsetLeft+this.bodyMain.offsetWidth-this.ele.offsetWidth;
			}
			this.ele.style.top=_top+"px";
			this.ele.style.left=_left+"px";
		}.bind(this),false);
	},
	fire:function(diff){
		this.duration=500/diff;
		this.timer=setInterval(()=>{
			this.aBulltes.push(new Bullet().init(this));
		},this.duration);
	}
}

module.exports=myPlane;