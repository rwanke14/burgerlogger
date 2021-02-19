
const connection = require('./connection.js');

//function to print question marks for the queries to mySQL.
const printQuestionMarks = (num) => {
    const arr = [];

    for (let i = 0; i < num; i++) {
        arr.push('?');
    }

    return arr.toString();
};

//Function to help loop through objects in queries below.
const objToSql = (ob) => {
    const arr = [];


    for (const key in ob) {
        let value = ob[key];

        if (Object.hasOwnProperty.call(ob, key)) {

            if (typeof value === 'string' && value.indexOf(' ') >= 0) {
                value = `'${value}'`;
            }

            arr.push(`${key}=${value}`);
        }
    }


    return arr.toString();
};

//ORM queries for mysql database selection.

const orm = {

    //function to selectAll items from the database and display on the page.
    selectAll(tableInput, cb) {
        const queryString = `SELECT * FROM ${tableInput};`;
        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    //Function to add items to the database when a new burger is added on the front end.
    insertOne(table, cols, vals, cb) {
        let queryString = `INSERT INTO ${table}`

        queryString += ' (';
        queryString += cols.toString();
        queryString += ') ';
        queryString += 'VALUES (';
        queryString += printQuestionMarks(vals.length);
        queryString += ') ';

        console.log(queryString);

        connection.query(queryString, vals, (err, result) => {

            if (err) {
                throw err;
            }
            cb(result);
        })

    },

    //function to update the html so that when devour is clicked in the front end a burger changes to devoured = true in the database.
    updateOne(table, objColVals, condition, cb) {
        let queryString = `UPDATE ${table}`
        queryString += ' SET ';
        queryString += objToSql(objColVals);
        queryString += ' WHERE ';
        queryString += condition;

        console.log(queryString)
        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }
            cb(result);
        })


    },

    //function to enable the delete button to delete burgers on the front end. 
    deleteBurger(table, condition, cb) {
        let queryString = `DELETE FROM ${table}`;
        queryString += ' WHERE ';
        queryString += condition;

        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }




}

//export orm file to burger.js for setting up orm cb functions for routes.

module.exports = orm;