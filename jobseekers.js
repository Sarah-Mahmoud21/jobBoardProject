const { Router } = require('express');
const jobseekers = (pool) => {
    const router = Router();

    // Get all 
    router.get('/', (req, res) => {
        pool.getConnection((err, connection) => {
          if (err) throw err;
          console.log(`connected as id ${connection.threadId}`);
      
          connection.query('SELECT * FROM jobseekers', (err, rows) => {
            connection.release();
            if (!err) {
              res.send(rows);
            } else {
              console.log(err);
              res.status(500).send('Internal Server Error');
            }
          });
        });
      });
      
      router.get('/:job_seeker_id', (req, res) => {
        pool.getConnection((err, connection) => {
          if (err) throw err;
          console.log(`connected as id ${connection.threadId}`);
      
          connection.query('SELECT * FROM jobseekers WHERE job_seeker_id = ?', [req.params.job_seeker_id], (err, rows) => {
            connection.release();
            if (!err) {
              res.send(rows);
            } else {
              console.log(err);
              res.status(500).send('Internal Server Error');
            }
          });
        });
      });
      
      router.delete('/:job_seeker_id', (req, res) => {
        pool.getConnection((err, connection) => {
          if (err) throw err;
          console.log(`connected as id ${connection.threadId}`);
      
          connection.query('DELETE FROM jobseekers WHERE job_seeker_id = ?', [req.params.job_seeker_id], (err, result) => {
            connection.release();
            if (!err) {
              if (result.affectedRows > 0) {
                res.send(`Job seeker with ID: ${req.params.job_seeker_id} has been removed`);
              } else {
                res.send(`No job seeker found with ID: ${req.params.job_seeker_id}`);
              }
            } else {
              console.log(err);
              res.status(500).send('Internal Server Error');
            }
          });
        });
      });
      
      router.post('/', (req, res) => {
        pool.getConnection((err, connection) => {
          if (err) throw err;
          console.log(`connected as id ${connection.threadId}`);
          const params = req.body;
      
          connection.query('INSERT INTO jobseekers SET ?', params, (err, result) => {
            connection.release();
            if (!err) {
              res.send(`Job seeker with the record ID: ${result.insertId} has been added`);
            } else {
              console.log(err);
              res.status(500).send('Internal Server Error');
            }
          });
        });
      });
      
      router.put('/', (req, res) => {
        pool.getConnection((err, connection) => {
          if (err) throw err;
          console.log(`connected as id ${connection.threadId}`);
      
          const { job_seeker_id, root, contact_info, password } = req.body;
      
          connection.query('SELECT * FROM jobseekers WHERE job_seeker_id = ?', [job_seeker_id], (err, rows) => {
            if (err) {
              connection.release();
              console.log(err);
              res.status(500).send('Internal Server Error');
              return;
            }
      
            const existingData = rows[0];
      
            const updatedData = {
              root: root || existingData.root,
              contact_info: contact_info || existingData.contact_info,
              password: password || existingData.password,
            };
      
            connection.query('UPDATE jobseekers SET ? WHERE job_seeker_id = ?', [updatedData, job_seeker_id], (err, result) => {
              connection.release();
              if (!err) {
                if (result.affectedRows > 0) {
                  res.send(`Job seeker with ID: ${job_seeker_id} has been updated`);
                } else {
                  res.send(`No job seeker found with ID: ${job_seeker_id}`);
                }
              } else {
                console.log(err);
                res.status(500).send('Internal Server Error');
              }
            });
          });
        });
      });

      return router;
}
      module.exports = jobseekers;