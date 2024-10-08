const mongoose = require('mongoose');
const validateNewJob = require('../middleware/validateNewJob');

// company name , logo URL , job position/title
// monthly salary , job type,remote,location,job description
// about company , skills required, additional information


const jobSchema = new mongoose.Schema(
{
    companyName :{
        type:String,
        required:true,
    },
    LogoUrl:
    {
        type: String,
    },
    jobPosition:{
        type: String,
        required: true,

    },
    monthlySalary:{
        type: Number,
        required: true,
    
    },

    jobType:{
        type: String,
        required: true,
    },
    remote:{
        type: Boolean,
        required: true,
    },
    jobDescription:{
        type: String,
        required: true,
    },
    aboutCompany:{
        type: String,
        required: true,
    },
    skillsRequired: [
        {
        type: String,
        required: true,
        },
],
    additionalInformation:{
        type: String,
    },

});



module.exports = mongoose.model('Job',jobSchema);

