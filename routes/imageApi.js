const express = require('express');
const multer  = require('multer');
const router = express.Router();
const File = require ('../models/fileSchema');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        
        var filetype = '';
        if(file.mimetype === 'image/gif') {
          filetype = 'gif';
        }
        if(file.mimetype === 'image/png') {
          filetype = 'png';
        }
        if(file.mimetype === 'image/jpeg') {
          filetype = 'jpg';
        }
        cb(null,  Date.now() + '.' + filetype);
      }
  });

const upload = multer({ storage: storage  });


// save file in storage
router.post('/uploadfile', upload.single('avatar'), (req, res, next) => {
    res.send({ message : 'file saved successfully'});
});

// save file in storage
router.post('/uploadfileV2', upload.single('avatar'), (req, res, next) => {
 if(req.file !== undefined)
 {
  var file = new File({fileName: req.file.filename});
  file.save();
  res.send({ message : 'file saved successfully'});
 }
});

// get file from storage
router.get('/getFile/:fileName', (req, res)=>{
    
});

module.exports = router;