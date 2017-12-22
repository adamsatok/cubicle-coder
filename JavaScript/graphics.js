

function updateButtons(){
	for (i = 0; i < 10; i++) {
		var id = "buttonUpgrade"+(i+1);
		if(totalCurrency<autoUpgradeCost[i]){
			document.getElementById(id).style.backgroundColor = "grey";
		}
		if(totalCurrency>=autoUpgradeCost[i]){
			document.getElementById(id).style.backgroundColor = "orange";
		}
	}
}

function unlockButtons(){
	if(totalCurrency>=autoUpgradeCost[unlocked]&&unlocked<9){
		unlocked += 1;
		var id = "buttonUpgrade" + (unlocked+1);
		document.getElementById(id).style.visibility = "visible";
	}
}

function unlockGraphics(x){
	if(x==7){
		document.getElementById("graphics7a").style.visibility="visible";
		document.getElementById("graphics7b").style.visibility="visible";
		document.getElementById("programmer1").style.visibility="hidden";
		document.getElementById("programmer2").style.visibility="hidden";
	}
	else{
		document.getElementById("graphics" + (x)).style.visibility="visible";
	}
}

function fadeOut(text) {
	clickAnimation = false;
	var x = 0;
	var y = 0;
	var offset = $("#header").offset();
	$(document).click(function(e){
		x = e.pageX - offset.left;
		y = e.pageY - offset.top;
		if(x<0){
			x=331;
			y=43;
		}
	});
	var canvas = document.getElementById("canvas1");
	context = canvas.getContext('2d');
    var alpha = 1.0; // full opacity
    interval = setInterval(function () {
    	canvas.width = 660;
    	canvas.height = 200;
    	context.fillStyle = "rgba(30, 110, 255, " + alpha + ")";
    	context.font = "20pt Courier";
    	context.textAlign = "center";
    	context.fillText("+"+text+" Bits", x, y);
            alpha = alpha - 0.05; // decrease opacity (fade out)
            y = y - 1;
            if (alpha < 0) {
            	canvas.width = canvas.width;
            	clearInterval(interval);
            	clickAnimation=true;
            }
        }, 15); 
}