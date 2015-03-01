/// <reference path="jquery.js" />
/*
    Filename: main.css
    Author: Danny Luk 300709186
    Last Modified by: Danny Luk
    Last Modified Date: 5 Mar. 2015
    Description: This file contains the code for the functionality and presentation of the slot machine.
*/

//#region Load Images
var slotLayout = new Image(); slotLayout.src = "img/slotLayout.fw.png";
var slotCover = new Image(); slotCover.src = "img/question.fw.png";

var load1 = new Image(); load1.src = "img/load1.fw.png";
var load2 = new Image(); load2.src = "img/load2.fw.png";
var load3 = new Image(); load3.src = "img/load3.fw.png";
var load4 = new Image(); load4.src = "img/load4.fw.png";

var spin1 = new Image(); spin1.src = "img/trash.fw.png";
var spin2 = new Image(); spin2.src = "img/healFruit.fw.png";
var spin3 = new Image(); spin3.src = "img/solarNut.fw.png";
var spin4 = new Image(); spin4.src = "img/seeAllNut.fw.png";
var spin5 = new Image(); spin5.src = "img/banana.fw.png";
var spin6 = new Image(); spin6.src = "img/gariPop.fw.png";
var spin7 = new Image(); spin7.src = "img/meat.fw.png";
var spin8 = new Image(); spin8.src = "img/django.fw.png";

var txtBack = new Image(); txtBack.src = "img/textBackground.fw.png";
//#endregion


//#region Set Slot Coordinates
var slot1 = {};
slot1.x = 66;
slot1.y = 172;
var slot2 = {};
slot2.x = 206;
slot2.y = 172;
var slot3 = {};
slot3.x = 346;
slot3.y = 172;
//#endregion


//#region Variables
var jackpot = 7000;
var money = 500;
var bet = 10;

var spinResult1 = 0;
var spinResult2 = 0;
var spinResult3 = 0;

var trash = 0;
var healFruit = 0;
var solarNut = 0;
var seeAllNut = 0;
var banana = 0;
var gariPop = 0;
var meat = 0;
var django = 0;
//#endregion


//#region Canvas
var leCanvas = document.getElementById("leCanvas");
var paint = leCanvas.getContext("2d");
var cHeight = leCanvas.clientHeight;
var cWidth = leCanvas.clientWidth;
//#endregion


//Initialize on Start
window.onload = function () {
    InitializeGame();               //Reset starting values
}


//Initialize graphics and values
function InitializeGame() {
    //Set starting variables
    jackpot = 7000;
    money = 500;
    bet = 10;

    //Set Initial Slot Rolls
    ResetSlotResults();

    //Draw slots
    paint.drawImage(slotLayout, 0, 0);
    paint.drawImage(slotCover, slot1.x, slot1.y);
    paint.drawImage(slotCover, slot2.x, slot2.y);
    paint.drawImage(slotCover, slot3.x, slot3.y);

    //Print stats
    paint.font = "32pt Courier New";
    paint.fillText(jackpot, 357, 82);
    paint.fillText(money, 375, 367);
    paint.fillText(bet, 355, 436);
}


//Redraw Stats
function UpdateStats() {
    //#region Print Stats
    paint.font = "32pt Courier New";
    paint.drawImage(txtBack, 338, 42);
    paint.fillText(jackpot, 357, 82);

    paint.drawImage(txtBack, 355, 327);
    paint.fillText(money, 375, 367);

    paint.drawImage(txtBack, 335, 396);
    paint.fillText(bet, 355, 436);
    //#endregion
}


//Animation > Spin Reels
function SpinReels() {
    //#region Animate Spinning
    paint.drawImage(load1, slot1.x, slot1.y);
    paint.drawImage(load1, slot2.x, slot2.y);
    paint.drawImage(load1, slot3.x, slot3.y);

    setTimeout(function () {
        paint.drawImage(load2, slot1.x, slot1.y);
        paint.drawImage(load2, slot2.x, slot2.y);
        paint.drawImage(load2, slot3.x, slot3.y);
    }, 200);

    setTimeout(function () {
        paint.drawImage(load3, slot1.x, slot1.y);
        paint.drawImage(load3, slot2.x, slot2.y);
        paint.drawImage(load3, slot3.x, slot3.y);
    }, 400);

    setTimeout(function () {
        paint.drawImage(load4, slot1.x, slot1.y);
        paint.drawImage(load4, slot2.x, slot2.y);
        paint.drawImage(load4, slot3.x, slot3.y);
    }, 600);
    //#endregion

    //#region Generate Spin Results
    setTimeout(function () {
        spinResult1 = Math.floor((Math.random() * 100) + 1);
        spinResult2 = Math.floor((Math.random() * 100) + 1);
        spinResult3 = Math.floor((Math.random() * 100) + 1);
        DisplaySpinResults(1, spinResult1);
        DisplaySpinResults(2, spinResult2);
        DisplaySpinResults(3, spinResult3);
    }, 800);
    //#endregion

    //#region Compare Results, Pay Winnings, and Reset Results
    setTimeout(function () {
        PayWinnings();
        ResetSlotResults();
    }, 800);
    //#endregion
}


//Resets Results Slot Results
function ResetSlotResults() {
    trash = 0;
    healFruit = 0;
    solarNut = 0;
    seeAllNut = 0;
    banana = 0;
    gariPop = 0;
    meat = 0;
    django = 0;
}


//Display Results
function DisplaySpinResults(slot, result) {
    //Var
    var drawX, drawY;

    //#region Determine: Where to Draw Results
    switch (slot) {
        case 1:
            drawX = slot1.x;
            drawY = slot1.y;
            break;
        case 2:
            drawX = slot2.x;
            drawY = slot2.y;
            break;
        case 3:
            drawX = slot3.x;
            drawY = slot3.y;
            break;
        default:
            break;
    }
    //#endregion

    //#region Determine: Result to Draw + Track Results
    switch (result) {
        case checkRange(result, 1, 20):         //20
            paint.drawImage(spin1, drawX, drawY);
            trash++;
            break;
        case checkRange(result, 21, 40):        //20
            paint.drawImage(spin2, drawX, drawY);
            healFruit++;
            break;
        case checkRange(result, 41, 55):        //15
            paint.drawImage(spin3, drawX, drawY);
            solarNut++;
            break;
        case checkRange(result, 56, 70):        //15
            paint.drawImage(spin4, drawX, drawY);
            seeAllNut++;
            break;
        case checkRange(result, 71, 80):        //10
            paint.drawImage(spin5, drawX, drawY);
            banana++;
            break;
        case checkRange(result, 81, 90):        //10
            paint.drawImage(spin6, drawX, drawY);
            gariPop++;
            break;
        case checkRange(result, 91, 95):        //5
            paint.drawImage(spin7, drawX, drawY);
            meat++;
            break;
        case checkRange(result, 96, 100):       //5
            paint.drawImage(spin8, drawX, drawY);
            django++;
            break;
    }
    //#endregion
}


//Calculate Payout
function PayWinnings() {
    //#region Check for trash
    switch (trash) {
        case 3:
            money += bet;
            break;
        default:
            break;
    }
    //#endregion

    //#region Check for healFruit
    switch (healFruit) {
        case 2:
            money += bet * 1.5;
            break;
        case 3:
            money += bet * 2;
            break;
        default:
            break;
    }
    //#endregion

    //#region Check for solarNut
    switch (solarNut) {
        case 2:
            money += bet * 2;
            break;
        case 3:
            money += bet * 4;
            break;
        default:
            break;
    }
    //#endregion

    //#region Check for seeAllNut
    switch (seeAllNut) {
        case 2:
            money += bet * 5;
            break;
        case 3:
            money += bet * 10;
            break;
        default:
            break;
    }
    //#endregion

    //#region Check for banana
    switch (banana) {
        case 2:
            money += bet * 10;
            break;
        case 3:
            money += bet * 20;
            break;
        default:
            break;
    }
    //#endregion

    //#region Check for gariPop
    switch (gariPop) {
        case 2:
            money += bet * 20;
            break;
        case 3:
            money += bet * 50;
            break;
        default:
            break;
    }
    //#endregion

    //#region Check for meat
    switch (meat) {
        case 2:
            money += bet * 50;
            break;
        case 3:
            money += bet * 100;
            break;
        default:
            break;
    }
    //#endregion

    //#region Check for django
    switch (django) {
        case 2:
            money += bet * 100;
            break;
        case 3:
            money += bet * 1000;
            money += jackpot;
            jackpot = 0;
            alert("!!<JACKPOT>!!");
            break;
        default:
            break;
    }
    //#endregion

    //Refresh Stats to Display Winnings
    UpdateStats();
}


//Click to Spin
$("#BtnSpin").click(function () {
    if (bet > money) {
        alert("You don't have enough money to gamble. Either decrease the amount you're betting or get more money!");
    } else {
        money -= bet;               //Subract bet amount from money pool
        jackpot += (bet * 0.50);    //Add 50% of the bet amount into the Jackpot pool
        UpdateStats();
        SpinReels();
    }
});


//Click to Increase Bet Amount
$("#BtnBetUp").click(function () {
    if (bet < money) {
        bet += 5;
        UpdateStats();
    } else {
        alert("You don't have enough money to raise the betting amount.");
    }
});

//Click to Decrease Bet Amount
$("#BtnBetDown").click(function () {
    if (bet > 5) {
        bet -= 5;
        UpdateStats();
    } else {
        alert("You can not lower the betting amount any further.");
    }
});

//Click to Reset Game
$("#BtnReset").click(function () {
    InitializeGame();
});

//Click Quit Game
$("#BtnQuit").click(function () {
    if (confirm("Are you leaving already?")) {
        alert("Okay. Bye");
        setTimeout(function () {
            window.close();
        }, 500);
    }
});


/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    } else {
        return !value;
    }
}

