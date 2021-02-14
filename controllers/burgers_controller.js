const router = express.Router();


const burger = require ('../models/burger');


router.get('/', (req, res) => {
    burger.all((data) => {
        const hbsObject = {
            bugers: data,
        }

        console.log('hbsObject', hbsObject);
        res.render('index', hbsObject)
    })
    
});


router.post('/burgers', (req, res) => {

    burger.create(['burger_name', 'devoured'], [req.body.burger_name, req.body.devoured], (result) => {

        res.json({id:result.insertId})

    })
    
});

router.put('/burgers/create', (req, res) => {

    const condition = `id = ${req.params.id}`;
    console.log('condition', condition);

    burger.update(
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

module.exports = router;