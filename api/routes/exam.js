const express= require('express')

const {createExam,getExams,getSingleExam,deleteExam,updateExam}= require('../controllers/exam-controller')
const router=express.Router()


//get all exam
router.get('/',getExams)

//get a single exam

router.get('/:id',getSingleExam)

//post a new exam
router.post('/',createExam)
//delete
router.delete('/:id',deleteExam)
//update
router.patch('/:id',updateExam)

module.exports=router