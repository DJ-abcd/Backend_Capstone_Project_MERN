const validateNewJob = (req, res, next) =>{
    const { companyName,LogoUrl,jobPosition,monthlySalary,jobType,remote,jobDescription, aboutCompany,skillsRequired} = req.body;

    if(!companyName || !LogoUrl || !jobPosition|| !monthlySalary||!jobType  || !jobDescription ||  !aboutCompany || !skillsRequired){
        return res.status(400).json({
    message: 'Please provide all required details',
})
}
const validJobPositions = ["Full-Time","Part-Time","Internship"];
const validSkills = Array.isArray(skillsRequired) && skillsRequired.every(skill => typeof skill == 'string');
const validMonthlySalary = typeof monthlySalary == 'number' && monthlySalary > 0;
const validateremote = typeof remote === 'boolean';
const validJobPosition = validJobPositions.includes(jobType);
const validLogoUrl = LogoUrl.match(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i);
// const validLocationType = validLocationTypes.includes(locationType);

if(!validSkills || !validMonthlySalary || !validateremote || !validJobPosition || !validLogoUrl){
    res.status(400).json({
        message:'Some fields are invalid',
    })
}else{
   next();
}



};

module.exports = validateNewJob;

