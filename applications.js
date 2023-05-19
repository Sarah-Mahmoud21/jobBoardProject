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

  // Add more routes as needed...

  return router;
};

module.exports = applications;
