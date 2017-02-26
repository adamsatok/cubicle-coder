var multPrice = [100,200,400,1000,10000,100000,1000000,1000000,2000000,50000,40000,30000,600000,700000,30000,20,10,6000,7000,3400000];
var descriptions = ["Double your typing speed!", 
"Double the efficiency of your Coding Tutorials!", 
"Double the efficiency of your Computer Upgrades!", 
"Double the efficiency of your Automatic Scripts!", 
"Double the efficiency of your Server!", 
"Double the efficiency of your Beer Fridge!"];
var upgradeOrder = [1,2,3,4,5,6,7,8,9,1,2,3,4,2,1,7,3,4,9,10];
var upgradeBought = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var data = [];
var dataPos = [];

function unlockMulitpliers(){
	data = [];
	var j = 1;
	var length = upgradeOrder.length;
	for(i=0; i<length; i++){
		if(upgradeBought[i]==0&&upgradeCount[upgradeOrder[i]-1]>0&&totalCurrency>multPrice[i]/10){
			data[j]=upgradeOrder[i];
			dataPos[j]=i;
			j++;
		}
		if(j>5){
			break;
		}
	}
	for(i=1;i<5;i++){
		if(data[i]){
			document.getElementById("multiplier" + i).style.background= "orange url('graphics/logos/logo" + data[i] + ".png') no-repeat center";
			document.getElementById("multiplier" + i).style.visibility= "visible";
			document.getElementById("multiplierPopUp"+i).innerHTML = "Price: "+multPrice[dataPos[i]] +"<br>"+ descriptions[dataPos[i]];
		}
		else{
			document.getElementById("multiplier" + i).style.visibility= "hidden";
			document.getElementById("multiplierPopUp" + i).style.visibility= "hidden";

		}
	}
}


function buyMultiplier(x){
	if(totalCurrency>multPrice[dataPos[x]]){
		totalCurrency = totalCurrency - multPrice[dataPos[x]];
		upgradeBought[dataPos[x]]=1;
		autoUpgradeMult[upgradeOrder[dataPos[x]]-1] = autoUpgradeMult[upgradeOrder[dataPos[x]]-1] * 2;
		localStorage.multiplierSaveData = setCharAt(localStorage.multiplierSaveData, dataPos[x], 1);
		unlockMulitpliers();
		calculateCPS();
	}
}

function multWrapper(){
	multiplierSaveState("101010111101010100");
}

function multiplierSaveState(x){
	var length=x.length;
	for (i=0; i<length; i++){
		if(x.charAt(i)=="1"){
			upgradeBought[i]=1;
			autoUpgradeMult[upgradeOrder[i]-1] = autoUpgradeMult[upgradeOrder[i]-1] * 2;
		}
	}
	calculateCPS();
}

function showMultiplier(x){
	document.getElementById("multiplierPopUp"+x).style.visibility="visible";
}

function stopShowMultiplier(x){
	document.getElementById("multiplierPopUp"+x).style.visibility="hidden";
}

function setCharAt(str,index,chr) {
	if(index > str.length-1) return str;
	return str.substr(0,index) + chr + str.substr(index+1);
}