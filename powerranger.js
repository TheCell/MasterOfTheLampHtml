window.charAnimLoopCount = 0;
window.up = false;
window.down = false;
window.left = false;
window.right = false;
window.start = false;
window.playMusic = true;
window.playSound = true;
window.audioObject;
window.lastImgFrame = 1;
window.lastCollectiblePosTop = 350;
window.lastCollectiblePosLeft = 350;
window.collectibleArr = [];
window.collectibleArrForDel = [];
window.score = 0;
window.charArr = [
	"gfx/wingMan1Sync.png",
	"gfx/wingMan1Sync.png",
	"gfx/wingMan2Sync.png",
	"gfx/wingMan2Sync.png",
	"gfx/wingMan3Sync.png",
	"gfx/wingMan3Sync.png",
	"gfx/wingMan4Sync.png",
	"gfx/wingMan4Sync.png",
	"gfx/wingMan5Sync.png",
	"gfx/wingMan5Sync.png",
	"gfx/wingMan2Sync.png",
	"gfx/wingMan2Sync.png"];

function addEventListenerFunction()
{
	window.addEventListener("keydown", keyPressedCodeToFunction);
	window.addEventListener("keyup", keyReleasedCodeToFunction);
}

addEventListenerFunction();

function keyPressedCodeToFunction(evt)
{
	// arrow left
	if(evt.keyCode == 37 || evt.keyCode == 65)
	{
		window.left = true;
	}
	// arrow up
	if(evt.keyCode == 38 || evt.keyCode == 87)
	{
		window.up = true;
	}
	// arrow right
	if(evt.keyCode == 39 || evt.keyCode == 68)
	{
		window.right = true;
	}
	// arrow down
	if(evt.keyCode == 40 || evt.keyCode == 83)
	{
		window.down = true;
	}
}

function keyReleasedCodeToFunction(evt)
{
	// arrow left
	if(evt.keyCode == 37 || evt.keyCode == 65)
	{
		window.left = false;
	}
	// arrow up
	if(evt.keyCode == 38 || evt.keyCode == 87)
	{
		window.up = false;
	}
	// arrow right
	if(evt.keyCode == 39 || evt.keyCode == 68)
	{
		window.right = false;
	}
	// arrow down
	if(evt.keyCode == 40 || evt.keyCode == 83)
	{
		window.down = false;
	}
}

function characterAnimFrame()
{
	charSprites = window.charArr;
	window.charAnimLoopCount ++;
	if(window.charAnimLoopCount > (window.charArr.length -1))
	{
		window.charAnimLoopCount = 0;
	}

	var charGfx = document.getElementById("charakterGfx");
	charGfx.src = charSprites[window.charAnimLoopCount];
}

function characterMovementSteps()
{
	//var collectibles = document.getElementsByClassName("collectible");
	var collectibles = document.querySelectorAll(".collectible,.collectibleEnd");

	var speed = 2;
	if(window.left)
	{
		for (var i = collectibles.length - 1; i >= 0; i--)
		{
			var effectiveSpeed = (speed + collectibles[i].zAxe)/2;
			collectibles[i].style.left = parseInt(collectibles[i].style.left) + effectiveSpeed + "px";
		}
		//charakter.style.left = parseInt(charakter.style.left) - speed + "px";
	}
	if(window.up)
	{
		for (var i = collectibles.length - 1; i >= 0; i--)
		{
			var effectiveSpeed = (speed + collectibles[i].zAxe)/2;
			collectibles[i].style.top = parseInt(collectibles[i].style.top) + effectiveSpeed + "px";
		}
		//charakter.style.top = parseInt(charakter.style.top) - speed + "px";
	}
	if(window.right)
	{
		for (var i = collectibles.length - 1; i >= 0; i--)
		{
			var effectiveSpeed = (speed + collectibles[i].zAxe)/2;
			collectibles[i].style.left = parseInt(collectibles[i].style.left) - effectiveSpeed + "px";
		}
		//charakter.style.left = parseInt(charakter.style.left) + speed + "px";
	}
	if(window.down)
	{
		for (var i = collectibles.length - 1; i >= 0; i--)
		{
			var effectiveSpeed = (speed + collectibles[i].zAxe)/2;
			collectibles[i].style.top = parseInt(collectibles[i].style.top) - effectiveSpeed + "px";
		}
		//charakter.style.top = parseInt(charakter.style.top) + speed + "px";
	}
}

function startGame()
{
	if(!window.start)
	{
		collectibleLifetime();
		window.start = true;
		if(window.playMusic)
		{
			window.audioObject = new Audio('sfx/Wepa.mp3');
			window.audioObject.volume = 0.1;
			window.audioObject.loop = true;
			window.audioObject.play();
		}
	}
}

function collectibleLifetime()
{
	var yPos = window.lastCollectiblePosTop;
	var xPos = window.lastCollectiblePosLeft;
	window.lastImgFrame++;
	if (window.lastImgFrame > 6)
	{
		window.lastImgFrame = 1;
	}
	changeSpawnPos();

	var collectibleImgElement = document.createElement("img");
	//collectibleImgElement.src = "gfx/bronze_1.png";
	collectibleImgElement.src = "gfx/glazing_" + window.lastImgFrame + ".png";
	collectibleImgElement.style.top = xPos + "px";
	collectibleImgElement.style.left = yPos + "px";
	collectibleImgElement.style.zIndex = 0;
	collectibleImgElement.className += "collectible";
	collectibleImgElement.zAxe = 1;
	collectibleImgElement.canDie = false;
	document.getElementById("collectibleContainer").appendChild(collectibleImgElement);
	window.collectibleArr.push(collectibleImgElement);

	//console.log("drawn");
	setTimeout(function () {collectibleImgElement.className = "collectibleEnd";}, 50);
	setTimeout(function ()
	{
		collectibleImgElement.zAxe = collectibleImgElement.zAxe + 2;
		collectibleImgElement.style.zIndex = parseInt(collectibleImgElement.style.zIndex) + 1;
	}, 1000);
	setTimeout(function ()
	{
		collectibleImgElement.zAxe = collectibleImgElement.zAxe + 2;
		collectibleImgElement.style.zIndex = parseInt(collectibleImgElement.style.zIndex) + 1;
	}, 2000);
	setTimeout(function ()
	{
		collectibleImgElement.zAxe = collectibleImgElement.zAxe + 2;
		collectibleImgElement.style.zIndex = parseInt(collectibleImgElement.style.zIndex) + 1;
	}, 3000);
	setTimeout(function ()
	{
		collectibleImgElement.zAxe = collectibleImgElement.zAxe + 2;
		collectibleImgElement.style.zIndex = parseInt(collectibleImgElement.style.zIndex) + 1;
	}, 4000);

	setTimeout(function ()
	{
		//console.log(collectibleImgElement.offsetWidth);
		window.collectibleArr.pop(collectibleImgElement);

		/*
		console.log("left: " + parseInt(collectibleImgElement.style.left));
		console.log("top: " + parseInt(collectibleImgElement.style.top));
		console.log("width: " + collectibleImgElement.width * 2);
		console.log("height: " + collectibleImgElement.height * 2);
		*/

		let halfCollWidth = collectibleImgElement.width / 2;
		let halfCollHeight = collectibleImgElement.height / 2;
		let collLeft = parseInt(collectibleImgElement.style.left);
		let collTop = parseInt(collectibleImgElement.style.top);

		let charHeight = 50;
		let charWidth = 73;
		let charLeft = 400;
		let charTop = 400;

		let charMidX = charLeft + (charWidth / 2);
		let charMidY = charTop + (charHeight / 2);
		let collMidY = collTop + halfCollHeight;
		let collMidX = collLeft + halfCollWidth;

		//let xBetween = (Math.max(collMidX, charMidX) - Math.min(collMidX, charMidX));
		//let yBetween = (Math.max(collMidY, charMidY) - Math.min(collMidY, charMidY));
		let xBetween = Math.abs(collMidX - charMidX);
		let yBetween = Math.abs(collMidY - charMidY);

		console.log(Math.sqrt(xBetween * xBetween + yBetween * yBetween));

		// debug
		if(false)
		{
			var marker = document.createElement("img");
			marker.src = "gfx/glazing_" + window.lastImgFrame + ".png";
			marker.style.top = collMidY + "px";
			marker.style.left = collMidX + "px";
			marker.className = "marker";
			document.getElementById("collectibleContainer").appendChild(marker);
		}

		//if(Math.sqrt(xBetween * xBetween + yBetween * yBetween) <= 500)
		//if(Math.sqrt(xBetween * xBetween + yBetween * yBetween) <= 160)
		if(Math.sqrt(xBetween * xBetween + yBetween * yBetween) <= 180)
		{
			window.score = window.score + 1;
			console.log("SCORE");
			if(window.playSound)
			{
				var audiofx = new Audio("sfx/194081__potentjello__woosh-noise-1.wav");
				audiofx.volume = 1;
				audiofx.play();
			}
		}

		//collectibleImgElement.remove();
		//collectibleImgElement.canDie = true;
		window.collectibleArrForDel.push(collectibleImgElement);
	}, 4200);

	setTimeout(collectibleLifetime, 1000);
	setTimeout(killcollectible, 1000);
	//collectibleImgElement.remove();
}

function changeSpawnPos()
{
	let winsize =
	{
		width: window.innerWidth || document.body.clientWidth,
		height: window.innerHeight || document.body.clientHeight
	}

	let maxStep = 60;
	let xStep = Math.random() * 1000 % maxStep;
	let yStep = Math.random() * 1000 % maxStep;
	let xDirection, yDirection;
	if(Math.random()*10 > 5)
	{
		xDirection = 1;
	}
	else
	{
		xDirection = -1;
	}
	if(Math.random()*10 > 5)
	{
		yDirection = 1;
	}
	else
	{
		yDirection = -1;
	}

	//console.log(window.lastCollectiblePosTop + " step: " + yStep + " *dir " + yDirection + " sinsize: " + winsize.height);
	if(window.lastCollectiblePosTop + yStep * yDirection <= winsize.height && window.lastCollectiblePosTop + yStep * yDirection > 0)
	{
		window.lastCollectiblePosTop = window.lastCollectiblePosTop + yStep * yDirection;
	}
	else if(window.lastCollectiblePosTop + yStep * yDirection > 0)
	{
		window.lastCollectiblePosTop = window.lastCollectiblePosTop + yStep * yDirection;
	}
	else
	{
		window.lastCollectiblePosTop = window.lastCollectiblePosTop + yStep * -1 * yDirection;
	}

	if(window.lastCollectiblePosLeft + xStep * xDirection <= winsize.width && window.lastCollectiblePosLeft + xStep * yDirection > 0)
	{
		window.lastCollectiblePosLeft = window.lastCollectiblePosLeft + xStep * xDirection;
	}
	else if(window.lastCollectiblePosLeft + xStep * yDirection > 0)
	{
		window.lastCollectiblePosLeft = window.lastCollectiblePosLeft + xStep * xDirection;
	}
	else
	{
		window.lastCollectiblePosLeft = window.lastCollectiblePosLeft + xStep * -1 * xDirection;
	}
}

function updateScore()
{
	document.querySelectorAll("#scoreboard span")[0].innerHTML = window.score;
}

function killcollectible()
{
	for (var i = window.collectibleArrForDel.length - 1; i >= 0; i--)
	{
		window.collectibleArrForDel[i].remove();
	}
}

function gameloop()
{
	characterAnimFrame();
	characterMovementSteps();
	updateScore();
	startGame();
	if(window.playMusic)
	{
		window.audioObject.play();
	}
	else
	{
		window.audioObject.pause();
	}
}

setInterval(gameloop, 30);