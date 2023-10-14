const express = require('express');
const router = express.Router();
const queries = require('../repositories/ProfesorRepository');

// Endpoint para mostrar todos los carreras
router.get('/', async (request, response) => {
    const profesores = await queries.obtenerTodosLosProfesores();

     response.render('profesores/listado', {profesores: profesores}); // Mostramos el listado de profesores
});

// Endpoint que permite mostrar el formulario para agregar una nueva carrera
router.get('/agregar', async(request, response) => {
   
    // Renderizamos el formulario
    response.render('profesores/agregar');
});

// Endpoint que permite mostrar el formulario para modificar una carrera
router.get('/modificar/:idprofesor', async(request, response) => {
    const {idprofesor} = request.params;

    // Aca es de obtener el objeto del carrera
    const profesor = await queries.obtenerProfesorPorID(idprofesor)

    response.render('profesores/actualizar',{idprofesor, profesor});
});


// Enpoint que permite realizar la modificacion de una carrera
router.post('/modificar/:id', async(request, response) => {
    const { id } = request.params;
    const { idprofesor, nombre } = request.body;
    const nuevoProfesor = { idprofesor, nombre};

    const actualizacion = await queries.actualizarProfesor(id, nuevoProfesor);

    response.redirect('/profesores');

});

// Endpoint para agregar una carrera
router.post('/agregar', async(request, response) => {
    
    const { idprofesor, nombre } = request.body;
    const nuevoProfesor = { idprofesor, nombre};
    
    // Se trata de una insercion
    const resultado = await queries.insertarProfesor(nuevoProfesor);
    
    response.redirect('/profesores');
});

// Endpoint que permite eliminar una carrera
router.get('/eliminar/:idprofesor', async(request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idcarrera
    const { idprofesor } = request.params;
    const resultado = await queries.eliminarProfesor(idprofesor);
    if(resultado > 0){
        console.log('Eliminado con éxito');
    }
    response.redirect('/profesores');
});

module.exports = router;
