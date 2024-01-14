const  Pool  = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
        user : "postgres",
        password : '123456',
        host : "localhost",
        port : 5432,
        database : 'todoapp',
        
})
    

module.exports = pool

// const  {Client}  = require('pg')

// const client = new Client({
//     user : "postgres",
//     password : '123456',
//     host : "localhost",
//     port : 5432,
//     database : 'todoapp',
// })

// client.connect();

// client.query(`SELECT * FROM todos1`,(err,res)=>{
//     if(!err){
//         console.log(res.rows)
//     }
//     else{
//         console.log(err.message);
//     }
//     client.end();

// })

