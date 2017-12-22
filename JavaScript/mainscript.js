	var allTimeCurrency = 0;
	var allTimeClickCurrency = 0;
	var allTimeAutoCurrency = 0;
	var greatestCurrency = 0;
	var totalClicks = 0;
	var timePlayed = 0;

	var totalCurrency = 0;
	var clickAmount = 1;
	var currencyPerSecond = 0;

	var autoUpgradeCost = [10,25,200,1000,8000,50000,300000,1500000,10000000,80000000];
	var autoUpgradeValue = [0.25,0.1,1,4,32,200,800,3000,12000,50000];
	var autoUpgradeMult = [1,1,1,1,1,1,1,1,1,1]
	var autoUpgradeCostMult = [1.7,1.33,1.3,1.3,1.28,1.25,1.23,1.2,1.15,1.1];
	var upgradeCount = [0,0,0,0,0,0,0,0,0,0];
	var autoPerUpgrade = [0,0,0,0,0,0,0,0,0,0];

	var unlocked = 1;

	var totalUpgrades = 10;

	var gamePause = false;

	var timeSinceStart=0;
	var startSeconds=0;
	var timePlayed=0;
	var lastTime=0;
	var totalTimeAway=0;

	var clickAnimation=true;

	function codeClick(){
		if(clickAnimation){
			fadeOut(clickAmount);
		}
		totalClicks++;
		totalCurrency = Math.round(100*(totalCurrency+clickAmount))/100;
		allTimeCurrency = Math.round(100*(allTimeCurrency+clickAmount))/100;
		allTimeClickCurrency = Math.round(100*(allTimeClickCurrency+clickAmount))/100;
		document.getElementById("currency").innerHTML = totalCurrency;
	}

	//spacebar code click
	document.body.onkeyup = function(e){
		if(e.keyCode == 32){
			e.preventDefault();
			if(!gamePause){
				//codeClick();
				document.getElementById('codeButton').click();
			}
		}
	}

	function autoUpgrade(x){
		
		if(autoUpgradeCost[x-1]<=totalCurrency){

		totalCurrency = Math.round(100*(totalCurrency-autoUpgradeCost[x-1]))/100; //subtracts cost

		upgradeCount[x-1] = upgradeCount[x-1] + 1;//increases count

		if(upgradeCount[x-1]==1){ //graphcis for first buy
			unlockGraphics(x);
		}
		if(x==1){ // click upgrades
			calculateCPS();
			document.getElementById("currencyPerClick").innerHTML = clickAmount;
			localStorage.upgradeCount0 = upgradeCount[0];
		}
		else{ //auto upgrades
			autoPerUpgrade[x-1] = Math.round(100*(upgradeCount[x-1]*autoUpgradeValue[x-1]))/100;

			if(x==2){localStorage.upgradeCount1 = upgradeCount[1];}
			if(x==3){localStorage.upgradeCount2 = upgradeCount[2];}
			if(x==4){localStorage.upgradeCount3 = upgradeCount[3];}
			if(x==5){localStorage.upgradeCount4 = upgradeCount[4];}
			if(x==6){localStorage.upgradeCount5 = upgradeCount[5];}
			if(x==7){localStorage.upgradeCount6 = upgradeCount[6];}
			if(x==8){localStorage.upgradeCount7 = upgradeCount[7];}
			if(x==9){localStorage.upgradeCount8 = upgradeCount[8];}
			if(x==10){localStorage.upgradeCount9 = upgradeCount[9];}

			calculateCPS();

		}
		if(x==1){
		autoUpgradeCostMult[0]=Math.round(100*(1.2+(25/(2*upgradeCount[0]+50))))/100;
		autoUpgradeCost[0] = Math.round(autoUpgradeCost[0]*autoUpgradeCostMult[0]);
		}
		else{
			autoUpgradeCost[x-1] = Math.round(100*(autoUpgradeCost[x-1] * autoUpgradeCostMult[x-1]))/100;//increase cost
		}

		
		unlockMulitpliers();

		document.getElementById("upgrade" + (x)).innerHTML = autoUpgradeCost[x-1];
		document.getElementById("upgradeCount" + (x)).innerHTML = upgradeCount[x-1];
		showMultiplier(x+4);
	}
}

function autoGameLoop(){
	totalCurrency = Math.round(100*(totalCurrency + currencyPerSecond/10))/100;
	allTimeCurrency = Math.round(100*(allTimeCurrency + currencyPerSecond/10))/100;
	allTimeAutoCurrency = Math.round(100*(allTimeAutoCurrency + currencyPerSecond/10))/100;
	document.getElementById("currency").innerHTML = totalCurrency;

	if(totalCurrency>greatestCurrency){
		greatestCurrency=totalCurrency;
	}
	unlockButtons();
	updateButtons();
	unlockMulitpliers();
}

function slowGameLoop(){
	localStorage.totalCurrency = totalCurrency;
	localStorage.allTimeCurrency = allTimeCurrency;
	localStorage.allTimeClickCurrency = allTimeClickCurrency;
	localStorage.allTimeAutoCurrency = allTimeAutoCurrency;
	localStorage.greatestCurrency = greatestCurrency;
	localStorage.totalClicks = totalClicks;
	localStorage.lastTime = new Date().getTime() / 1000;
}

function clockLoop(){
}

function calculateCPS(){
	currencyPerSecond=0;
	clickAmount = (1 + (upgradeCount[0] * autoUpgradeValue[0])) * autoUpgradeMult[0];
	for(i=1; i < totalUpgrades; i++){
		autoPerUpgrade[i] = upgradeCount[i] * autoUpgradeValue[i] * autoUpgradeMult[i]; 
		currencyPerSecond+=autoPerUpgrade[i]; 
		currencyPerSecond = Math.round(100*(currencyPerSecond))/100;
	}
	document.getElementById("currencyPerSecond").innerHTML = currencyPerSecond;
}

function calculateCosts(){
	//autoUpgradeCost[0]=Math.round(100*(autoUpgradeCost[0]*Math.pow(autoUpgradeCostMult[i],upgradeCount[i])))/100;
	for(i=1;i<=upgradeCount[0];i++){
	autoUpgradeCostMult[0]=Math.round(100*(1.2+(25/(2*i+50))))/100;
	autoUpgradeCost[0] = Math.round(autoUpgradeCost[0]*autoUpgradeCostMult[0]);
	}

	for(i=1;i<11;i++){
		autoUpgradeCost[i]=Math.round(100*(autoUpgradeCost[i]*Math.pow(autoUpgradeCostMult[i],upgradeCount[i])))/100;
		if(i==0){
			document.getElementById("upgrade1").innerHTML = autoUpgradeCost[0];
		}
		else{
			document.getElementById("upgrade" + (i)).innerHTML = autoUpgradeCost[i];
		}
	}
}
