const mongoose = require('mongoose')

const Schema = mongoose.Schema

const examSchema = new Schema({
    patient_id: {
        type: String,
        required: true
    },
    exam_id: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    latest_weight: {
        type: Number,
        required: true
    },
    latest_bmi: {
        type: Number,
        required: true
    },
    png_filename: {
        type: String,
        required: true
    },
    icu_admit: {
        type: Number,
        required: true
    },
    number_icu_admits:{
        type: Number,
        required: true
    },
    mortality:{
        type: Boolean,
        required: true
    }
    
})

module.exports = mongoose.model('exams', examSchema)
