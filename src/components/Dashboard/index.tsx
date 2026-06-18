import { useMemo, useState } from "react";
import { Lineal } from "./Graficos/Lineal";
import { Barras } from "./Graficos/Barras";
import { Torta } from "./Graficos/Torta";
import type { ChartType, DashboardDataItem, VisibleMetrics } from "../../types";
import styles from "./Dashboard.module.css";

const chartOptions = [
  { value: "lineal" as const, label: "Lineal" },
  { value: "barras" as const, label: "Barras" },
  { value: "torta" as const, label: "Torta" },
];

// * Esta constante es solo para tener datos mockups y hacer pruebas. Será remplazado por la consulta a la API del backend la cual obtiene la información real de la BBDD
const sampleData: DashboardDataItem[] = [
  {
    date: "2026-01-20",
    produceLisa: 78,
    envasesDecorados: 54,
    envasesDefectuosos: 12,
  },
  {
    date: "2026-01-27",
    produceLisa: 102,
    envasesDecorados: 70,
    envasesDefectuosos: 14,
  },
  {
    date: "2026-02-03",
    produceLisa: 120,
    envasesDecorados: 83,
    envasesDefectuosos: 18,
  },
  {
    date: "2026-02-10",
    produceLisa: 98,
    envasesDecorados: 76,
    envasesDefectuosos: 11,
  },
  {
    date: "2026-02-17",
    produceLisa: 110,
    envasesDecorados: 91,
    envasesDefectuosos: 15,
  },
  {
    date: "2026-02-24",
    produceLisa: 125,
    envasesDecorados: 104,
    envasesDefectuosos: 16,
  },
  {
    date: "2026-03-03",
    produceLisa: 135,
    envasesDecorados: 115,
    envasesDefectuosos: 19,
  },
  {
    date: "2026-03-10",
    produceLisa: 143,
    envasesDecorados: 121,
    envasesDefectuosos: 20,
  },
];

const visibleMetricLabels: Record<keyof VisibleMetrics, string> = {
  produceLisa: "Producción Lisa",
  envasesDecorados: "Envases Decorados",
  envasesDefectuosos: "Envases con Defectos",
};

export const Dashboard = () => {
  const [fromDate, setFromDate] = useState("2026-01-20");
  const [toDate, setToDate] = useState("2026-03-10");
  const [chartType, setChartType] = useState<ChartType>("lineal");
  const [visibleMetrics, setVisibleMetrics] = useState<VisibleMetrics>({
    produceLisa: true,
    envasesDecorados: true,
    envasesDefectuosos: true,
  });

  const filteredData = useMemo(() => {
    const from = new Date(fromDate);
    const to = new Date(toDate);

    return sampleData.filter((item) => {
      const current = new Date(item.date);
      return current >= from && current <= to;
    });
  }, [fromDate, toDate]);

  const hasData = filteredData.length > 0;

  const toggleMetric = (metric: keyof VisibleMetrics) => {
    setVisibleMetrics((current) => ({
      ...current,
      [metric]: !current[metric],
    }));
  };

  const ChartComponent =
    chartType === "lineal" ? Lineal : chartType === "barras" ? Barras : Torta;

  return (
    <section className={styles.dashboard}>
      <header className={styles.dashboardHeader}>
        <h2 className={styles.title}>Dashboard de Producción</h2>
        <div className={styles.checkboxList}>
          {Object.keys(visibleMetricLabels).map((metric) => {
            const key = metric as keyof VisibleMetrics;
            return (
              <label className={styles.checkboxItem} key={metric}>
                <input
                  type="checkbox"
                  checked={visibleMetrics[key]}
                  onChange={() => toggleMetric(key)}
                />
                {visibleMetricLabels[key]}
              </label>
            );
          })}
        </div>
      </header>

      <section className={styles.controls}>
        <div className={styles.controlWrapper}>
          <label className={styles.controlLabel}>Desde</label>
          <input
            className={styles.dateInput}
            type="date"
            value={fromDate}
            max={toDate}
            onChange={(event) => setFromDate(event.target.value)}
          />
        </div>

        <div className={styles.controlWrapper}>
          <label className={styles.controlLabel}>Hasta</label>
          <input
            className={styles.dateInput}
            type="date"
            value={toDate}
            min={fromDate}
            onChange={(event) => setToDate(event.target.value)}
          />
        </div>

        <div className={styles.controlWrapper}>
          <label className={styles.controlLabel}>Tipo de gráfico</label>
          <select
            className={styles.select}
            value={chartType}
            onChange={(event) => setChartType(event.target.value as ChartType)}
          >
            {chartOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className={styles.chartArea}>
        {hasData ? (
          <ChartComponent data={filteredData} visibleMetrics={visibleMetrics} />
        ) : (
          <p className={styles.noData}>
            No hay datos para el período seleccionado. Ajusta las fechas o la
            selección de métricas.
          </p>
        )}
      </section>
    </section>
  );
};
