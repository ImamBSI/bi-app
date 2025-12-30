import { useEffect, useState } from "react";

export interface ForecastRow {
  date: string;
  forecastValue: number | null;
  upperValue: number | null;
  lowerValue: number | null;
}

const API_BASE = import.meta.env.BI_APPS_API || "";

export function useForecast(model: string, category: string, year: string) {
  const [forecastData, setForecastData] = useState<ForecastRow[]>([]);
  const [warning, setWarning] = useState("");

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        // Jika year = 2025, gunakan historical_forecast endpoint
        const endpoint =
          year === "2025"
            ? `${API_BASE}/bi-apps/api/historical_forecast?model=${model}&category=${category}`
            : `${API_BASE}/bi-apps/api/forecast?model=${model}&category=${category}&year=${year}`;

        const res = await fetch(endpoint);
        const data = await res.json();

        if (!data.forecast || data.forecast.length < 6) {
          setWarning(
            "Model tidak bisa membaca Forecast. Terlalu sedikit data observasi."
          );
          setForecastData([]);
          return;
        }

        setWarning("");

        const mapped: ForecastRow[] = data.forecast.map((item: any) => ({
          date: item.ds.slice(0, 7),
          forecastValue: item.yhat ?? null,
          upperValue: item.yhat_upper ?? null,
          lowerValue: item.yhat_lower ?? null,
        }));

        setForecastData(mapped);
      } catch (err) {
        console.error("Error fetching forecast:", err);
        setWarning("Gagal mengambil forecast dari server.");
        setForecastData([]);
      }
    };

    fetchForecast();
  }, [model, category, year]);

  return { forecastData, warning };
}
