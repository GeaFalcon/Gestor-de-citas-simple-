import React, { Fragment, useState } from "react";
import shortid from "shortid";
import PropTypes from "prop-types";

const Formulario = ({ crearCita }) => {
  // Crear State de citas
  const [cita, actualizarCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });
  // Crear State ERROR
  const [error, actualizarError] = useState(false);

  // Funcion que se ejecuta cada vez que el usuario escribe en un input

  const actualizarState = (e) => {
    actualizarCita({
      // ...cita, Crea una copia del objeto que pasamos como primer parametro para que no se sobreescriba la informacion de cada uno de los campos
      ...cita,
      [e.target.name]: e.target.value,
    });
  };

  // extraer valores

  const { mascota, propietario, fecha, hora, sintomas } = cita;

  // Cuando el usuario presiona subir cita

  const submitCita = (e) => {
    e.preventDefault();
    // Validador
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      actualizarError(true);
      return;
    }
    //   Eliminar mensaje de error
    actualizarError(false);

    //   Asignar un ID
    cita.id = shortid();
    //  Crear cita
    crearCita(cita);

    //   Reiniciar el Formulario

    //   El state se reinicia debido a que cada input tiene un "value"

    actualizarCita({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: "",
    });
  };

  return (
    <Fragment>
      <h2>Crear cita</h2>
      {error ? (
        <p className="alerta-error"> Todos los campos son obligatorios</p>
      ) : null}
      <form onSubmit={submitCita}>
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className=" u-full-width"
          placeholder=" Nombre mascota"
          onChange={actualizarState}
          value={mascota}
        />

        <label>Propietario</label>
        <input
          type=" text"
          name="propietario"
          className=" u-full-width"
          placeholder=" Nombre del dueño"
          onChange={actualizarState}
          value={propietario}
        />
        <label>Fecha</label>

        <input
          type="date"
          name="fecha"
          className=" u-full-width"
          onChange={actualizarState}
          value={fecha}
        />
        <label>Hora </label>

        <input
          type="time"
          name="hora"
          className=" u-full-width"
          onChange={actualizarState}
          value={hora}
        />
        <label>Sintomas </label>

        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={actualizarState}
          value={sintomas}
        ></textarea>
        <button type="submit" className=" u-full-width button-primary">
          Agregar cita
        </button>
      </form>
    </Fragment>
  );
};

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired,
};

export default Formulario;
