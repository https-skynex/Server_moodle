// Modelo Diagnostico.js utilizado para la Fase 1: Aprende - Retorno
const mongoose = require('mongoose');

// Modelo de preguntas de diagnóstico.
const estilosHistoricoSchema = new mongoose.Schema({
    id_estudiante: { type: Number, required: true },
    id_curso: { type: Number, required: true },
    feedback_message : { type: String, required: true },
    learning_styles : {
        visual: { type: Number, required: true },
        textual: { type: Number, required: true },
        kinestesico: { type: Number, required: true },
        auditivo: { type: Number, required: true }
    },
});

module.exports = mongoose.model('EstiloHistorico', estilosHistoricoSchema);