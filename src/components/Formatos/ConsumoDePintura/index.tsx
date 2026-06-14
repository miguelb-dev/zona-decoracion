import React, { useState } from "react";
import styles from "./consumoDePintura.module.css";
import headerLogo from "../../../assets/images/logo-segun-controles.png";

type consumoDePinturaProps = {
  fechaInicio: string;
  proveedor: string;
  color: string;
  numeroDeLote: string;
  cantidadRecibida: string;
  unidadDeMedida: string;
  fechaDeFinalizacion: string;
  revisadoPor: string;
  observaciones: string;
};

export const ConsumoDePintura: React.FC = () => {
  const [formData, setFormData] = useState<consumoDePinturaProps>({
    fechaInicio: "",
    proveedor: "",
    color: "",
    numeroDeLote: "",
    cantidadRecibida: "",
    unidadDeMedida: "",
    fechaDeFinalizacion: "",
    revisadoPor: "",
    observaciones: "",
  });

  const [enviado, setEnviado] = useState(false);

  // ? Investigar el propósito de esta función, creo que tiene que ver con el cambio del valor de los input
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

  // Validar el formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
  };

  // Resetear los campos
  const handleReset = () => {
    setFormData({
      fechaInicio: "",
      proveedor: "",
      color: "",
      numeroDeLote: "",
      cantidadRecibida: "",
      unidadDeMedida: "",
      fechaDeFinalizacion: "",
      revisadoPor: "",
      observaciones: "",
    });
  };

  return (
    <>
      {/* Notificación de Envío */}
      {enviado && (
        <div className={styles.successMessage}>
          ¡Control registrado con éxito!
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
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
            <label htmlFor="color" className={styles.label}>
              Color <span className={styles.requireSymbol}>*</span>
            </label>
            <input
              className={styles.input}
              type="text"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="numeroDeLote" className={styles.label}>
              Número de Lote <span className={styles.requireSymbol}>*</span>
            </label>
            <input
              className={styles.input}
              type="number"
              id="numeroDeLote"
              name="numeroDeLote"
              value={formData.numeroDeLote}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="cantidadRecibida" className={styles.label}>
              Cantidad Recibida <span className={styles.requireSymbol}>*</span>
            </label>
            <input
              className={styles.input}
              type="text"
              id="cantidadRecibida"
              name="cantidadRecibida"
              value={formData.cantidadRecibida}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="unidadDeMedida" className={styles.label}>
              Unidad de Medida <span className={styles.requireSymbol}>*</span>
            </label>
            <input
              className={styles.select}
              id="unidadDeMedida"
              name="unidadDeMedida"
              value={formData.unidadDeMedida}
              onChange={handleChange}
              required
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
