//Importar modelos
const Diagnostico = require('../models/Diagnostico');
const EstiloHistorico = require('../models/EstiloHistorico');

//Controlador de diagnostico
const diagnosticoController = {};

//Metodo para registrar la prueba de diagnostico.
diagnosticoController.registrarDiagnostico = async (req, res
) => {
    try {
        console.log('Datos recibidos desde Moodle:', req.body);

        const { id_estudiante, id_curso, preguntas, fecha_realizacion } = req.body;
        //Crear un registro de prueba de diagnostico.
        const nuevoDiagnostico = new Diagnostico({
            id_estudiante,
            id_curso,
            preguntas,
            fecha_realizacion
        });

        //Guardar el diagnostico.
        await nuevoDiagnostico.save();

        // SIMULACION: Respuesta fija a Moodle - learning journey 
        const respuestaMoodle = {
            id_estudiante: id_estudiante,
            id_curso: id_curso,
            feedback_message: "En base a tu prueba de diagnóstico te recomendamos revises los siguientes recursos",
            learning_styles: {
                visual: 0.6,
                textual: 0.2,
                kinestesico: 0.1,
                auditivo: 0.1
            },
        };
        
        //Guardado en la BDD los resultados en coleccion EstilosHistoricos.
        const resgistrarEstiloHistorico = new EstiloHistorico({
            id_estudiante,
            id_curso,
            feedback_message: respuestaMoodle.feedback_message,
            learning_styles: respuestaMoodle.learning_styles,
        });


        await resgistrarEstiloHistorico.save();
        //Enviar respuesta a Moodle
        console.log('Respuesta enviada a Moodle:', respuestaMoodle);
        res.status(201).json(respuestaMoodle);

    } catch (error) {
        console.error('Error al registrar el diagnóstico:', error);
        res.status(500).json({message: 'Error al registrar el diagnóstico'});
    }
};

module.exports = diagnosticoController;