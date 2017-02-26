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