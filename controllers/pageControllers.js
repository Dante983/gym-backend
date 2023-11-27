const express = require('express');
const router = express.Router();
const db = require('../server/database');
const nodemailer = require('nodemailer');

const homePage = (req, res) => {
    const q = "SELECT * FROM users"
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json({data})
    }
  });
};

router.get('/about', (req, res) => {
    res.send('About Page');
});

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


router.get('/gallery', (req, res) => {
    res.send('Gallery Page');
});

module.exports = {
    homePage,
    // aboutPage,
    contactPage
    // galleryPage
};