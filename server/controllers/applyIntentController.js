// use express validator to validate the file
const multer =  require("multer");
const {validationResult,matchedData} = require("express-validator");
//check req if matchedData does not work 
const fs = require('fs')
const fsPromises = fs.promises;

// intent file path
const path = require("path");
const intentBox = path.join('../interntBox');
// connect this to apply model (database)
const data = {
    content: require("../models/content.json"),
    createUser: function (data) { this.users = data}
}
// multer file config for filename and destination
const storage = multer.diskStorage({
    destination: function (req, file,cb) {
        cb(null, intentBox);  // location where the file will be saved
    },
    filename: function (req, file,cb) {
        cb(null, "theUni" + '-' + file.originalname + Date.now() );  // location where the file will be saved
    }
})
// check if the file is pdf
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(null, false, new Error('File upload must be a PDF'));
    };
    
  };

const uploadIntent =  multer({
    storage:storage,
    fileFilter: fileFilter,
    limits: {fileSize: 10 * 1024 * 1024} // 10MB file size limit

});


const applyIntern = async (req, res)=>{
    
    try {
        // extract the application details from request or matched data
        const {postId, citizenId} = matchedData;
        // check if there is a file
        const file = req.file;
        if (!file) res.status(400).send('Please upload a intention file');

        // check if the file is pdf
        if(file.mimetype !== 'application/pdf'){
            fs.unlinkSync(file.path);
            return res.status(400).send('Please upload a PDF file');
        }

        // Check file size (limit to 10MB here)
        if (file.size > 10 * 1024 * 1024) {
            fs.unlinkSync(file.path); // Delete the file
            return res.status(400).send('File size exceeds 10MB');
        }
        
        /* check if user has already apply
        - create method and insert the file in the route to check  
        */
        // Read the uploaded PDF file
        const intentPdf = await fs.promises.readFile(file.path);

        // Validate PDF contents using pdf-lib 
        try {
            await PDFDocument.load(intentPdf);
            } catch (error) {
            // Delete the file if it's not a valid PDF
            await fs.promises.unlink(file.path);
            return res.status(400).json({ message: 'Uploaded file is not a valid PDF' });
        }

        //  upload the file to db collection 
        /* 
        const newintentApplication  = new Application({
            postid, citizenID, intent: intentPdf 
        })
            await newintentApplication.save();
            delete the temporary file after saving to mongoDB
            await fs.promises.unlink(file.path);
        */
        
        // save to json
        res.status(201).json({ message: 'Application submitted successfully' });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to submit application' });
    }


  res.send('File uploaded successfully');

}


module.exports = applyIntern;