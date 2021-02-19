
const express = require('express');
const router = express.Router();
const burger = require ('../models/burger.js');



//route set up to read the home page and display for user.
router.get('/', (req, res) => {
    burger.selectAll((data) => {
        const hbsObject = {
            burger: data,
        }

        console.log('hbsObject', hbsObject);
        res.render('index', hbsObject)
    })
    
});

//route to create new burgers on the front end when added. 
router.post('/api/burger', (req, res) => {
    console.log(req.body.burger_name)

    burger.insertOne(['burger_name', 'devoured'], [req.body.burger_name, false], (result) => {

        console.log(result);
        res.redirect('/')

    })
    
});

//route to update the burgers from not devoured to devoured.
router.put('/api/burger/:id', (req, res) => {

    const condition = `id = ${req.params.id}`;
    console.log('condition', condition);

    burger.updateOne(
        {
            devoured: req.body.devoured
        },
        condition, (result) => {
            if (result.changedRows === 0) {
                return res.status(404).end();
            }
            res.status(200).end();
        }
    )
    
});

//route to delete burgers when the remove button is clicked on the front end. 
router.delete('/api/burger/:id', (req, res) => {
    const condition = `id = ${req.params.id}`;
    console.log(condition)
    burger.deleteBurger(condition, (result) => {
      if (result.affectedRows === 0) {
        
        return res.status(404).end();
      }
      res.status(200).end();

      
    });
  });
//export this file.
module.exports = router;