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
                    let userId = queryReturned.Result[0].id;
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