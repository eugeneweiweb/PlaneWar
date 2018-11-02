const QFTools=requrire("../libs/tools.js");

function Bullet(){

}

Bullet.prototype={
	constructor:Bullet,
	init:function(plane){
		this.plane=plane;
		this.ele=QFTools.createDiv("bullet");
		var _top=this.plane.offsetTop-this.ele.offsetHeight;
		var _left=this.plane.offsetLeft+this.plane.offsetWidth/2-this.ele.offsetWidth/2;
		this.ele.style.top=_top+"px";
		this.ele.style.left=_left+"px";
		this.move();
		return this;
	},

	move:function(){
		this.timer=setInterval(function(){
			this.ele.style.top=this.ele.offsetTop-8+"px";
			if(this.ele.offsetTop<-40){
				this.die();		
			}
		}.bind(this),30);
	},

	die:function(){
		clearInterval(this.timer);
		this.ele.className="bullet_die";
		setTimeout(()=>{
			this.ele.className="bullet_die2";
			setTimeout(()=>{
				document.body.removeChild(this.ele);
			},100);
		},100);

		for(var i=0; i<this.plane.aBulltes.length; i++){
			if(this===this.plane.aBulltes[i]){
				this.plane.aBulltes.splice(i,1);
			}
		}
	}
}

module.exports=Bullet;