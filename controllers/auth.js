const db = require('../core/db');
const httpMsgs = require('../core/httpMsgs');
var util = require('util');

//get operations
exports.login = function (req, resp,email,password) {

    query = "SELECT Id,Name,Phone,email,password FROM users Where email = "+"'"+email+"'";


    db.execSql_singlePool(query).then(function (success) {
     
        resp.writeHead(200, { "Content-Type": "application/json" });
        if (success) {
    
           var data = success["success"]["recordset"];
           var pass = data[0].password;
           if(pass===password){

            var result = JSON.stringify({ 'status':"success",'data': 
            [
                {
                    'Id':data[0].Id,
                    'Name':data[0].Name,
                    'Phone':data[0].Phone,
                    'email':data[0].email
                                }
            ] });
            resp.write(result);

            
        console.log(success);
           }
           else{
            var result = JSON.stringify({ 'status':"Wrong password" });
            resp.write(result);


            console.log("wrong password");
           }

    }
    resp.end();
    }

    ).catch(function (err) {
        console.log("wrong email");
        var result = JSON.stringify({ 'status':"Wrong Email" });
        resp.write(result);
        resp.end();

    }

    );


};



