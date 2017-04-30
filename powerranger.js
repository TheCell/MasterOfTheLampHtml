window.charAnimLoopCount = 0;
window.up = false;
window.down = false;
window.left = false;
window.right = false;
window.start = false;

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
	charSprites = ["gfx/wingMan1Sync.png", "gfx/wingMan2Sync.png", "gfx/wingMan3Sync.png", "gfx/wingMan4Sync.png", "gfx/wingMan5Sync.png", "gfx/wingMan2Sync.png"];
	window.charAnimLoopCount ++;
	if(window.charAnimLoopCount > 5)
	{
		window.charAnimLoopCount = 0;
	}

	var charGfx = document.getElementById("charakterGfx");
	charGfx.src = charSprites[window.charAnimLoopCount];
}

function characterMovementSteps()
{
	var charakter = document.getElementById("charakter");
	var collectibles = document.getElementsByClassName("collectible");

	var speed = 5;
	if(window.left)
	{
		for (var i = collectibles.length - 1; i >= 0; i--)
		{
			collectibles[i].style.left = parseInt(collectibles[i].style.left) - speed + "px";
		}
		//charakter.style.left = parseInt(charakter.style.left) - speed + "px";
	}
	if(window.up)
	{
		for (var i = collectibles.length - 1; i >= 0; i--)
		{
			collectibles[i].style.top = parseInt(collectibles[i].style.top) - speed + "px";
		}
		//charakter.style.top = parseInt(charakter.style.top) - speed + "px";
	}
	if(window.right)
	{
		for (var i = collectibles.length - 1; i >= 0; i--)
		{
			collectibles[i].style.left = parseInt(collectibles[i].style.left) + speed + "px";
		}
		//charakter.style.left = parseInt(charakter.style.left) + speed + "px";
	}
	if(window.down)
	{
		for (var i = collectibles.length - 1; i >= 0; i--)
		{
			collectibles[i].style.top = parseInt(collectibles[i].style.top) + speed + "px";
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
	}
}

function collectibleLifetime()
{
	var xPos = 50;
	var yPos = 50;

	var collectibleImgElement = document.createElement("img");
	collectibleImgElement.src = "gfx/bronze_1.png";
	collectibleImgElement.style.top = xPos + "px";
	collectibleImgElement.style.left = yPos + "px";
	collectibleImgElement.className += "collectible";
	document.body.appendChild(collectibleImgElement);
	console.log("drawn");
	setTimeout(collectibleLifetime, 5000);
}

function gameloop()
{
	characterAnimFrame();
	characterMovementSteps();
	startGame();
}

setInterval(gameloop, 60);