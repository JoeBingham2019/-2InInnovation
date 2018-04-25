/*
* index.js
* Put your JavaScript in here
*/

"use strict";

/*===========================*/
/* put global variables here */
/*===========================*/


/* wait until all phonegap/cordova is loaded then call onDeviceReady*/
document.addEventListener("deviceready", onDeviceReady, false);




function showHomeTab() {
  document.getElementById('login').click();
}

/******************************************************************************/
/***********************************Tabs***************************************/
/******************************************************************************/

function showTab(event, tabName) {
    // Declare all variables
    var i, tabContentElems, tabLinkElems;

    // Get all elements with class="tabContent" and hide them
    tabContentElems = document.getElementsByClassName("tabContent");
    for (i = 0; i < tabContentElems.length; i++) {
        tabContentElems[i].style.display = "none";
    }

    // Get all elements with class="tabLink" and remove class "active"
    tabLinkElems = document.getElementsByClassName("tabLink");
    for (i = 0; i < tabLinkElems.length; i++) {
        tabLinkElems[i].className =
          tabLinkElems[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
}

/******************************************************************************/
/*******************************End Tabs***************************************/
/******************************************************************************/

/*hide nav on device ready and show the login screen*/
function onDeviceReady(){
    document.getElementById('tabList').style.marginLeft = "-99999px";
    document.getElementById('tabList').style.height = "0vh";
    showHomeTab();
}

/*take the info, create a session variable, pass to next page, enable the next page navbar*/
let login = () => {
    let username = document.getElementById('asurite').value;
    sessionStorage.setItem("username", username);

    document.getElementById("usernameOutput").innerHTML = `Welcome, ${sessionStorage.getItem("username")}`;

    document.getElementById('tabList').style.marginLeft = "0";
    document.getElementById('login').style.display = "none";
    document.getElementById('tabList').style.height = "auto";


    document.getElementById('secondPage').click();

}
