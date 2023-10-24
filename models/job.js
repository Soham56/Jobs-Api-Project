const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    company:{
        type: String,
        required: [true, "Please provide the company name"],
        maxLength: 50
    },
    position: {
        type: String,
        required: [true, 'Please provide the position of the job'],
        maxLength: 100
    },
    status:{
        type: String,
        enum: ['pending', 'interview', 'declined'],
        default: 'pending'
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: [true, 'Please provide user']
    }
}, {timestamps: true});


module.exports = mongoose.model('Jobs', JobSchema);