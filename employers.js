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


router.post('/', (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log(`connected as id ${connection.threadId}`);
      const params = req.body;
  
      connection.query('INSERT INTO employers SET ?', params, (err, result) => {
        connection.release();
        if (!err) {
          res.send(`employer with the record ID: ${result.insertId} has been added`);
        } else {
          console.log(err);
          res.status(500).send('Internal Server Error');
        }
      });
    });
  });







// Update a record 
router.put('', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { employer_id, root,  contact_info, role, password} = req.body
        
        console.log(employer_id, root,  contact_info, role, password)

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


//   // Save a job search
//   router.post('/search', (req, res) => {
//     const { job_seeker_id, search_title, location, salary_range } = req.body;
//     const savedSearch = { job_seeker_id, search_title, location, salary_range };

//     pool.getConnection((err, connection) => {
//       if (err) throw err;
//       console.log(`connected as id ${connection.threadId}`);

//       connection.query('INSERT INTO savedsearches SET ?', savedSearch, (err, result) => {
//         connection.release();
//         if (!err) {
//           res.send(`Job search saved with the record ID: ${result.insertId}`);
//         } else {
//           console.log(err);
//           res.status(500).send('Internal Server Error');
//         }
//       });
//     });
//   });

router.get('/jobs', (req, res) => {
    const { title, location, salary } = req.query;

    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log(`Connected as id ${connection.threadId}`);

      const searchQuery = 'SELECT * FROM joblistings WHERE title LIKE ? OR location LIKE ? OR salary >= ?';

      const searchParams = [`%${title}%`, `%${location}%`, salary || 0];

      connection.query(searchQuery, searchParams, (err, results) => {
        connection.release();
        if (!err) {
          res.json(results);
        } else {
          console.log(err);
          res.status(500).send('Internal Server Error');
        }
      });
    });
  });



return router;
}

module.exports = employers;