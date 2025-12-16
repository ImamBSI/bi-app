import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFutureInsight } from "@/hooks/insightEngine";
import { formatNumberID } from "@/lib/format";

export function PeakForecastIndexCard() {
  const { data, loading, error } = useFutureInsight();

  if (loading)
    return (
      <Card>
        <CardContent>Loading...</CardContent>
      </Card>
    );
  if (error || !data)
    return (
      <Card>
        <CardContent>Error loading data</CardContent>
      </Card>
    );

  const summary = data.summary;

  const getPeak = (model: "prophet" | "sarimax" | "linear") => {
    const value = summary.peak_index_energy[model];
    const month = summary.peak_month?.[model]?.[0]?.month ?? "-";
    return { value, month };
  };

  const models = [
    { label: "Prophet", data: getPeak("prophet") },
    { label: "Sarimax", data: getPeak("sarimax") },
    { label: "Linear", data: getPeak("linear") },
  ];

  return (
    <Card className="p-4 gap-2 shadow-md w-full h-full bg-white rounded-md border border-gray-200">
      <CardHeader className="p-0 ">
        <CardTitle className="text-base font-bold text-gray-800">
          Peak Forecast Index
          <span className="text-sm font-normal text-gray-500">
            {" "}
            (Based on Forecast)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-3 gap-2 text-center">
          {models.map(({ label, data }) => (
            <div key={label}>
              <p className="text-lg font-medium text-gray-700">{label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {data.value != null ? formatNumberID(data.value) : "-"}
              </p>
              <p className="text-xs text-gray-500 mt-1">{data.month}</p>
            </div>
          ))}
        </div>

        {/* TOTAL ENERGY SECTION */}
        <div className="mt-1 pt-1 border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-700 mb-2">
            Total Index Energy Requirement
          </p>
          <p className="text-lg font-bold ">
            {formatNumberID(summary.total_energy_yearly)}{" "}
            <span className="text-xs font-normal text-gray-600">GJ</span>
          </p>
          <p className="text-xs text-gray-600 mt-2">
            <span className="text-gray-500">(Forecast Index Energy × Forecast Finish Good Kl)</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
