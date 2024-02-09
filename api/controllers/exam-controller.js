const { default: mongoose } = require('mongoose');
const Exam= require('../models/schema');

//all Exams
 const getExams=async(req,res)=>{
    try{
        const exams= await Exam.find({}).sort({createdAt:-1})
         res.status(200).status(exams)
    }catch(error){
        res.status(400).json({error:error.message})
    }
    
 }

//get a single exam
 const getSingleExam=async(req,res)=>{
    const{ id}= re.params
    const exam= await Exam.findById(id)
    if(!exam){
        //404 cant be found
        return res.status(404).json({error:"No exam"})
    }
    // found exam
    res.status(200).json(exam)
 }
//create a new exam
const createExam= async(req,res) =>{
    const{patient_id,age,sex,zip,latest_BMI,latest_weight,png_filename,exam_id,ICU_admit,number_ICU_admits,mortality}=req.body
    //add doc to db
    try{
        const exam= await Workout.create({patient_id,age,sex,zip,latest_BMI,latest_weight,png_filename,exam_id,ICU_admit,number_ICU_admits,mortality})
        res.status(200).json(exam)
    }catch(error){
        res.status(400).json({error:error.message})
    }
   
}

//delete a exam