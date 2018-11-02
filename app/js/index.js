require("!style-loader!css-loader!../css/index.css");

var Engine=require("../modules/Engine.js");

window.onload=function(){
	new Engine();
}