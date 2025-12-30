// hooks/useEnergyOverview.ts
import { useEffect, useState } from "react";

export interface EnergyData {
  month: string;
  year: string;
  values: Record<string, number>;
}

const API_BASE = import.meta.env.BI_APPS_API || "";

export function useEnergyOverview() {
  const [data, setData] = useState<EnergyData[]>([]);
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE}/bi-apps/api/clean_data?extend=true`);
        const json = await res.json();

        const rows: EnergyData[] = Array.isArray(json?.data)
          ? json.data.map((r: any) => ({
              month: String(r.month).padStart(2, "0"),
              year: String(r.year),
              values: r.values ?? {},
            }))
          : [];

        setData(rows);

        const years = [...new Set(rows.map((r) => r.year))].sort();
        setAvailableYears(years);
      } catch (err) {
        console.error("Error fetching energy overview:", err);
        setData([]);
        setAvailableYears([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, availableYears, loading };
}
