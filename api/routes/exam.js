const express= require('express')
const Exam= require('../models/ExamModel');
const {createExams,getExams,getSingleExam}= require('../controllers/exam-controllers')
const router=express.Router()


//get all exam
router.get('/',getExams)

//get a single exam

router.get('/:id',getSingleExam)

//post a new exam
router.post('/',createExams)
//delete
router.delete('/:id',(req,res)=>{
    res.json({mssg:'delete a exam'})
})
//update
router.patch('/:id',(req,res)=>{
    res.json({mssg: 'update a exam'})
})

module.exports=router