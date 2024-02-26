const { default: mongoose } = require('mongoose');
const exam = require('../models/exam-model');

//all Exams
 const getExams=async(req,res)=>{
    try{
        const exams= await exam.find()
        return res.status(200).json(exams)
    }catch(error){
        return res.status(400).json({error:error.message})
    }
    
 }

//get a single exam - based _id
 const getSingleExam=async(req,res)=>{
    const{ id}= req.params
    let exams;
    try {
        exams= await exam.findById(id)
    } catch (error) {
        return res.status(400).send('Exam not found')
    }
    if(!exam){
        //404 cant be found
        return res.status(404).send('Exam not found')
    }
    // found exam
    res.status(200).json(exams)
 }
//create a new exam
const createExam= async(req,res) =>{
    try{
        const exams= await exam.create(req.body)
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
      const updatedExam = await exam.findByIdAndUpdate(id, updates, { new: true });
      
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
