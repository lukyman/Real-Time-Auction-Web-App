var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'a.manan.',
    database:'auction'
})

 connection.connect();
//console.log(connection);
// connection.query('select * from user',function(err, rows,fields){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(fields);
//     }
// })

module.exports = connection;