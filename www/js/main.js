/*
* index.js
* Put your JavaScript in here
*/

"use strict";

/*===========================*/
/* put global variables here */
/*===========================*/

let confirmPassWordValue = false;


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
    MySql.Execute(`SELECT id from login where username = "${username}"`, MySql._internalLoginCallback);

}

let createAccount = () => {
    let username = document.getElementById('username').value;
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let password = document.getElementById('firstPassword').value;

    if(!confirmPassWordValue){
        document.getElementById('createError').innerHTML = "Error: Please make sure passwords match.";
        document.getElementById('createError').style.display = "block";
        return;

    } else if(username.length == 0 || firstName.length == 0 || lastName.length == 0) {
        document.getElementById('createError').innerHTML = "Error: Please make sure no textboxes are empty";
        document.getElementById('createError').style.display = "block";
        return;
    }

    let query = `insert into login (username, firstName, lastName, password) values ('${username}',
        '${firstName}', '${lastName}', '${password}';`;

    MySql.Execute(query, MySql._internalCreateCallback);


}

let confirmPassword = (thisObject) => {
    let firstPassword = document.getElementById('firstPassword').value;
    let secondPassword = thisObject.value;


    if(firstPassword.indexOf(secondPassword) > -1 ){
        document.getElementById('passwordVerify').style.borderBottom = 'thick solid green';
        if(firstPassword.length  === secondPassword.length){
        confirmPassWordValue = true;
        console.log(confirmPassWordValue);
        }

    } else {
        document.getElementById('passwordVerify').style.borderBottom = 'thick solid red';

    }

}

let create = () => {
    document.getElementById('create').click();
}

let home = () => {
    document.getElementById('login').click();
}