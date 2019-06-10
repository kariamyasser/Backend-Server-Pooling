const sqlDb = require('mssql');
const settings = require('../settings');
const httpMsgs = require('../core/httpMsgs');



exports.executeSql = function (sql, callback) {


    var conn = sqlDb.connect(settings.dbConfig)
        //if connection successful
        .then(function () {

            var req = new sqlDb.Request();
            req.query(sql)
                //if request successful
                .then(function (recordset) {
                    callback(recordset);
                    sqlDb.close();
                })
                //if request failed
                .catch(function (err) {
                    console.log(err);
                    callback(null, err);
                    sqlDb.close();
                });
        })
        //if connection failed
        .catch(function (err) {
            console.log(err);
            callback(null, err); //no data to be sent so we put null
            sqlDb.close();
        });
};


//Connection Pooling

exports.execSql = async function (sqlquery) {
    const pool = new sqlDb.ConnectionPool(settings.dbConfig);
    pool.on('error', err => {
        // ... error handler 
        console.log('sql errors', err);
    });

    try {
        await pool.connect();
        let result = await pool.request().query(sqlquery);
       
        console.log(result);

        return { success: result };
    } catch (err) {
        console.log(err);
        return { err: err };
    } finally {
        pool.close(); //closing connection after request is finished.
    }
};



//single pool

const pool = new sqlDb.ConnectionPool(settings.dbConfig);
pool.on('error', err => {
    if (err) {
        console.log('sql errors', err);
    }
    
});

pool.connect(err => {
    if (err) {
        console.log('failed to connect : ', err);
    }
    else{
        console.log('connected successfully');
    }
   
});


exports.execSql_singlePool = async function (sqlquery) {
    try {
       
        let result = await pool.request().query(sqlquery);
        return { success: result };
    } catch (err) {
        return { err: err };
    }
};

exports.closePool = function () {
    pool.close();
};
/* Calling pool.close() in execSql is not a good idea 
- once you close a pool, 
you can no longer acquire a connection from that pool. 
That means that all subsequent requests will fail.
The good idea is to export a close method and close the 
pool when you're absolutely sure there will be no
 more requests to make (e.g. when application closes). */