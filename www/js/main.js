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


function onDeviceReady(){
    document.getElementById('tabList').style.marginLeft = "-99999px";
  showHomeTab();
  // console.log(document.getElementById('tabList'));

}

let login = () => {
    document.getElementById('secondPage').click();
    document.getElementById('tabList').style.marginLeft = "0";
    document.getElementById('home').style.display = "none";
    console.log('test');
}

function showHomeTab() {
  document.getElementById('home').click();
}

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
