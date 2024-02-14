const { default: mongoose } = require('mongoose');
const exam = require('../models/exam-model');

//all Exams
 const getExams=async(req,res)=>{
    try{
        const exams= await exam.find()
        res.json(exams)
         res.status(200).status(exams)
    }catch(error){
        res.status(400).json({error:error.message})
    }
    
 }

//get a single exam - based _id
 const getSingleExam=async(req,res)=>{
    const{ id}= req.params
    const exams= await exam.findById(id)
    if(!exam){
        //404 cant be found
        return res.status(404).json({error:"No exam"})
    }
    // found exam
    res.status(200).json(exams)
 }
//create a new exam
const createExam= async(req,res) =>{
    const{patient_id,age,sex,zip,latest_BMI,latest_weight,png_filename,exam_id,icu_admit,num_icu_admits,mortality}=req.body
    //add doc to db
    try{
        const exams= await exam.create({patient_id,age,sex,zip,latest_BMI,latest_weight,png_filename,exam_id,icu_admit,num_icu_admits,mortality})
        res.status(200).json(exams)
    }catch(error){
        res.status(400).json({error:error.message})
    }
   
}

//delete a exam
const deleteExam= async (req, res) => {
    try {
      const exams = await exam.findByIdAndDelete(req.params.id);
      if (!exam) {
        return res.status(404).send({ message: 'Exam not found' });
      }
      res.send(exams);
    } catch (error) {
      res.status(500).send(error);
    }
  }
//Update Exam
const updateExam= async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      // Find the exam by ID and update it
      //return the updated document
      const updatedExam = await Exam.findByIdAndUpdate(id, updates, { new: true });
      
      if (!updatedExam) {
        return res.status(404).json({ message: 'Exam not found' });
      }
      await updatedExam.save();
      res.json(updatedExam);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

module.exports={
    getExams,
    getSingleExam,
    createExam,
    deleteExam,
    updateExam

}