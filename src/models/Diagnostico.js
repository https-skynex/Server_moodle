// Modelo Diagnostico.js utilizado para la Fase 1: Aprende 
const mongoose = require('mongoose');

// Modelo de preguntas de diagnóstico.
const questionSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    text : { type: String, required: true },
    answer_user : { type: String, required: true },
});

//Modelo del intento 
const attemptSchema = new mongoose.Schema({
    datetime: { type: Date, required: true, default: Date.now },
    questions: {type:[questionSchema], required: true}
});

// Esquema principal del diagnóstico.
const DiagnosticoSchema = new mongoose.Schema({
    userid: { type: Number, required: true },
    courseid: { type: Number, required: true },
    attempt: {type: attemptSchema, required: true},
});


module.exports = mongoose.model('Diagnostico', DiagnosticoSchema);