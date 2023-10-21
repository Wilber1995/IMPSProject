const express = require("express");
const router = express.Router();
const queries = require("../repositories/GrupoRepository");
const materiaQuery = require("../repositories/MateriaRepository"); // Agregado
const profesorQuery = require("../repositories/ProfesorRepository"); // Agregado

router.get("/", async (request, response) => {
  try {
    const grupos = await queries.obtenerTodosLosGrupos();
    response.render("grupos/listado", { grupos });
  } catch (error) {
    response.status(500).send("Ocurrió un error al obtener los grupos");
  }
});

router.get("/agregar", async (request, response) => {
  try {
    // Obtener lista de materias y profesores
    const lstMaterias = await materiaQuery.obtenerTodasLasMaterias();
    const lstProfesores = await profesorQuery.obtenerTodosLosProfesores();
    response.render("grupos/agregar", { lstMaterias, lstProfesores });
  } catch (error) {
    response
      .status(500)
      .send("Ocurrió un error al cargar el formulario de agregar");
  }
});

router.post("/agregar", async (request, response) => {
  try {
    const { num_grupo, anio, ciclo, idmateria, idprofesor } = request.body;
    const nuevoGrupo = { num_grupo, anio, ciclo, idmateria, idprofesor };
    await queries.insertarGrupo(nuevoGrupo);
    response.redirect("/grupos");
  } catch (error) {
    response.status(500).send("Ocurrió un error al agregar el grupo");
  }
});

router.get("/grupos/actualizar/:idgrupo", async (request, response) => {
  try {
    const { idgrupo } = request.params;
    const grupo = await grupoRepository.obtenerGrupoPorID(idgrupo);
    const lstMaterias = await materiaRepository.obtenerTodasLasMaterias();
    const lstProfesores = await profesorRepository.obtenerTodosLosProfesores();
    console.log("ID de la Materia:", grupo.idmateria);
    console.log("ID del Profesor:", grupo.idprofesor);
    response.render("actualizar", { grupo, lstMaterias, lstProfesores });
  } catch (error) {
    response
      .status(500)
      .send("Ocurrió un error al cargar el formulario de modificar");
  }
});



router.post("/grupos/actualizar/:idgrupo", async (request, response) => {
  try {
    const { idgrupo } = request.params;
    const { num_grupo, anio, ciclo, idmateria, idprofesor } = request.body;

    const actualizacionGrupo = { num_grupo, anio, ciclo, idmateria, idprofesor };
    await grupoRepository.actualizarGrupo(idgrupo, actualizacionGrupo);

    response.redirect("/grupos");
  } catch (error) {
    response.status(500).send("Ocurrió un error al modificar el grupo");
  }
});

router.get("/eliminar/:idgrupo", async (request, response) => {
  try {
    const { idgrupo } = request.params;
    await queries.eliminarGrupo(idgrupo);
    response.redirect("/grupos");
  } catch (error) {
    response.status(500).send("Ocurrió un error al eliminar el grupo");
  }
});

module.exports = router;