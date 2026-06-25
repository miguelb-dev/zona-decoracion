import React, { useState } from "react";
import styles from "./consumir-pintura.module.css";
import headerLogo from "../../../../assets/images/logo-segun-controles.png";

type consumirPinturaProps = {
  fechaInicio: string;
  proveedor: string;
  idPinturaInventario: string;
  numeroDeLote: string;
  cantidadConsumida: string;
  unidadDeMedida: string;
  fechaDeFinalizacion: string;
  revisadoPor: string;
  observaciones: string;
};

export const ConsumirPintura: React.FC = () => {
  const [formData, setFormData] = useState<consumirPinturaProps>({
    fechaInicio: "",
    proveedor: "",
    idPinturaInventario: "",
    numeroDeLote: "",
    cantidadConsumida: "",
    unidadDeMedida: "Litros" /* Por ahora, siempre se trabajará con Litros */,
    fechaDeFinalizacion: "",
    revisadoPor: "",
    observaciones: "",
  });

  const [enviado, setEnviado] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Almacenar los datos de los campos
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Resetear los campos
  const handleReset = () => {
    setFormData({
      fechaInicio: "",
      proveedor: "",
      idPinturaInventario: "",
      numeroDeLote: "",
      cantidadConsumida: "",
      unidadDeMedida: "Litros",
      fechaDeFinalizacion: "",
      revisadoPor: "",
      observaciones: "",
    });
  };

  // Enviar el Formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return; //* Previene que el usuario haga doble click
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/pintura/consumo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.mensaje ||
            `Error ${response.status}: ${response.statusText}`,
        );
      }

      const data = await response.json();

      console.log("Respuesta del servidor:", data);

      // Mostrar mensaje de éxito
      setEnviado(true);
      setInterval(() => {
        setEnviado(false);
      }, 3000);

      // Resetear formulario después del envío exitoso
      setTimeout(() => {
        handleReset();
      }, 3000);

      /*  */
    } catch (err) {
      console.error("Error en el envío:", err);

      /*  */
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Notificación de Envío */}
      {enviado && (
        <div className={styles.successMessage}>
          ¡Control registrado con éxito!
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <header className={styles.headerForm}>
          <div className={styles.logoWrapper}>
            <img
              src={headerLogo}
              alt="Logo de Venvidrio"
              className={styles.headerLogo}
            />
          </div>
          <h2 className={styles.headerTitle}>
            GERENCIA DE ZONA FRÍA Y PROCESOS FINALES INTENDENCIA DE PROCESOS
            FINALES
          </h2>
          <div className={styles.codeWrapper}>
            <p className={styles.headerCode}>F-F3170001</p>
          </div>
        </header>

        <section className={styles.dataWrapper}>
          <div className={styles.inputWrapper}>
            <label htmlFor="fechaInicio" className={styles.label}>
              Fecha de Inicio <span className={styles.requireSymbol}>*</span>
            </label>
            <input
              className={styles.input}
              type="date"
              id="fechaInicio"
              name="fechaInicio"
              value={formData.fechaInicio}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="proveedor" className={styles.label}>
              Proveedor <span className={styles.requireSymbol}>*</span>
            </label>
            <input
              className={styles.input}
              type="text"
              id="proveedor"
              name="proveedor"
              value={formData.proveedor}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="idPinturaInventario" className={styles.label}>
              Color <span className={styles.requireSymbol}>*</span>
            </label>
            <select
              className={styles.select}
              id="idPinturaInventario"
              name="idPinturaInventario"
              value={formData.idPinturaInventario}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un color</option>
              <option value="1">Blanco</option>
              <option value="2">Azul</option>
              <option value="3">Rojo</option>
              <option value="4">Amarillo</option>
              <option value="5">Verde</option>
            </select>
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="numeroDeLote" className={styles.label}>
              Número de Lote <span className={styles.requireSymbol}>*</span>
            </label>
            <input
              className={styles.input}
              type="text"
              id="numeroDeLote"
              name="numeroDeLote"
              value={formData.numeroDeLote}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="cantidadConsumida" className={styles.label}>
              Cantidad Recibida <span className={styles.requireSymbol}>*</span>
            </label>
            <input
              className={styles.input}
              type="text"
              id="cantidadConsumida"
              name="cantidadConsumida"
              value={formData.cantidadConsumida}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="unidadDeMedida" className={styles.label}>
              Unidad de Medida <span className={styles.requireSymbol}>*</span>
            </label>
            <input
              className={styles.input}
              id="unidadDeMedida"
              name="unidadDeMedida"
              value={formData.unidadDeMedida}
              onChange={handleChange}
              required
              readOnly
            />
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="fechaDeFinalizacion" className={styles.label}>
              Fecha de Finalización{" "}
              <span className={styles.requireSymbol}>*</span>
            </label>
            <input
              className={styles.input}
              type="date"
              id="fechaDeFinalizacion"
              name="fechaDeFinalizacion"
              value={formData.fechaDeFinalizacion}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="revisadoPor" className={styles.label}>
              Revisado Por <span className={styles.requireSymbol}>*</span>
            </label>
            <input
              className={styles.input}
              type="text"
              id="revisadoPor"
              name="revisadoPor"
              value={formData.revisadoPor}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="observaciones" className={styles.label}>
              Observaciones (opcional)
            </label>
            <textarea
              className={styles.textarea}
              id="observaciones"
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              rows={8}
              placeholder="Describe cualquier información relevante"
            />
          </div>
        </section>

        <div className={styles.buttonWrapper}>
          <button type="submit" className={styles.saveButton}>
            Guardar
          </button>
          <button
            type="button"
            onClick={handleReset}
            className={styles.resetButton}
          >
            Resetear
          </button>
        </div>
      </form>
    </>
  );
};
