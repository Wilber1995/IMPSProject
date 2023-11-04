const pool = require("../config/databaseController");

module.exports = {
  obtenerTodosLosGrupos: async () => {
    try {
      const result = await pool.query("SELECT g.idgrupo, g.num_grupo, g.anio, g.ciclo, m.materia, p.nombre, m.idmateria, p.idprofesor FROM grupos g, materias m, profesores p WHERE g.idmateria=m.idmateria AND g.idprofesor=p.idprofesor;");
      return result;
    } catch (error) {
      console.error(
        "Ocurrió un problema al consultar la lista de grupos: ",error);
    }
  },

  eliminarGrupo: async (idgrupo) => {
    try {
      const result = await pool.query("DELETE FROM grupos WHERE idgrupo = ?", [
        idgrupo,
      ]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error al eliminar el registro", error);
      throw error;
    }
  },

  insertarGrupo: async (nuevogrupo) => {
    try {
      const result = await pool.query("INSERT INTO grupos SET ?", nuevogrupo);
      return result.insertId;
    } catch (error) {
      console.error("Error al insertar el registro", error);
      throw error;
    }
  },

  actualizarGrupo: async (idgrupo, actualizacion) => {
    try {
      const resultado = await pool.query(
        "UPDATE grupos SET ? WHERE idgrupo = ?",
        [actualizacion, idgrupo]
      );
      return resultado.affectedRows > 0;
    } catch (error) {
      console.log("Error al actualizar grupo", error);
      throw error;
    }
  },

  obtenerGrupoPorID: async (idgrupo) => {
    try {
      const [grupo] = await pool.query(
        "SELECT * FROM grupos WHERE idgrupo = ?",
        [idgrupo]
      );
      return grupo;
    } catch (error) {
      console.log(
        "Ocurrió un problema al obtener información del grupo",
        error
      );
      throw error;
    }
  },
  obtenerTodosLosGrupos: async () => {
    try {
      const result = await pool.query("SELECT g.idgrupo, g.num_grupo, g.anio, g.ciclo, m.materia, p.nombre, m.idmateria, p.idprofesor FROM grupos g, materias m, profesores p WHERE g.idmateria=m.idmateria AND g.idprofesor=p.idprofesor;");
      return result;
    } catch (error) {
      console.error(
        "Ocurrió un problema al consultar la lista de grupos: ",
        error
      );
      throw error;
    }
  },

  actualizarGrupo: async (idgrupo, actualizacion) => {
    try {
      const resultado = await pool.query(
        "UPDATE grupos SET ? WHERE idgrupo = ?",
        [actualizacion, idgrupo]
      );
      return resultado.affectedRows > 0;
    } catch (error) {
      console.log("Error al actualizar grupo", error);
      throw error;
    }
  },

  obtenerGrupoPorID: async (idgrupo) => {
    try {
      const [grupo] = await pool.query(
        "SELECT * FROM grupos WHERE idgrupo = ?",
        [idgrupo]
      );
      return grupo;
    } catch (error) {
      console.log(
        "Ocurrió un problema al obtener información del grupo",
        error
      );
      throw error;
    }
  },

  // Asignar grupo
  asignarGrupo: async (asignacion) => {
    try {
      const result = await pool.query("INSERT INTO grupo_estudiantes SET ? ",
        asignacion);
      console.log('resultado: ', result)
      return result;
    } catch (error) {
      console.log('Ocurrió un problema con asignar grupo ', error);
    }
  },

};
