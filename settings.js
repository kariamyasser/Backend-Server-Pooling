 exports.dbConfig = {
    user: "",
    password:"",
   server:"",
   database: "",
    port: 1433,
    pool: {
        max: 100,
        min: 0,
        idleTimeoutMillis: 3000
    }

};  

exports.webPort= 9000;
exports.httpMsgsFormat = "JSON";