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