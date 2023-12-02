const db = require('../server/database');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const homePage = (req, res) => {
  console.log('aaa');
    const q = "SELECT * FROM users"
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json({data})
    }
  });
};


const contactPage = (req, res) => {console.log(req.body);
  let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.PASSWORD,
      }
  });
  
  let mailOptions = {
      from: req.body.email,
      to: process.env.GMAIL_USER,
      subject: `Message from ${req.body.name}`,
      text: req.body.message
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
          res.status(500).send('Error while sending email');
      } else {
          console.log('Email sent: ' + info.response);
          res.status(200).send('Email sent successfully');
      }
  });
};

const login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [email], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'An error occurred while querying the database' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'An error occurred while comparing passwords' });
        return;
      }

      if (result) {
        res.json({ message: 'Authentication successful' });
      } else {
        res.status(401).json({ error: 'Invalid email or password' });
      }
    });
  });
};

const loginGet = (req, res) => {
  res.send('Login Page');
};

module.exports = {
    homePage,
    contactPage,
    login,
    loginGet
};