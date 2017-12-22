var multPrice = [100, 200, 1000, 1200, 1500, 6000, 8000, 10000, 12000, 35000, 42000, 
50000, 80000, 80000, 150000, 300000, 300000, 400000, 400000, 500000, 800000, 1000000,
1500000, 2000000, 2000000, 2000000, 3000000, 5000000, 5200000, 8000000, 10000000, 
12000000, 12000000, 12000000, 12000000, 30000000, 31000000, 42000000, 50000000, 60000000, 
70000000, 80000000, 90000000, 240000000, 300000000, 400000000, 450000000, 600000000, 3400000000];
var upgradeOrder = [1, 2, 1, 3, 2, 3, 4, 1, 2, 3, 4, 1, 2, 5, 3, 1, 4, 2, 5, 6, 3, 1, 4, 2, 5, 7, 6, 1, 3, 4, 5, 2, 6, 7, 8, 1, 4, 2, 5, 6, 9, 8, 7, 8, 9, 7, 9, 10, 10];
var upgradeBought = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var descriptions = ["Double your typing speed!", 
"Double the efficiency of your Coding Tutorials!", 
"Double your typing speed!", 
"Double the efficiency of your Computer Upgrades!", 
"Double the efficiency of your Coding Tutorials!", 
"Double the efficiency of your Computer Upgrades!", 
"Double the efficiency of your Automatic Scripts!", 
"Double your typing speed!", 
"Double the efficiency of your Coding Tutorials!", 
"Double the efficiency of your Computer Upgrades!", 
"Double the efficiency of your Automatic Scripts!", 
"Double your typing speed!", 
"Double the efficiency of your Coding Tutorials!", 
"Double the efficiency of your Server!", 
"Double the efficiency of your Computer Upgrades!", 
"Double your typing speed!", 
"Double the efficiency of your Automatic Scripts!", 
"Double the efficiency of your Coding Tutorials!", 
"Double the efficiency of your Server!", 
"Double the efficiency of your Beer Fridge! Yum", 
"Double the efficiency of your Computer Upgrades!", 
"Double your typing speed!", 
"Double the efficiency of your Automatic Scripts!", 
"Double the efficiency of your Coding Tutorials!", 
"Double the efficiency of your Server!", 
"Double the efficiency of your Robotic Hands", 
"Double the efficiency of your Beer Fridge! Yum", 
"Double your typing speed!", 
"Double the efficiency of your Computer Upgrades!", 
"Double the efficiency of your Automatic Scripts!", 
"Double the efficiency of your Server!", 
"Double the efficiency of your Coding Tutorials!", 
"Double the efficiency of your Beer Fridge! Yum", 
"Double the efficiency of your Robotic Hands", 
"Double the efficiency of your Out Sourced Employee", 
"Double your typing speed!", 
"Double the efficiency of your Automatic Scripts!", 
"Double the efficiency of your Coding Tutorials!", 
"Double the efficiency of your Server!", 
"Double the efficiency of your Beer Fridge! Yum", 
"Double the efficiency of your Performance Enhancer", 
"Double the efficiency of your Out Sourced Employee", 
"Double the efficiency of your Robotic Hands", 
"Double the efficiency of your Out Sourced Employee", 
"Double the efficiency of your Performance Enhancer", 
"Double the efficiency of your Robotic Hands", 
"Double the efficiency of your Performance Enhancer",
"Double the efficiency of your Penguin of Inspiration", 
"Double the efficiency of your Penguin of Inspiration"];


var data = [];
var dataPos = [];
var unlockedData = [];

function unlockMulitpliers(){
	data = [];
	unlockedData = [];
	var j = 1;
	var length = upgradeOrder.length;
	for(i=0; i<length; i++){
		if(upgradeBought[i]==0&&upgradeCount[upgradeOrder[i]-1]>0&&totalCurrency>multPrice[i]/10){
			data[j]=upgradeOrder[i];
			dataPos[j]=i;
			if(totalCurrency>multPrice[i]){
				unlockedData[j]=1;
			}
			j++;
		}
		if(j>5){
			break;
		}
	}
	for(i=1;i<5;i++){
		if(data[i]){
			if(unlockedData[i]==1){
				document.getElementById("multiplier" + i).style.background= "orange url('graphics/logos/logo" + data[i] + ".png') no-repeat center";
			}
			else{
				document.getElementById("multiplier" + i).style.background= "grey url('graphics/logos/logo" + data[i] + ".png') no-repeat center";
			}
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
	if(x==5){
		document.getElementById("multiplierPopUp5").innerHTML= Math.round(100*clickAmount)/100+" bits per click";
	}
	if(x>5){
		document.getElementById("multiplierPopUp"+x).innerHTML= Math.round(100*autoPerUpgrade[x-5])/100+" bits per second";
	}
	document.getElementById("multiplierPopUp"+x).style.visibility="visible";
}

function stopShowMultiplier(x){
	document.getElementById("multiplierPopUp"+x).style.visibility="hidden";
}

function setCharAt(str,index,chr) {
	if(index > str.length-1) return str;
	return str.substr(0,index) + chr + str.substr(index+1);
}