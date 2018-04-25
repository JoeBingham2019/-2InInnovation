var MySql = {
    _internalCallback : function(queryReturned) {


            if (!queryReturned.Success) {
                console.log(queryReturned.Error);
                alert(queryReturned.Error)
            } else {
                console.log(queryReturned.Result);
                document.getElementById("output").innerHTML =
                    JSON.stringify(queryReturned.Result, null, 2);
            }

    },
    Execute: function (Sql, Callback) {
        MySql._internalCallback = Callback;
        // to-do: change localhost: to mysqljs.com
        var strSrc = "http://mysqljs.com/sql.aspx?";
        strSrc += "Host=wpcdmazzola01.cloud.wpcarey.asu.edu";
        strSrc += "&Username=jabingh1";
        strSrc += "&Password=bing1335";
        strSrc += "&Database=db_test_jabingh1";
        strSrc += "&sql=" + Sql;
        strSrc += "&Callback=MySql._internalCallback";
        var sqlScript = document.createElement('script');
        sqlScript.setAttribute('src', strSrc);
        document.head.appendChild(sqlScript);
    }
};