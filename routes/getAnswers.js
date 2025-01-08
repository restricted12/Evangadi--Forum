const express = require("express");
const router = express.Router();  


const authmiddleware = require("../../EvangadiForum/middleware/authmidlware");
const getAnswersByQuestionId = require('../../EvangadiForum/controller/getAnswers');
// quesion router
router.get('/get-answers/:quesionid',authmiddleware,getAnswersByQuestionId);



// router.get('//get-answers:quesionid',authmiddleware,(req,res)=>{
//     res.send('all quesions')
// });



module.exports = router;
