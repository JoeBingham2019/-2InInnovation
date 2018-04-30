//bool to tell if the show join button should be enabled or disabed (referenced in _internalCheckForGroupMembership)
let showJoinButton = true;

var MySql = {
    //function that is run when a user logs in
    _internalLoginCallback : function(queryReturned) {

            //if failure show the error
            if (!queryReturned.Success) {
                console.log(queryReturned.Error);
                alert(queryReturned.Error)

            } else {

                //if the query returns correctly but there are no results
                if(queryReturned.Result.length === 0){
                    document.getElementById('error').style.display = "block";
                    return;

                    //if the query is successful
                } else {
                    document.getElementById('error').style.display = "none";
                    let userId = queryReturned.Result[0].studentID;
                    localStorage.setItem("id", userId);

                    //function that handles the redirect
                    entry();
                }
            }

    },
    //function that is run when an account is created
    _internalCreateCallback : function(queryReturned) {

            //if failure through error
            if (!queryReturned.Success) {
                alert(queryReturned.Error);
                //if successful then hide the error
            } else {
                document.getElementById('error').style.display = "none";
                //redirect home
                home();

            }

    },
    //callback that runs when a user searches for something on the search page
    _internalSearchCallback : function(queryReturned) {


        let tableCheck = document.getElementById('resultsTable');

        //check to see if there is anything in the table. If there is, remove it prior to the new search
        if(tableCheck != null){
            tableCheck.remove();
        }

        //check for error
        if (!queryReturned.Success) {
            alert(queryReturned.Error);
        } else {

            //check to see if the search returned any groups
            if(queryReturned.Result.length > 0)
            {

            //hide the error if it was displayed
            document.getElementById('searchError').style.display = "none";

            //store the results in the localstorage as a json object
            localStorage.setItem("searchResult", JSON.stringify(queryReturned.Result));

            //move the searchbar up to give room for results
            document.getElementById('searchInput').style.padding = "5vh 5vw";


            //table construct
                body        = document.getElementById('searchInput');
                table       = document.createElement("table");
                table.id = 'resultsTable';
                tableBody   = document.createElement("tbody");
                tableHeader = document.createElement("tr");

                //loop through results and add the headings
                for (var i=0; i<queryReturned.Result[0].length; i++) {
                    var cell     = document.createElement("th");
                    var cellText = document.createTextNode(queryReturned.Result[0].keys()[i]);
                    cell.appendChild(cellText);
                    tableHeader.appendChild(cell);
                }
                tableBody.appendChild(tableHeader);

                //loop through the results and construct the table
                for (var i=0; i<queryReturned.Result.length; i++) {
                    var tableRow = document.createElement("tr");

                    var cell     = document.createElement("td");
                    var cellContent = document.createElement('a');
                    tableRow.setAttribute('href', "#");

                    var groupID = Object.values(queryReturned.Result[i])[0];

                    tableRow.setAttribute('onclick', `showDetail(event, 'groupDetail', '${groupID}')`);
                    console.log(cellContent);

                    cellContent.innerHTML = Object.values(queryReturned.Result[i])[1];
                    cell.appendChild(cellContent);
                    tableRow.appendChild(cell);

                    var cell     = document.createElement("td");

                    var cellText = document.createTextNode(Object.values(queryReturned.Result[i])[4]);

                    cell.appendChild(cellText);
                    tableRow.appendChild(cell);

                    tableBody.appendChild(tableRow);
                }

                //append all the the times
                table.appendChild(tableBody);
                table.setAttribute("border", "1");
                table.style.borderCollapse="collapse";
                body.appendChild(table);

                //if no results were returned, throw an error
            } else {
                 let error = document.getElementById('searchError');
                error.innerHTML = "No Results. Please modify your search and try again.";
                error.style.display = "block";

            }

        }

    },
    //callback that runs to check if a user is in a group already
    _internalCheckForGroupMembership : function(queryReturned){

        //reset all values to default
        document.getElementById('groupJoinButton').disabled = false;
        document.getElementById('groupJoinButton').style.backgroundColor = 'white';
        document.getElementById('groupJoinButton').style.opacity = '1';
        document.getElementById('groupJoinButton').style.color = 'black';

        //if anything was returned, disable the join button
        if(queryReturned.Result.length > 0){
            showJoinButton = false;
        }

        //query for group details
        let query;
        query = `Select * from studyGroup where groupID = "${localStorage.selectedGroupId}"`;
        if(query != "error"){
            MySql.Execute(query, MySql._internalShowDetailCallback);
        }
    },

    //callback that runs to show group details
    _internalShowDetailCallback : function(queryReturned) {

        //if there's a failure throw error
        if (!queryReturned.Success) {
            alert(queryReturned.Error);
        } else {


            //display all the details

            // document.getElementById("detail").innerHTML =
            //         JSON.stringify(queryReturned.Result, null, 2);
            //console.log(queryReturned.Result);
            var date = new Date(Object.values(queryReturned.Result[0])[5]);
            var dateString = date.toDateString();
            console.log(date);
            document.getElementById('detailCourseName').innerHTML = "<div id='detailsCourseName'>Course Name: "+ Object.values(queryReturned.Result[0])[1] + "</div><br/>";
            document.getElementById('detailLocation').innerHTML = "<div class='detailsContainer'><span class='label'>Location:</span><span class='details'> " + Object.values(queryReturned.Result[0])[4] + "</span></div><br/>";
            document.getElementById('detailStudyDate').innerHTML = "<div class='detailsContainer'><span class='label'>Study Date:</span><span class='details'> "+ dateString + "</span></div><br/>";
            document.getElementById('detailStartTime').innerHTML = "<div class='detailsContainer'><span class='label'>Start Time:</span><span class='details'> "+Object.values(queryReturned.Result[0])[6] + "</span></div><br/>";
            document.getElementById('detailEndTime').innerHTML = "<div class='detailsContainer'><span class='label'>End Time:</span><span class='details'> " +Object.values(queryReturned.Result[0])[7] + "</span></div><br/>";

            //set map details
            var lat, lon;
            lat = Object.values(queryReturned.Result[0])[2];
            lon = Object.values(queryReturned.Result[0])[3];
            console.log(lat,lon);
            initMap(lat, lon);

            //if the button should be disabled, disable it

            if(!showJoinButton){
                document.getElementById('groupJoinButton').disabled = true;
                document.getElementById('groupJoinButton').style.backgroundColor = 'red';
                document.getElementById('groupJoinButton').style.opacity = '.5';
                document.getElementById('groupJoinButton').style.color = 'white';
            }

            //reset
            showJoinButton = true;
        }

    },
     //callback that runs when a user joins a group
    _internalJoinCallback : function(queryReturned) {


           if (!queryReturned.Success) {
               alert(queryReturned.Error);
           } else {




           }

   },

    //callback that runs when a user joins a group
    _internalCreateJoinCallback : function(queryReturned) {


           if (!queryReturned.Success) {
               alert(queryReturned.Error);
           } else {
                console.log(queryReturned.Result);
                //save the group id to local storage
                localStorage.selectedGroupId = Object.values(queryReturned.Result[0])[0];
                //join the group
                join();

           }

   },
    Execute: function (Sql, Callback) {
        MySql._internalCallback = Callback;
        // to-do: change localhost: to mysqljs.com
        var strSrc = "http://mysqljs.com/sql.aspx?";
        strSrc += "Host=wpcdmazzola01.cloud.wpcarey.asu.edu";
        strSrc += "&Username=rur3ady";
        strSrc += "&Password=wood2261";
        strSrc += "&Database=db_test_rur3ady";
        strSrc += "&sql=" + Sql;
        strSrc += "&Callback=MySql._internalCallback";
        var sqlScript = document.createElement('script');
        sqlScript.setAttribute('src', strSrc);
        document.head.appendChild(sqlScript);
    }
};