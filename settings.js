 exports.dbConfig = {
    user: "demo000",
    password:"K01141913988k.",
   server:"den1.mssql3.gear.host",
   database: "demo000",
    port: 1433,
    pool: {
        max: 100,
        min: 0,
        idleTimeoutMillis: 3000
    }

};  

/* exports.dbConfig = {
    user: "sa",
    password:"K01141913988k",
    server:"localhost\\DESKTOP-8LQFHVF",
    database: "demo",
    port: 1433
};  */

exports.webPort= 9000;
exports.httpMsgsFormat = "JSON";