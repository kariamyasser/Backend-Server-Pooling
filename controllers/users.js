const db = require('../core/db');
const httpMsgs = require('../core/httpMsgs');
var util = require('util');

//get operations
exports.getList = function (req, resp) {

    query = 'SELECT * FROM users Order By Id';


    db.execSql_singlePool(query).then(function (success) {
        httpMsgs.sendJson(req, resp, success);
        console.log(success);
    }
    ).catch(function (err) {
        httpMsgs.show500(req, resp, err);

    }

    );


};




exports.getById = function (req, resp, empno) {

    query = 'SELECT * FROM users Where id=' + empno;


    db.execSql_singlePool(query).then(function (success) {
        httpMsgs.sendJson(req, resp, success);
        console.log(success);
    }
    ).catch(function (err) {
        httpMsgs.show500(req, resp, err);

    });

};


exports.getByEmail = function (req, resp, empemail) {

    query = "SELECT * FROM users Where email='" + empemail+"'";


    db.execSql_singlePool(query).then(function (success) {
        httpMsgs.sendJson(req, resp, success);
        console.log(success);
    }
    ).catch(function (err) {
        httpMsgs.show500(req, resp, err);

    });

};



//post operation
exports.add = function (req, resp, reqBody) {
    try {

        if (!reqBody) { throw new Error('Input not valid '); }
        var data = JSON.parse(reqBody);

        if (data) {

            if ( !data.Name || !data.Phone || !data.password || !data.email) { throw new Error('Data not complete'); }
            var sql = "Insert into users(Name,Phone,password,email) Values ";
            //   sql+="("+data.Name+","++")"; normal way

            sql += util.format("('%s'  , %d , '%s' , '%s')", data.Name, data.Phone, data.password, data.email);
            console.log(sql);


            db.execSql_singlePool(sql).then(function (success) {
                httpMsgs.show200(req, resp, success);
                console.log(success);
            }
            ).catch(function (err) {
                httpMsgs.show500(req, resp, err);

            });





        }
        else {
            console.log("error");
            throw new Error('Input not valid');

        }
    }
    catch (ex) {
        console.log("error =" + ex.Error);
        httpMsgs.show500(req, resp, ex.Error);
    }

};

exports.update = function (req, resp, reqBody) {

    try {

        if (!reqBody) { throw new Error('Input not valid '); }
        var data = JSON.parse(reqBody);

        if (data) {

            if (!data.Id) { throw new Error('ID not Avaliable'); }
            var sql = "Update users Set ";
            //   sql+="("+data.Name+","++")"; normal way
            var isProvidedData = false;
            if (data.Name) {
                sql += "Name = '" + data.Name + "',";
                isProvidedData = true;
            }
            if (data.Phone) {
                sql += "Phone = " + data.Phone + ",";
                isProvidedData = true;
            }
            if (data.password) {
                sql += "password = '" + data.password + "',";
                isProvidedData = true;
            }
            if (data.email) {
                sql += "email = '" + data.email + "',";
                isProvidedData = true;
            }

            if (!isProvidedData) { throw new Error('No Data to Update'); }

            sql = sql.slice(0, -1); //remove last comma

            sql += " Where Id = " + data.Id;

            console.log(sql);
            db.execSql_singlePool(sql).then(function (success) {
                httpMsgs.show200(req, resp, success);
                console.log(success);
            }
            ).catch(function (err) {
                httpMsgs.show500(req, resp, err);

            });


        }
        else {
            console.log("error");
            throw new Error('Input not valid');

        }
    }
    catch (ex) {
        console.log("error =" + ex.Error);
        httpMsgs.show500(req, resp, ex.Error);
    }

};

exports.delete = function (req, resp, reqBody) {



    try {

        if (!reqBody) { throw new Error('Input not valid '); }
        var data = JSON.parse(reqBody);

        if (data) {

            if (!data.Id) { throw new Error('ID not Avaliable'); }
            var sql = "Delete From users Where Id = " + data.Id;


            console.log(sql);
            db.execSql_singlePool(sql).then(function (success) {
                httpMsgs.show200(req, resp, success);
                console.log(success);
            }
            ).catch(function (err) {
                httpMsgs.show500(req, resp, err);

            });


        }
        else {
            console.log("error");
            throw new Error('Input not valid');

        }
    }
    catch (ex) {
        console.log("error =" + ex);
        httpMsgs.show500(req, resp, ex);
    }




};