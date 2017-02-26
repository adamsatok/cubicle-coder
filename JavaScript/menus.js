	function pauseGame(x){
		if(x==1){
			document.getElementById("pauseBackdrop").style.visibility = "visible";
			document.getElementById("pauseMenu").style.visibility = "visible";
		}
		if(x==2){
			document.getElementById("pauseBackdrop").style.visibility = "hidden";
			document.getElementById("pauseMenu").style.visibility = "hidden";
		}
	}
	
	function statsPage(x){
		if(x == 1){
			pauseGame(2);
			startTime();
			playTime();
			document.getElementById("pauseBackdrop").style.visibility = "visible";
			document.getElementById("statsPageText").innerHTML = "Total Bits: " + 
			allTimeCurrency + "<br> Greatest Bits: "+ greatestCurrency+ "<br> Total Clicks: " 
			+ totalClicks+ "<br> Bits from clicks: "+ allTimeClickCurrency +"<br> Bits from upgrades: "
			+allTimeAutoCurrency +"<br> Time Played: " +timePlayed+ "<br> Time since start: " + timeSinceStart;
			document.getElementById("statsPage").style.visibility = "visible";
		}
		else{
			document.getElementById("pauseBackdrop").style.visibility = "hidden";
			document.getElementById("statsPage").style.visibility = "hidden";
		}
	}

	function reset(){
		localStorage.resetVal = 1;
		
	}

	function godMode(){
		totalCurrency = 9999999999;
		document.getElementById("currency").innerHTML = totalCurrency;

	}

	function startTime(){
		var currentTime = new Date().getTime() / 1000;
		timeSinceStart =secondsToString(Math.round(currentTime - localStorage.startSeconds));
	}

	function playTime(){
		var currentTime = new Date().getTime() / 1000;
		timePlayed =secondsToString(Math.round(currentTime - localStorage.startSeconds - totalTimeAway));
	}

	function secondsToString(seconds){
		var numdays = Math.floor(seconds / 86400);
		var numhours = Math.floor((seconds % 86400) / 3600);
		var numminutes = Math.floor(((seconds % 86400) % 3600) / 60);
		var numseconds = ((seconds % 86400) % 3600) % 60;
		return numdays + " days " + numhours + " hours " + numminutes + " minutes " + numseconds + " seconds";
	}