const {validationResult, matchedData} = require("express-validator");
const Content = require('../models/contentModel.js'); 
const {logEvent} = require("../middleware/logEvents.js") 
const Location = require("../models/locationModel");

//user creating new record
const newContent = async (req, res) => {
  let result = validationResult(req)
  if(!result.isEmpty()) return res.sendStatus(400).send({errors: result.array() })

  const data = matchedData(req);
  const {citizenID,title,desc,img,color,tags,category, location,accuracy,comment,likes,status} = data;
  
  // Create a new content location
  const contentLocation = new Location({
      location: {
          type: 'Point',
          coordinates: [location.longitude, location.latitude]
      },
      accuracy: accuracy 
  });

// Save the contentlocation to the database
  let savedLocation;
  try {
    savedLocation = await contentLocation.save();
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Failed to save Location' });
    }

    // create a new content
    try {
      const contentData = await Content.create({
        citizenID,title, desc, img, color, tags, category,
        originalLocation: savedLocation._id, 
        currentLocation: savedLocation._id,
        comment, likes, status
      });

      return res.status(200).json({ message: 'Content uploaded successfully', data: contentData }); 

    } catch(err) {
      console.error(err);
      logEvent(`userID: ${citizenID} | error`, "errorLog.txt");
      return res.status(500).json({ message: 'Content was not uploaded successfully' }); 
    }

  }
  
  // get user all post
  const getAllContent = async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        
        const allContent = await Content.find({ citizenID: req.citizenID }); 
        return res.status(200).json({ message: 'All content retrieved successfully', data: allContent });
      }catch(err){
        return res.status(500).json({ message: err.message });
      }
      
    }
    // getting only a record
    const getContentByID =  async (req,res) => {   
      
  try {
    const {contentId}= req.params;
    const conetentByID = await Content.findById(contentId); 
    if (!conetentByID) {
      return res.status(404).json({ message: 'Record not found or not authorized' });
    }
    return res.json(conetentByID);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  
};  

// updating record

const updateContentByID = async (req,res) =>{
  
  
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  
  try {
    const {title,desc,img,color,tags,category} = req.body;
    const {contentId}= req.params;

    // Find the content by ID
    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    // Create a new location for the updated position
    const newLocation = new Location({
      location: {
        type: 'Point',
        coordinates: [longitude, latitude]
      },
      accuracy: accuracy 
    });


    const updateContent = await Content.findByIdAndUpdate(contentId,
      {
        title,
          desc,
          img,
          color,
          tags,
          category,
          updated_at: Date.now()
        },
        {new: true, runValidators:true}
      );
      if (!updateContent){
        return res.status(404).json({ message: 'Content not found' });
      }
      
      logEvent(`content with ID: ${updateContent._id} Updated`,"contentLog.txt");
      return res.json(updateContent);
    } catch (error) {
      return res.status(500).json({msg: error.message})
    }
    
  }
  
  
  
  
   const deletContentByID = (req,res) => {
      validationResult(req).throw();
     try {
      const {
        params:{postId} 
        } = req;
        const parsedId = parseInt(postId);
        if (isNaN(parsedId)) return res.status(400).json({ message: 'Content does not exit: invalid ID' });   
        const findById = content.findIndex(post => post.postID === parsedId);
        if(findById === -1) return res.sendStatus(404);
        content.splice(findById,1);
        logEvent(`content with ID: ${updateContent._id} Updated`,"contentLog.txt");
        fs.writeFileSync(path.join(__dirname,"..",'models',"content.json"), JSON.stringify(content, null, 2));
        return res.status(204).json({message:`content deleted successfully`});
     } catch (error) {
      console.error(error)
     }

}

module.exports = {
  newContent,
  getAllContent,
  getContentByID,
  updateContentByID,
  deletContentByID,
};