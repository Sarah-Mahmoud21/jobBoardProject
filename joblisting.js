const Router = require('express')

const jobListing = (pool) => {
    const router = Router();

    // Get all 

router.get('', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from joblistings', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from joblistings table are: \n', rows)
        })
    })
})

/// get by id

router.get('/:job_id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('SELECT * FROM joblistings WHERE job_id = ?', [req.params.job_id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
            
            console.log('The data from joblistings table are: \n', rows)
        })
    })
});

// Delete a list
router.delete('/:job_id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('DELETE FROM joblistings WHERE job_id = ?', [req.params.job_id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(`joblistings with the record ID ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }
            
            console.log('The data from joblistings table are: \n', rows)
        })
    })
});


router.post('', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        
        const params = req.body
        connection.query('INSERT INTO joblistings SET ?', params, (err, rows) => {
        connection.release() // return the connection to pool
        if (!err) {
            res.send(`joblistings with the record ID  has been added.`)
        } else {
            console.log(err)
        }
        
        console.log('The data from joblistings table are:11 \n', rows)

        })
    })
});

// Update a record 
router.put('', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { id, name, tagline, description, image } = req.body

        connection.query('UPDATE joblistings SET  employer_id = ?, title = ?, description = ?,requirements = ?, salary_range = ?, location = ?,posted_date = ?, expiry_date= ? WHERE job_id = ?', [employer_id, title, description, requirements, salary_range,location,posted_date,expiry_date,job_id] , (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`joblistings with the name: ${name} has been added.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
})

return router;
}

module.exports = jobListing;