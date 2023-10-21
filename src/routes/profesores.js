const express = require('express');
const router = express.Router();
const queries = require('../repositories/ProfesorRepository');

// Endpoint para mostrar todos los profesores
router.get('/', async (request, response) => {
    const profesores = await queries.obtenerTodosLosProfesores();
    //const fecha_nacimiento = profesores.fecha_nacimiento.toISOString().split('T')[0];
     response.render('profesores/listado', {profesores:profesores}); // Mostramos el listado de profesores
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


// Enpoint que permite realizar la modificacion de un profesor
router.post('/modificar/:id', async(request, response) => {
    const { id } = request.params;
    const { idprofesor, nombre, apellido, fecha_nacimiento, profesion, genero, email } = request.body;
    //const fecha_nacimiento = fechaSQL.toISOString().split('T')[0];
    const nuevoProfesor = { idprofesor, nombre, apellido, fecha_nacimiento, profesion, genero, email};

    const actualizacion = await queries.actualizarProfesor(id, nuevoProfesor);

    response.redirect('/profesores');

});

// Endpoint para agregar un profesor
router.post('/agregar', async(request, response) => {
    
    const { idprofesor, nombre, apellido, fecha_nacimiento, profesion, genero, email } = request.body;
    //const fecha_nacimiento = fechaSQL.toISOString().split('T')[0];
    const nuevoProfesor = { idprofesor, nombre, apellido, fecha_nacimiento, profesion, genero, email};
    
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
