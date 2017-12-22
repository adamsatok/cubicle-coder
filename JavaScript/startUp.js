	function initialize(){
		if(localStorage.resetVal){
			if(localStorage.resetVal==1){
				window.localStorage.clear(); 
			}
		}

		localStorage.resetVal = 0;

		if(!localStorage.firstPlay){
			firstPlay();
		}

		localStorage.firstPlay=1;
		
		if(localStorage.totalCurrency){
			totalCurrency = parseInt(localStorage.totalCurrency);
			allTimeCurrency = parseInt(localStorage.allTimeCurrency);
			allTimeClickCurrency = parseInt(localStorage.allTimeClickCurrency);
			allTimeAutoCurrency = parseInt(localStorage.allTimeAutoCurrency);
			greatestCurrency = parseInt(localStorage.greatestCurrency);
			totalClicks = parseInt(localStorage.totalClicks);
			multiplierSaveData = localStorage.multiplierSaveData;
			lastTime = parseInt(localStorage.lastTime);
			totalTimeAway = parseInt(localStorage.totalTimeAway);

			upgradeCount[0] = parseInt(localStorage.upgradeCount0);
			upgradeCount[1] = parseInt(localStorage.upgradeCount1);
			upgradeCount[2] = parseInt(localStorage.upgradeCount2);
			upgradeCount[3] = parseInt(localStorage.upgradeCount3);
			upgradeCount[4] = parseInt(localStorage.upgradeCount4);
			upgradeCount[5] = parseInt(localStorage.upgradeCount5);
			upgradeCount[6] = parseInt(localStorage.upgradeCount6);
			upgradeCount[7] = parseInt(localStorage.upgradeCount7);
			upgradeCount[8] = parseInt(localStorage.upgradeCount8);
			upgradeCount[9] = parseInt(localStorage.upgradeCount9);


		}
		else {
			totalCurrency = 0;
			allTimeCurrency = 0;
			allTimeClickCurrency = 0;
			allTimeAutoCurrency = 0;
			greatestCurrency = 0;
			totalClicks = 0;
			lastTime = 0;
			totalTimeAway=0;
			multiplierSaveData="0000000000000000000000000000000000000000000000000";
			for (i = 0; i < 11; i++){
				upgradeCount[0]=0;
			}
		}
		
		localStorage.allTimeCurrency = allTimeCurrency;
		localStorage.allTimeClickCurrency = allTimeClickCurrency;
		localStorage.allTimeAutoCurrency = allTimeAutoCurrency;
		localStorage.greatestCurrency = greatestCurrency;
		localStorage.totalClicks = totalClicks;
		localStorage.multiplierSaveData = multiplierSaveData;
		localStorage.lastTime = lastTime;
		localStorage.totalTimeAway = totalTimeAway;

		localStorage.upgradeCount0 = upgradeCount[0];
		localStorage.upgradeCount1 = upgradeCount[1];
		localStorage.upgradeCount2 = upgradeCount[2];
		localStorage.upgradeCount3 = upgradeCount[3];
		localStorage.upgradeCount4 = upgradeCount[4];
		localStorage.upgradeCount5 = upgradeCount[5];
		localStorage.upgradeCount6 = upgradeCount[6];
		localStorage.upgradeCount7 = upgradeCount[7];
		localStorage.upgradeCount8 = upgradeCount[8];
		localStorage.upgradeCount9 = upgradeCount[9];
		calculateCPS();
		calculateCosts();
		timeAway();
		multiplierSaveState(multiplierSaveData);
		updateAllVisual();
		startGame2();
	}

	function firstPlay(){
		document.getElementById("titleScreen").style.visibility = "visible";
		localStorage.startSeconds = new Date().getTime() / 1000;
	}


	function startGame(){
		document.getElementById("titleScreen").style.visibility = "hidden";
	}

	function startGame2(){
		var myVar2 = setInterval(autoGameLoop, 100);
		var myVar1 = setInterval(slowGameLoop, 400);
		var myVar3 = setInterval(clockLoop, 1000);
	}

	function timeAway(){
		if(lastTime!=0){
			var curTime = new Date().getTime() / 1000;
			var timeAway = curTime - lastTime;	
			console.log("Idle for "+timeAway);
			totalCurrency += Math.round(timeAway*currencyPerSecond/10);
			totalTimeAway = totalTimeAway+timeAway;
			localStorage.totalTimeAway = totalTimeAway;
			console.log("Earned "+ Math.round(timeAway*currencyPerSecond/10));
			
		}

	}

	function updateAllVisual(){
		document.getElementById("currency").innerHTML = totalCurrency;
		document.getElementById("currencyPerClick").innerHTML = clickAmount;
		document.getElementById("currencyPerSecond").innerHTML = currencyPerSecond;
		unlockMulitpliers();

		for(x=1; x<11; x++){
			document.getElementById("upgrade" + (x)).innerHTML = autoUpgradeCost[x-1];
			document.getElementById("upgradeCount" + (x)).innerHTML = upgradeCount[x-1];
			if(upgradeCount[x-1]>0){
				unlockGraphics(x);
			}
		}
	}
