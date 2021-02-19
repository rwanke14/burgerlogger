const orm = require('../config/orm.js');

//setting up orm functions for callback in the routes.
const burger = {

    //setting up orm to read the database and display on the page for the user.
    selectAll(cb){
        orm.selectAll('burgers', (res) => cb(res));
    },

    //setting up orm to create the database when a burger is added. 
    insertOne(cols, vals, cb){
        orm.insertOne('burgers', cols, vals, (res) => cb(res));
    },

    //setting up orm to update a burger from not devoured to devoured when devoured is clicked. 
    updateOne(objColVals, condition, cb){
        orm.updateOne('burgers', objColVals, condition, (res) => cb(res));
    },

    //setting up orm to delete a burger when remove is clicked. 
    deleteBurger(condition, cb) {
        orm.deleteBurger('burgers', condition, (res) => cb(res));
    }

}

//export burger file burger_controller.js for connecting to routes.
module.exports = burger;