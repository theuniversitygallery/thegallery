const mongoose = require('mongoose');

const contentScheme = new mongoose.Schema({
    citizenID: { type: mongoose.Schema.Types.ObjectId, ref: 'citizenName', required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    color: { type: String, required: true },
    tags: { type: [String], required: true },
    originalLocation: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Location', 
        required: true 
    },
    currentLocation: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Location', 
        required: true 
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'citizenName' }],
    status: { type: String, enum: ['active', 'archived', 'deleted'], default: 'active' },
    category: { type: String },
    comments: [{ 
            userID: { type: mongoose.Schema.Types.ObjectId, ref: 'citizenName' },
            comment: { type: String, required: true },
            date_created: { type: Date, default: Date.now }
        }],
    date_created: { type: Date, required: true, default: Date.now },
    time_created: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Content', contentScheme);
 