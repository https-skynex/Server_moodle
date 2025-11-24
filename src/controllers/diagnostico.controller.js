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

        const { userid, courseid, attempt} = req.body;
        //Crear un registro de prueba de diagnostico.
        const nuevoDiagnostico = new Diagnostico({
            userid,
            courseid,
            attempt
        });

        //Guardar el diagnostico.
        await nuevoDiagnostico.save();

        // SIMULACION: Respuesta fija a Moodle - learning journey 
        const respuestaMoodle = {
            userid: userid,
            courseid: courseid,
            learning_styles: {
                visual: 0.1,
                auditory: 0.7,
                textual: 0.1,
                kinesthetic: 0.1
            },
            feedback_message: "En base a tu prueba de diagnóstico te recomendamos revises los siguientes recursos Server GUIA",
            
        };
        
        //Guardado en la BDD los resultados en coleccion EstilosHistoricos.
        const resgistrarEstiloHistorico = new EstiloHistorico({
            userid,
            courseid,
            learning_styles: respuestaMoodle.learning_styles,
            feedback_message: respuestaMoodle.feedback_message,
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