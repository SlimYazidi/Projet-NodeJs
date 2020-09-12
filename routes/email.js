require ('dotenv').config();
const express = require("express")
const nodemailer = require('nodemailer'); 
const router = express.Router();
const ejs = require('ejs');
const fs = require('fs');
const path = require ('path');


let transporter = nodemailer.createTransport({ 
    service: 'gmail',
    auth: { 
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    } 
});

router.post("/send/:name", (req,res)=> {

    const template = fs.readFileSync(path.resolve('./mailTemplate','welcomeMail.html'),{encoding:'utf-8'});
    const messageParameters = {
        name : req.params.name 
    };

    let html = ejs.render(template, messageParameters)
        
    let mailOptions = { 
        from: '<slim.yazidi.19@gmail.com>', 
        to: '<slim.yazidi.19@gmail.com>', 
        subject: 'Nodemail Testing', 
        // text: 'IT works'
        html: html
    }; 

    transporter.sendMail(mailOptions,(err, data)=> { 
        if(err) { 
            console.log(err); 
            res.send(err)
          } else { 
              console.log('Email sent successfully'); 
              res.send({
                  message:'mail send success!'
              })
          } 
      });
  });


module.exports =router;