const Router = require('express');

const jobListing = (pool) => {
  const router = Router();

  // Search for jobs
  router.get('/search', (req, res) => {
    const { title, location, salary } = req.query;
    const query = `
      SELECT *
      FROM joblistings
      WHERE title LIKE ? AND location LIKE ? AND salary_range >= ?
    `;
    const titleFilter = `%${title || ''}%`;
    const locationFilter = `%${location || ''}%`;
    const salaryFilter = salary || 0;

    pool.getConnection((err, connection) => {
      if (err) throw err;

      connection.query(query, [titleFilter, locationFilter, salaryFilter], (err, rows) => {
        connection.release();

        if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
          return;
        }

        res.send(rows);
      });
    });
  });

  // Get all job listings
  router.get('/', (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log('connected as id ' + connection.threadId);
      connection.query('SELECT * from joblistings', (err, rows) => {
        connection.release();

        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
          res.status(500).send('Internal Server Error');
        }

        console.log('The data from joblistings table are: \n', rows);
      });
    });
  });

  // Get job listing by ID
  router.get('/:job_id', (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query('SELECT * FROM joblistings WHERE job_id = ?', [req.params.job_id], (err, rows) => {
        connection.release();

        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
          res.status(500).send('Internal Server Error');
        }

        console.log('The data from joblistings table are: \n', rows);
      });
    });
  });

  // Delete a job listing
  router.delete('/:job_id', (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query('DELETE FROM joblistings WHERE job_id = ?', [req.params.job_id], (err, rows) => {
        connection.release();

        if (!err) {
          res.send(`Job listing with the record ID ${[req.params.id]} has been removed.`);
        } else {
          console.log(err);
          res.status(500).send('Internal Server Error');
        }

        console.log('The data from joblistings table are: \n', rows);
      });
    });
  });

  // Create a new job listing
  router.post('/', (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log(`connected as id ${connection.threadId}`);
      const params = req.body;

      connection.query('INSERT INTO joblistings SET ?', params, (err, result) => {
        connection.release();
        if (!err) {
          res.send(`Job with the record ID: ${result.insertId} has been added.`);
        } else {
          console.log(err);
          res.status(500).send('Internal Server Error');
        }
      });
    });
  });

  // Update a job listing
  router.put('', (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log(`connected as id ${connection.threadId}`);

      const { job_id, employer_id, title, description, requirements, salary_range, location, posted_date, expiry_date } = req.body;

      connection.query(
        'UPDATE joblistings SET employer_id = ?, title = ?, description = ?, requirements = ?, salary_range = ?, location = ?, posted_date = ?, expiry_date = ? WHERE job_id = ?',
        [employer_id, title, description, requirements, salary_range, location, posted_date, expiry_date, job_id],
        (err, rows) => {
          connection.release();

          if (!err) {
            res.send(`Job listing with the ID: ${job_id} has been updated.`);
          } else {
            console.log(err);
            res.status(500).send('Internal Server Error');
          }
        }
      );

      console.log(req.body);
    });
  });

  return router;
};

module.exports = jobListing;
