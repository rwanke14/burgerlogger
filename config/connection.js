const mysql = require('mysql');

//Setting up connection to mySQL through the JAWSDB addon in heroku for deployment with heroku.

if(process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else{

//Default connection to mysql if JAWSDB has issues or it is not used on heroku.
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  
  password: 'password',
  database: 'burgers_db',
});

}

// Make connection.
connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }
  console.log(`connected as id ${connection.threadId}`);
});

// Export connection to ORM to use.
module.exports = connection;