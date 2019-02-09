//variables
const buttonHeight = Math.floor((window.innerHeight-120)/3);
const mainOneStart = 120+((buttonHeight-125)/2);
const mainTwoStart = 120+buttonHeight+((buttonHeight-125)/2);
const mainThreeStart = 120+2*buttonHeight+((buttonHeight-125)/2);

let returnPosition = 0;

//positioning left-side buttons
document.getElementById("button1").style.height = buttonHeight;
document.getElementById("button2").style.top = buttonHeight+120;
document.getElementById("button2").style.height = buttonHeight;
document.getElementById("button3").style.top = (2*buttonHeight)+120;
document.getElementById("button3").style.height = buttonHeight;

document.getElementById("button1mouse").style.height = buttonHeight;
document.getElementById("button2mouse").style.top = buttonHeight+120;
document.getElementById("button2mouse").style.height = buttonHeight;
document.getElementById("button3mouse").style.top = (2*buttonHeight)+120;
document.getElementById("button3mouse").style.height = buttonHeight;

//setting initial album selection to wisteria
let albumSelected = "wisteria";

//to make buttons fade out
function dimOpacity(x) {
  x.style.opacity = 0;
}

function brightOpacity(x) {
	x.style.opacity = .2;
}

//make visible only the buttons which are not currently pushed
function buttonCheck() {
  if (albumSelected === "wisteria") {
    document.getElementById("button1").style.visibility = "hidden";
    document.getElementById("button2").style.visibility = "visible";
    document.getElementById("button3").style.visibility = "visible";
	
    document.getElementById("button1mouse").style.visibility = "hidden";
    document.getElementById("button2mouse").style.visibility = "visible";
    document.getElementById("button3mouse").style.visibility = "visible";	

    document.getElementById("wis").style.visibility = "visible";
    document.getElementById("com").style.visibility = "hidden";
    document.getElementById("coh").style.visibility = "hidden";

    returnPosition = mainOneStart;
  }
  else if (albumSelected === "comeback") {
    document.getElementById("button1").style.visibility = "visible";
    document.getElementById("button2").style.visibility = "hidden";
    document.getElementById("button3").style.visibility = "visible";
	
    document.getElementById("button1mouse").style.visibility = "visible";
    document.getElementById("button2mouse").style.visibility = "hidden";
    document.getElementById("button3mouse").style.visibility = "visible";

    document.getElementById("wis").style.visibility = "hidden";
    document.getElementById("com").style.visibility = "visible";
    document.getElementById("coh").style.visibility = "hidden";

    returnPosition = mainTwoStart;
  }
  else if (albumSelected === "coherent") {
    document.getElementById("button1").style.visibility = "visible";
    document.getElementById("button2").style.visibility = "visible";
    document.getElementById("button3").style.visibility = "hidden";

    document.getElementById("button1mouse").style.visibility = "visible";
    document.getElementById("button2mouse").style.visibility = "visible";
    document.getElementById("button3mouse").style.visibility = "hidden";

    document.getElementById("wis").style.visibility = "hidden";
    document.getElementById("com").style.visibility = "hidden";
    document.getElementById("coh").style.visibility = "visible";

    returnPosition = mainThreeStart;
  }
}

//a sigmoid function for moving the pictures with an "acceleration" feel
//start: location where image starts
//end: location where image ends
//time: number of "ticks" to play animation for (i think a tick is .01 seconds)
//steep: a higher number will have a more drastic increase and decrease in acceleration
//tick: the number of ticks since the movement began
function logisticCurve(start, end, time, steep, tick) {
  return start+((end-start)/(1+Math.exp(steep*((time/2)-tick))));
}

//putting the pictures in the right spot on page load
function setImageStart() {
  buttonCheck();

  document.getElementsByClassName("main1")[0].style.left = 250;
  document.getElementsByClassName("main1")[0].style.width = 500;
  document.getElementsByClassName("main1")[0].style.height = 500;

  document.getElementsByClassName("dark1")[0].style.left = 220;
  document.getElementsByClassName("dark1")[0].style.width = 500;
  document.getElementsByClassName("dark1")[0].style.height = 500;

  document.getElementsByClassName("main2")[0].style.top = mainTwoStart;
  document.getElementsByClassName("dark2")[0].style.top = mainTwoStart;

  document.getElementsByClassName("main3")[0].style.top = mainThreeStart;
  document.getElementsByClassName("dark3")[0].style.top = mainThreeStart;
}

function clickWisteria() {
  //setting proper background
  document.getElementById("background1").style.opacity = 1;
  document.getElementById("background2").style.opacity = 0;
  document.getElementById("background3").style.opacity = 0;
  
  //choosing which images to move back based on what album was currently selected on click
  if (albumSelected == "comeback") {
    var elem3 = document.getElementsByClassName("main2")[0];
    var elem4 = document.getElementsByClassName("dark2")[0];
  }
  else if (albumSelected == "coherent") {
    var elem3 = document.getElementsByClassName("main3")[0];
    var elem4 = document.getElementsByClassName("dark3")[0];
  }

  //choosing images to move out
  var elem1 = document.getElementsByClassName("main1")[0];
  var elem2 = document.getElementsByClassName("dark1")[0];
  
  //this code will execute 100 times, 0.01 seconds apart
  var tick = 0;
  var id = setInterval(frame, 2);
  function frame() {
	//at 100, officially change the album selected, fade buttons in, and end loop
    if (tick == 100) {
      albumSelected = "wisteria";
      buttonCheck();
      clearInterval(id);
	  document.getElementById("button2").style.opacity = 1;
	  document.getElementById("button3").style.opacity = 1;
    }
	
	//move images
    else {
      tick++;
      elem1.style.top = logisticCurve(mainOneStart, 150, 100, 0.1, tick);
      elem2.style.top = logisticCurve(mainOneStart, 120, 100, 0.1, tick);
      elem1.style.left = logisticCurve(12, 250, 100, 0.1, tick);
      elem2.style.left = logisticCurve(12, 220, 100, 0.1, tick);
      elem1.style.width = logisticCurve(125, 500, 100, 0.1, tick);
      elem2.style.width = logisticCurve(125, 500, 100, 0.1, tick);
      elem1.style.height = logisticCurve(125, 500, 100, 0.1, tick);
      elem2.style.height = logisticCurve(125, 500, 100, 0.1, tick);

      elem3.style.top = logisticCurve(150, returnPosition, 100, 0.1, tick);
      elem4.style.top = logisticCurve(120, returnPosition, 100, 0.1, tick);
      elem3.style.left = logisticCurve(250, 12, 100, 0.1, tick);
      elem4.style.left = logisticCurve(220, 12, 100, 0.1, tick);
      elem3.style.width = logisticCurve(500, 125, 100, 0.1, tick);
      elem4.style.width = logisticCurve(500, 125, 100, 0.1, tick);
      elem3.style.height = logisticCurve(500, 125, 100, 0.1, tick);
      elem4.style.height = logisticCurve(500, 125, 100, 0.1, tick);
    }
  }
}


//the other two functions are similar
function clickComeback() {
  document.getElementById("background1").style.opacity = 0;
  document.getElementById("background2").style.opacity = 1;
  document.getElementById("background3").style.opacity = 0;

  if (albumSelected === "wisteria") {
    var elem3 = document.getElementsByClassName("main1")[0];
    var elem4 = document.getElementsByClassName("dark1")[0];
  }
  else if (albumSelected === "coherent") {
    var elem3 = document.getElementsByClassName("main3")[0];
    var elem4 = document.getElementsByClassName("dark3")[0];
  }



  var elem1 = document.getElementsByClassName("main2")[0];
  var elem2 = document.getElementsByClassName("dark2")[0];
  var tick = 0;
  var id = setInterval(frame, 2);
  function frame() {
    if (tick == 100) {
      albumSelected = "comeback";
      buttonCheck();
      clearInterval(id);
	  document.getElementById("button1").style.opacity = 1;
	  document.getElementById("button3").style.opacity = 1;
    }
    else {
      tick++;
      elem1.style.top = logisticCurve(mainTwoStart, 150, 100, 0.1, tick);
      elem2.style.top = logisticCurve(mainTwoStart, 120, 100, 0.1, tick);
      elem1.style.left = logisticCurve(12, 250, 100, 0.1, tick);
      elem2.style.left = logisticCurve(12, 220, 100, 0.1, tick);
      elem1.style.width = logisticCurve(125, 500, 100, 0.1, tick);
      elem2.style.width = logisticCurve(125, 500, 100, 0.1, tick);
      elem1.style.height = logisticCurve(125, 500, 100, 0.1, tick);
      elem2.style.height = logisticCurve(125, 500, 100, 0.1, tick);

      elem3.style.top = logisticCurve(150, returnPosition, 100, 0.1, tick);
      elem4.style.top = logisticCurve(120, returnPosition, 100, 0.1, tick);
      elem3.style.left = logisticCurve(250, 12, 100, 0.1, tick);
      elem4.style.left = logisticCurve(220, 12, 100, 0.1, tick);
      elem3.style.width = logisticCurve(500, 125, 100, 0.1, tick);
      elem4.style.width = logisticCurve(500, 125, 100, 0.1, tick);
      elem3.style.height = logisticCurve(500, 125, 100, 0.1, tick);
      elem4.style.height = logisticCurve(500, 125, 100, 0.1, tick);
    }
  }
}

function clickCoherent() {
  document.getElementById("background1").style.opacity = 0;
  document.getElementById("background2").style.opacity = 0;
  document.getElementById("background3").style.opacity = 1;

  if (albumSelected == "comeback") {
    var elem3 = document.getElementsByClassName("main2")[0];
    var elem4 = document.getElementsByClassName("dark2")[0];
  }
  else if (albumSelected == "wisteria") {
    var elem3 = document.getElementsByClassName("main1")[0];
    var elem4 = document.getElementsByClassName("dark1")[0];
  }



  var elem1 = document.getElementsByClassName("main3")[0];
  var elem2 = document.getElementsByClassName("dark3")[0];
  var tick = 0;
  var id = setInterval(frame, 2);
  function frame() {
    if (tick == 100) {
      clearInterval(id);
      albumSelected = "coherent";
      buttonCheck();
	  document.getElementById("button1").style.opacity = 1;
	  document.getElementById("button2").style.opacity = 1;
    }
    else {
      tick++;
      elem1.style.top = logisticCurve(mainThreeStart, 150, 100, 0.1, tick);
      elem2.style.top = logisticCurve(mainThreeStart, 120, 100, 0.1, tick);
      elem1.style.left = logisticCurve(12, 250, 100, 0.1, tick);
      elem2.style.left = logisticCurve(12, 220, 100, 0.1, tick);
      elem1.style.width = logisticCurve(125, 500, 100, 0.1, tick);
      elem2.style.width = logisticCurve(125, 500, 100, 0.1, tick);
      elem1.style.height = logisticCurve(125, 500, 100, 0.1, tick);
      elem2.style.height = logisticCurve(125, 500, 100, 0.1, tick);

      elem3.style.top = logisticCurve(150, returnPosition, 100, 0.1, tick);
      elem4.style.top = logisticCurve(120, returnPosition, 100, 0.1, tick);
      elem3.style.left = logisticCurve(250, 12, 100, 0.1, tick);
      elem4.style.left = logisticCurve(220, 12, 100, 0.1, tick);
      elem3.style.width = logisticCurve(500, 125, 100, 0.1, tick);
      elem4.style.width = logisticCurve(500, 125, 100, 0.1, tick);
      elem3.style.height = logisticCurve(500, 125, 100, 0.1, tick);
      elem4.style.height = logisticCurve(500, 125, 100, 0.1, tick);
    }
  }
}
