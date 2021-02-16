
const express = require('express');
const router = express.Router();
const burger = require ('../models/burger.js');




router.get('/', (req, res) => {
    burger.selectAll((data) => {
        const hbsObject = {
            burger: data,
        }

        console.log('hbsObject', hbsObject);
        res.render('index', hbsObject)
    })
    
});


router.post('/api/burger', (req, res) => {
    console.log(req.body.burger_name)

    burger.insertOne(['burger_name', 'devoured'], [req.body.burger_name, false], (result) => {

        // res.json({id:result.insertId})
        console.log(result);
        res.redirect('/')

    })
    
});

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

module.exports = router;