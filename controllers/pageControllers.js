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

  const q = "SELECT * FROM gym.users WHERE email = ?";
  db.query(q, email, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'An error occurred while querying the database' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }
    
    const user = results[0];

// bcrypt.hash(password, 10, function(err, hashedPassword) {
// const username = 'user@user.com'; // replace with the actual username
// const q = "UPDATE gym.users SET password = ? WHERE email = ?";

// db.query(q, [hashedPassword, username], (err, results) => {
//   if (err) {
//     // Handle error
//     console.error('An error occurred while updating the password:', err);
//     return;
//   }

//   console.log('Password updated successfully');
// });
//   console.log(hash); // print the new hashed password
// });
//   console.log('Hashed password:', hashedPassword);
//   console.log('Password from database:', user.password);
// });
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'An error occurred while comparing passwords' });
        return;
      }

      if (result) {
        req.session.user = user;
        res.json({ message: 'Authentication successful', isAdmin: user.isAdmin });
      } else {
        res.status(401).json({ error: 'Invalid email or password' });
      }
    });
  });
};

const loginGet = (req, res) => {
  res.send('Login Page');
};

const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log('An error occurred while destroying the session:', err);
    }

    res.redirect('/');
  });
}

const checkSession = (req, res) => {
  if (req.session.user) {
    // The user is logged in
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    // The user is not logged in
    res.json({ loggedIn: false });
  }
}

const adminDashboard = (req, res) => {
  if (checkSession) {
    // The user is logged in
    res.json({ message: 'Authorised' });
  } else {
    // The user is not logged in
    res.json({ message: 'NOT Authorised' });
  }
}

module.exports = {
    homePage,
    contactPage,
    login,
    loginGet,
    logout,
    checkSession,
    adminDashboard
};