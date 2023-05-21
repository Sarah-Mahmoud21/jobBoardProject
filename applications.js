const { Router } = require('express');

const applications = (pool) => {
  const router = Router();

  // Submit an application
  router.post('/', (req, res) => {
    const { job_seeker_id, job_id, resume_path, cover_letter } = req.body;
    const query = 'INSERT INTO applications (job_seeker_id, job_id, resume_path, cover_letter) VALUES (?, ?, ?, ?)';

    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
        return;
      }

      connection.query(query, [job_seeker_id, job_id, resume_path, cover_letter], (err, result) => {
        connection.release();

        if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
          return;
        }

        res.send(`Application with ID: ${result.insertId} has been submitted.`);
      });
    });
  });

  // Retrieve job applications for a specific job seeker
  router.get('/jobseeker/:job_seeker_id', (req, res) => {
    const job_seeker_id = req.params.job_seeker_id;
    const query = 'SELECT * FROM applications WHERE job_seeker_id = ?';

    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
        return;
      }

      connection.query(query, [job_seeker_id], (err, result) => {
        connection.release();

        if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
          return;
        }

        res.json(result);
      });
    });
  });

  // Retrieve job applications for a specific job listing
  router.get('/joblisting/:job_id', (req, res) => {
    const job_id = req.params.job_id;
    const query = 'SELECT * FROM applications WHERE job_id = ?';

    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
        return;
      }

      connection.query(query, [job_id], (err, result) => {
        connection.release();

        if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
          return;
        }

        res.json(result);
      });
    });
  });

   // Delete an application by ID
   router.delete('/:application_id', (req, res) => {
    const application_id = req.params.application_id;
    const query = 'DELETE FROM applications WHERE application_id = ?';

    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
        return;
      }

      connection.query(query, [application_id], (err, result) => {
        connection.release();

        if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
          return;
        }

        if (result.affectedRows === 0) {
          res.status(404).send(`Application with ID: ${application_id} not found.`);
        } else {
          res.send(`Application with ID: ${application_id} has been deleted.`);
        }
      });
    });
  });

  // // Perform a filtered job search
  // router.get('/jobs', (req, res) => {
  //   const { title, location, salary } = req.query;

  //   pool.getConnection((err, connection) => {
  //     if (err) throw err;
  //     console.log(`Connected as id ${connection.threadId}`);

  //     const searchQuery = 'SELECT * FROM jobs WHERE title LIKE ? AND location LIKE ? AND salary >= ?';
  //     const searchParams = [`%${title}%`, `%${location}%`, salary || 0];

  //     connection.query(searchQuery, searchParams, (err, results) => {
  //       connection.release();
  //       if (!err) {
  //         res.json(results);
  //       } else {
  //         console.log(err);
  //         res.status(500).send('Internal Server Error');
  //       }
  //     });
  //   });
  // });
// Perform a filtered job search and save the search
router.get('/jobs', (req, res) => {
  const { job_seeker_id, search_title, title, location, salary } = req.query;

  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId}`);

    const searchQuery = 'SELECT * FROM jobs WHERE title LIKE ? AND location LIKE ? AND salary >= ?';
    const searchParams = [`%${title}%`, `%${location}%`, salary || 0];

    connection.query(searchQuery, searchParams, (err, results) => {
      if (!err) {
        const savedSearch = { job_seeker_id, search_title, title, location, salary };
        connection.query('INSERT INTO savedsearches SET ?', savedSearch, (err, result) => {
          connection.release();
          if (!err) {
            res.json(results);
          } else {
            console.log(err);
            res.status(500).send('Internal Server Error');
          }
        });
      } else {
        connection.release();
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
    });
  });
});
  // // Save a job search
  // router.post('/save-search', (req, res) => {
  //   const { job_seeker_id, search_title, title, location, salary } = req.body;
  //   const savedSearch = { job_seeker_id, search_title, title, location, salary };

  //   pool.getConnection((err, connection) => {
  //     if (err) throw err;
  //     console.log(`Connected as id ${connection.threadId}`);

  //     connection.query('INSERT INTO savedsearches SET ?', savedSearch, (err, result) => {
  //       connection.release();
  //       if (!err) {
  //         res.send(`Job search saved with the record ID: ${result.insertId}`);
  //       } else {
  //         console.log(err);
  //         res.status(500).send('Internal Server Error');
  //       }
  //     });
  //   });
  // });

  return router;
};

module.exports = applications;