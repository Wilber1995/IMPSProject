// Este archivo sera utilizado para configurar todas las rutas principales del sistema
const express = require('express');
const router = express.Router();
const estudianteRepository = require('../repositories/EstudianteRepository');
const grupoRepository = require('../repositories/GrupoRepository');
const materiaRepository = require('../repositories/MateriaRepository'); // Agregado
const profesorRepository = require('../repositories/ProfesorRepository'); // Agregado

// Configuracion de ruta inicial de la aplicacion
router.get('/', async (request,response) => {
    // Probando conexion con la base de datos.
    const lstEstudiantes = await estudianteRepository.obtenerTodosLosEstudiantes();
    console.log('Listado: ', lstEstudiantes);
    
    response.send('Bienvenido al laboratorio de IMPS');
});
// Obtener todos los grupos
router.get('/grupos', async (request, response) => {
    const grupos = await grupoRepository.obtenerTodosLosGrupos();
    response.render('grupos/listado', { grupos });
});

// Mostrar formulario para agregar un nuevo grupo
router.get('/grupos/agregar', async(request, response) => {
    const lstMaterias = await materiaRepository.obtenerTodasLasMaterias();  // Cambiado de materiasQuery a materiasRepository
    const lstProfesores = await profesorRepository.obtenerTodosLosProfesores();
    response.render('grupos/agregar', { lstMaterias, lstProfesores });
});

// Agregar un grupo
router.post('/grupos/agregar', async(request, response) => {
    const { num_grupo, anio, ciclo, idmateria, idprofesor } = request.body;
    const nuevoGrupo = { num_grupo, anio, ciclo, idmateria, idprofesor };
    const resultado = await grupoRepository.insertarGrupo(nuevoGrupo);  // Cambiado de queries a grupoRepository
    response.redirect('/grupos');
});

// Actualizar un grupo
router.post('/grupos/actualizar/:idgrupo', async (request, response) => {
    const { idgrupo } = request.params;
    const { num_grupo, anio, ciclo, idmateria, idprofesor } = request.body;
    const actualizacionGrupo = { num_grupo, anio, ciclo, idmateria, idprofesor };

    const resultado = await grupoRepository.actualizarGrupo(idgrupo, actualizacionGrupo);

    response.redirect('/grupos');
});

router.get('/grupos/actualizar/:idgrupo', async (request, response) => {
    const { idgrupo } = request.params;
    const grupo = await grupoRepository.obtenerGrupoPorID(idgrupo);
    const lstMaterias = await materiaRepository.obtenerTodasLasMaterias();
    const lstProfesores = await profesorRepository.obtenerTodosLosProfesores();
    console.log("Lista de Materias:", lstMaterias);
    console.log("Lista de Profesores:", lstProfesores);
    response.render('grupos/actualizar', { grupo, lstMaterias, lstProfesores });
});

// Eliminar un grupo
router.get('/grupos/eliminar/:idgrupo', async (request, response) => {
    const { idgrupo } = request.params;
    const resultado = await grupoRepository.eliminarGrupo(idgrupo);
    if (resultado > 0) {
        console.log('Grupo eliminado con éxito');
    }
    response.redirect('/grupos');
});

// Obtener todas las materias



module.exports = router;


