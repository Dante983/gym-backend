const db = require('../server/database');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

// Middleware to check if the user is an admin
const ensureAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
}

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
      return res.status(500).json({ error: 'An error occurred while querying the database' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    const user = results[0];

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'An error occurred while comparing passwords' });
      }

      if (result) {
        req.session.user = user;
        session = req.session;
        return res.json({ message: 'Authentication successful', isAdmin: user.isAdmin });
      } else {
        return res.status(401).json({ error: 'Invalid email or password' });
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
      return res.status(500).json({ error: 'Failed to destroy session' });
    }
    res.json({ message: 'Logout successful' });
  });
}

const checkSession = (req, res) => {
  console.log(req.session.user);
  if (session.user) {
    res.json({ loggedIn: true, user: session.user });
  } else {
    res.json({ loggedIn: false });
  }
}

const adminDashboard = (req, res) => {
  console.log(session);
  if (session.user) {
    // The user is logged in
    res.json({ message: 'Authorised', users: [session.user] });
  } else {
    // The user is not logged in blabla
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