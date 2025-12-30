import { useEffect, useState } from "react";
import { EnergyTrends } from "./energy-trends";
import { EnergyTable } from "./energy-table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useEnergyOverview } from "@/hooks/use-EnergyOverview";

export interface EnergyData {
  month: string;
  year: string;
  values: Record<string, number>;
}

export function EnergyOverviewSection() {
  const { data, availableYears, loading } = useEnergyOverview();
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    if (availableYears.length > 0 && !selectedYear) {
      const currentYear = new Date().getFullYear().toString();
      setSelectedYear(
        availableYears.includes(currentYear)
          ? currentYear
          : availableYears.at(-1) ?? ""
      );
    }
  }, [availableYears, selectedYear]);

  if (loading) {
    return <div className="h-48 bg-gray-100 rounded-xl animate-pulse" />;
  }

  return (
    <div className="w-full h-full space-y-4 border-2 rounded-2xl gap-6 p-3 bg-gray-200">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Energy Overview</h2>

        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[120px] h-[36px] bg-white">
            <SelectValue placeholder="Pilih Tahun" />
          </SelectTrigger>
          <SelectContent>
            {availableYears.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <EnergyTable selectedYear={selectedYear} data={data} />
      <EnergyTrends selectedYear={selectedYear} data={data} />
    </div>
  );
}
