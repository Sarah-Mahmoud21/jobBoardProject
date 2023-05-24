const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
//const crypto = require('crypto');
//const employers = require('./employers');

const Authoemployer = (pool) => {
  const router = express.Router(); // Use the router variable directly

  // Middleware to authenticate token
  function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, 'secret', (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.user = user;
      next();
    });
  }

  
  


  // // Create a new employer
  // router.post('/', (req, res) => {
  //   const { email, password } = req.body;

  //   // Check if the email is a Gmail account
  //   if (!email.endsWith('@gmail.com')) {
  //     return res.status(400).json({ message: 'Only Gmail accounts are allowed' });
  //   }

  //   // Generate a verification code
  //   const verificationCode = Math.floor(100000 + Math.random() * 900000);

  //   // Send verification email
  //   const transporter = nodemailer.createTransport({
  //     service: 'Gmail',
  //     auth: {
  //       user: 'your-email@gmail.com',
  //       pass: 'your-email-password',
  //     },
  //   });

  //   const mailOptions = {
  //     from: 'your-email@gmail.com',
  //     to: email,
  //     subject: 'Email Verification',
  //     text: `Your verification code is: ${verificationCode}`,
  //   };

  //   transporter.sendMail(mailOptions, (error, info) => {
  //     if (error) {
  //       console.log(error);
  //       return res.status(500).json({ message: 'Failed to send verification email' });
  //     }
  //     console.log(`Email sent: ${info.response}`);

  //     // Store the verification code and other employer details in the database
  //     const salt = bcrypt.genSaltSync(10);
  //     const hashedPassword = bcrypt.hashSync(password, salt);

  //     // Save employer details to the database
  //     pool.getConnection((err, connection) => {
  //       if (err) throw err;

  //       const newEmployer = {
  //         email: email,
  //         password: hashedPassword,
  //         verificationCode: verificationCode,
  //         isVerified: false,
  //       };

  //       connection.query('INSERT INTO employers SET ?', newEmployer, (err, result) => {
  //         connection.release();
  //         if (err) {
  //           console.log(err);
  //           return res.status(500).json({ message: 'Failed to register employer' });
  //         }
  //         res.json({ message: 'Registration successful' });
  //       });
  //     });
  //   });
  // });




router.post('/login', (req, res) => {
  const { contact_info, password } = req.body;

  if (!contact_info || !password) {
    return res.status(400).json({ message: 'Missing credentials' });
  }

  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query('SELECT * FROM employers WHERE contact_info = ?', [contact_info], (err, rows) => {
      connection.release();
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Failed to authenticate employers' });
      }

      if (rows.length === 0) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const employers = rows[0];

      if (password !== employers.password) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      if (contact_info != employers.contact_info) {
        return res.status(401).json({ message: 'Email not verified' });
      }

      const token = jwt.sign({ contact_info: employers.contact_info }, 'secret', { expiresIn: '1h' });
      res.json({ token: token });
    });
  });
});
  

  return router;
};



module.exports = Authoemployer;
