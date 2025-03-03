const { body, validationResult } = require("express-validator");
const validateJob=[
    body('Recruiter_id','Need to be login first').notEmpty(),
    body('Job_title',"Job title can't be empty and not contain numbers").notEmpty().custom((value) => {
        // Check if the title contains any numbers
        if (/\d/.test(value)) {
          throw new Error('Title must not contain numbers');
        }
        return true; // Validation passed
      }),
    body('Budget',"budget can,t be empty and not be less than 100").notEmpty().isInt({min:100}),
    body('Service_type',"type of service can't be empty").notEmpty(),
    body("Job_description","Description can,t be empty").notEmpty(),
    body("Keywords","Keywords requires atleast one"),
    (req,res,next)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports={
    validateJob
}