var MySql = {
    _internalLoginCallback : function(queryReturned) {


            if (!queryReturned.Success) {
                console.log(queryReturned.Error);
                alert(queryReturned.Error)
            } else {
                if(queryReturned.Result.length === 0){
                    document.getElementById('error').style.display = "block";
                    return;
                } else {
                    document.getElementById('error').style.display = "none";
                    let userId = queryReturned.Result[0].studentID;
                    localStorage.setItem("id", userId);

                    entry();
                }
            }

    },
    _internalCreateCallback : function(queryReturned) {


            if (!queryReturned.Success) {
                alert(queryReturned.Error);
            } else {
                document.getElementById('error').style.display = "none";
                home();

            }

    },
    _internalSearchCallback : function(queryReturned) {


        if (!queryReturned.Success) {
            alert(queryReturned.Error);
        } else {
            document.getElementById('searchError').style.display = "none";
            localStorage.setItem("searchResult", JSON.stringify(queryReturned.Result));

            document.getElementById('searchInput').style.padding = "20vh 5vw";
            console.log(queryReturned.Result);
                body        = document.getElementById('searchInput');
                table       = document.createElement("table");
                tableBody   = document.createElement("tbody");
                tableHeader = document.createElement("tr");

                for (var i=0; i<queryReturned.Result[0].length; i++) {
                    var cell     = document.createElement("th");
                    var cellText = document.createTextNode(queryReturned.Result[0].keys()[i]);
                    cell.appendChild(cellText);
                    tableHeader.appendChild(cell);
                }
                tableBody.appendChild(tableHeader);

                for (var i=0; i<queryReturned.Result.length; i++) {
                    var tableRow = document.createElement("tr");

                    var cell     = document.createElement("td");
                    var cellContent = document.createElement('a');
                    cellContent.setAttribute('href', "#");

                    var groupID = Object.values(queryReturned.Result[i])[0];

                    cellContent.setAttribute('onclick', `showDetail(event, 'groupDetail', '${groupID}')`);
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
                table.appendChild(tableBody);
                table.setAttribute("border", "1");
                table.style.borderCollapse="collapse";
                body.appendChild(table);

        }

    },
    _internalShowDetailCallback : function(queryReturned) {


        if (!queryReturned.Success) {
            alert(queryReturned.Error);
        } else {

            document.getElementById("detail").innerHTML =
                    JSON.stringify(queryReturned.Result, null, 2);
            //console.log(queryReturned.Result);
            var lat, lon;
            lat = Object.values(queryReturned.Result[0])[2];
            lon = Object.values(queryReturned.Result[0])[3];
            console.log(lat,lon);
            initMap(lat, lon);
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