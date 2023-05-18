const Router = require('express')

const employers = (pool) => {
    const router = Router();

    // Get all 

router.get('', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from employers', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from employers table are: \n', rows)
        })
    })
})

/// get by id

router.get('/:employer_id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('SELECT * FROM employers WHERE employer_id = ?', [req.params.employer_id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
            
            console.log('The data from employers table are: \n', rows)
        })
    })
});

// Delete a list
router.delete('/:employer_id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('DELETE FROM employers WHERE employer_id = ?', [req.params.employer_id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(`employers with the record ID ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }
            
            console.log('The data from employers table are: \n', rows)
        })
    })
});


router.post('', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        
        console.log('connected as id${connection.threadId}')
        const params = req.body
        connection.query('INSERT INTO employers SET ?', params, (err, rows) => {
        connection.release() // return the connection to pool
        if (!err) {
            res.send(`Beer with the record ID  has been added.`)
        } else {
            console.log(err)
        }
        
      
        })
        console.log(req.body)
    })
})







// Update a record 
router.put('', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { employer_id, root,  contact_info, role, password} = req.body

        connection.query('UPDATE employers SET  root = ?, contact_info = ?, role = ?,password = ? WHERE employer_id = ?', [ root,  contact_info, role, password,employer_id] , (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`employers with the id: ${employer_id} has been updated.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
})

return router;
}

module.exports = employers;