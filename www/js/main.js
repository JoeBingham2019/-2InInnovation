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


const confirmPassword = (thisObject) => {
    console.log('test');
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

const hideElement = () => {
    document.getElementById('tabList').style.marginLeft = "0";
    document.getElementById('login').style.display = "none";
    document.getElementById('create').style.display = "none";
    document.getElementById('tabList').style.height = "auto";
}


function clearSearch(){
    document.getElementById('searchTerm').value = "";
    if(document.getElementById('resultsTable') != null){
        document.getElementById('resultsTable').innerHTML = "";
    }
}

function findMe(){
    document.getElementById('searchTerm').placeholder = "My Groups";
}

function showHomeTab() {
    let usernameTest = localStorage.getItem('username');

  if(typeof usernameTest !== 'undefined' && usernameTest !== null) {
        entry();

    } else {

        document.getElementById('login').click();
    }

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

    if (tabName == "createGroupContent")
    {
        createMap();
    }

    // Show the current tab, and add an "active" class to the link
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";

    //document.getElementById('resultsTable').innerHTML = "";
}


function showDetail(event, tabName, groupID) {

    let query = `select * from myGroups where groupID = ${groupID} and studentId = ${localStorage.id}`;

        MySql.Execute(query, MySql._internalCheckForGroupMembership);


    localStorage.setItem('selectedGroupId', groupID);
    showTab(event, tabName);
}

/******************************************************************************/
/*******************************End Tabs***************************************/
/******************************************************************************/

/*hide nav on device ready and show the login screen*/
function onDeviceReady(){
    // document.getElementById("createGroup").addEventListener("click", hideElement);
    document.getElementById('tabList').style.marginLeft = "-99999px";
    document.getElementById('tabList').style.height = "0vh";
    showHomeTab();
}

/*take the info, create a session variable, pass to next page, enable the next page navbar*/
const login = () => {
    let username = document.getElementById('asurite').value;
    let password = document.getElementById('loginPassword').value;

    localStorage.setItem("username", username);
    MySql.Execute(`SELECT studentID from user where userName = "${username}" and userPassword = "${password}"`, MySql._internalLoginCallback);

}

const createAccount = () => {
    let username = document.getElementById('username').value;
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let password = document.getElementById('firstPassword').value;
    let id = document.getElementById('id').value;

    if(!confirmPassWordValue){
        document.getElementById('createError').innerHTML = "Error: Please make sure passwords match.";
        document.getElementById('createError').style.display = "block";
        return;

    } else if(username.length == 0 || firstName.length == 0 || lastName.length == 0) {
        document.getElementById('createError').innerHTML = "Error: Please make sure no textboxes are empty";
        document.getElementById('createError').style.display = "block";
        return;
    }

    let query = "insert into user (studentID, userName, firstName, lastName, userPassword) values ('" + id + "','" + username + "','" + firstName + "','" + lastName + "','" + password +"')";

    MySql.Execute(query, MySql._internalCreateCallback);


}


const create = () => {
    document.getElementById('create').click();
}

const home = () => {
    document.getElementById('login').click();
}

const entry = () => {
      document.getElementById("usernameOutput").innerHTML = `Welcome, ${localStorage.getItem("username")}. Your ID is: ${localStorage.getItem("id")}.`;
                    document.getElementById('tabList').style.marginLeft = "0";
                    document.getElementById('login').style.display = "none";
                    document.getElementById('create').style.display = "none";
                    document.getElementById('tabList').style.height = "auto";
                    document.getElementById('primaryPage').click();
}

const logout = () => {

    document.getElementById('error').style.display = "none";

        localStorage.removeItem('id');
        localStorage.removeItem('username');
        document.getElementById('asurite').value = "";
        document.getElementById('loginPassword').value = "";



    onDeviceReady();
}

const search = () => {
    const searchTerm = document.getElementById('searchTerm').value;
    const searchId = localStorage.id;

    const classSearch = document.getElementById('searchClass');
    const peopleSearch = document.getElementById('searchPeople');
    const locationSearch = document.getElementById('searchLocation');
    const myGroupsSearch = document.getElementById('searchMe');
     let query = "";


    if(searchTerm.length === 0){
        query = "error";
    } else if(classSearch.checked){

        query = `Select * from studyGroup where courseName like "%${searchTerm}%"`;
        //console.log(query);
    } else if (peopleSearch.checked){
        //console.log('people');
        const concatNames = searchTerm.replace(/\s+/g, '');

        query = `Select * from myGroups where concat(firstName, lastName) like "%${concatNames}%"`;
    } else if (locationSearch.checked){
        //console.log('location');
        query = `Select * from studyGroup where location like "%${searchTerm}%"`;
    } else if (myGroupsSearch.checked){
        //console.log('location');

        query = `Select * from myGroups where studentId = ${searchId}`;
    }else {
        query = "error"
    }

    if(query != "error"){
        document.getElementById('searchResult').innerHTML = "";
        MySql.Execute(query, MySql._internalSearchCallback);
    } else {
        let error = document.getElementById('searchError');
        error.innerHTML = "Woops - error! Please make sure a button is pushed or the textbox is not empty.";
        error.style.display = "block";
    }
}




const groupSearch = () => {
    //const searchTerm = localStorage.id;


    //const classSearch = document.getElementById('searchClass');
    //const peopleSearch = document.getElementById('searchPeople');
    //const locationSearch = document.getElementById('searchLocation');
     //let profileQuery = "";



       let profileQuery = 'Select * from myGroups where studentId = 1123581321';
        //console.log(query);




    if(profileQuery != "error"){
        document.getElementById('myProfileResult').innerHTML = "";
        MySql.Execute(profileQuery, MySql._internalProfileCallback);
    } else {
        console.log('it ran');
        let error = document.getElementById('searchError');
        error.innerHTML = "Woops - error! Please make sure a button is pushed or the textbox is not empty.";
        error.style.display = "block";
    }


}


const toggleButton = (clickedObject) => {
    let activeButton = document.getElementsByClassName('selectedButton');
    activeButton[0].childNodes[3].removeAttribute("checked");
    activeButton[0].classList.remove("selectedButton");
    clickedObject.classList.add("selectedButton");
    clickedObject.childNodes[3].setAttribute("checked", "checked");

    if(clickedObject.id = 'myGroupButton'){
        document.getElementById('searchTerm').value = localStorage.id;
    }

}

function initMap(latNumber, lonNumber) {
            var mapElement      = document.getElementById('map');
            latNumber = Number(latNumber);
            lonNumber = Number(lonNumber);
            var geoLocationASU  = {lat: latNumber, lng: lonNumber};
            var mapOptions      = {zoom: 18, center: geoLocationASU};

            var mapper = new google.maps.Map(mapElement, mapOptions);

            var markerOptions   = {position: geoLocationASU, map: mapper};
            var marker = new google.maps.Marker(markerOptions);
            //console.log("map");
}




const creatGroup = () => {
   let classID = document.getElementById('ClassName').value;
   let numofPeople = document.getElementById('numOfPeople').value;
   let locDescription = document.getElementById('locDesc').value;
   let startTime = document.getElementById('startTime').value;
   let endTime = document.getElementById('endTime').value;
   let date = document.getElementById('Date').value;

   let groupInsert = "insert into studyGroup (courseName,lat,lon,location,studyDate,startTime,EndTime,maxSize) values ('" + classID + "','" + localStorage.currentlat + "','" + localStorage.currentlon + "','" + locDescription + "','" + date + "','" + startTime + "','" + endTime + "','" + numofPeople + "')";
   console.log(groupInsert);
   MySql.Execute(groupInsert,MySql._internalJoinCallback);

   //document.getElementById('searchTerm').value = classID;
   //showTab(event, 'search');

   var query = `SELECT * FROM studyGroup WHERE groupId=(SELECT MAX(groupId) FROM studyGroup);`;
   console.log(query);
   if(query != "error"){
        //MySql.Execute(query, MySql._internalCreateJoinCallback);
        MySql.Execute(query, MySql._internalCreateJoinCallback);
        //showDetail(event, 'groupDetail', localStorage.selectedGroupId);

    }

}







function  createMap() {
     var onSuccess = function(position) {
        localStorage.setItem('currentlat', position.coords.latitude);
        localStorage.setItem('currentlon', position.coords.longitude);
    };
        //navigator.geolocation.getCurrentPosition(onSuccess);
        var latNumber;
        var lonNumber;
        // if (localStorage.currentlon != null || localStorage.currentlat != null)
        // {
        //     latNumber = localStorage.currentlat;
        //     latNumber = localStorage.currentlon;
        //     //initMap(localStorage.currentlat,localStorage.currentlon);
        // }
        // else
        // {
            //initMap('33.4166317','-111.9341069');
            latNumber = 33.4166317;
            lonNumber = -111.9341069;

        // }
            console.log(latNumber,lonNumber);
            var mapElement      = document.getElementById('mapDiv');
            latNumber = Number(latNumber);
            lonNumber = Number(lonNumber);
            var geoLocationASU  = {lat: latNumber, lng: lonNumber};
            var mapOptions      = {zoom: 18, center: geoLocationASU};

            var mapper = new google.maps.Map(mapElement, mapOptions);

            var markerOptions   = {position: geoLocationASU, map: mapper, draggable:true, title:"Drag me!"};
            var marker = new google.maps.Marker(markerOptions);

            // mapper.addListener('mouseup', function() {
            //     localStorage.setItem('currentlat',marker.position.lat());
            //     localStorage.setItem('currentlon',marker.position.lng());
            //     console.log('record success');
            // });
            google.maps.event.addListener(marker, 'mouseup', function() {
                localStorage.setItem('currentlat',marker.position.lat());
                localStorage.setItem('currentlon',marker.position.lng());
                console.log(localStorage.currentlat,localStorage.currentlon);
            });


}



function join() {
   let query = "";
   let userId = localStorage.id;
   let groupId = localStorage.selectedGroupId;

   query = `INSERT INTO db_test_rur3ady.groupMembers (groupId, studentId) VALUES ('${groupId}', '${userId}');`;
   console.log(query);
   MySql.Execute(query, MySql._internalJoinCallback);
   console.log("success!");
   //showDetail(event, 'groupDetail', localStorage.selectedGroupId);
   document.getElementById('secondPage').click();

}

