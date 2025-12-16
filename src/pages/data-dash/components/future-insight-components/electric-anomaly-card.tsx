import { useFutureInsight } from "@/hooks/insightEngine";
import { formatNumberID, formatNumberIDNoDecimal } from "@/lib/format";
import { AlertCircle, CheckCircle } from "lucide-react";

export function ElectricAnomalyCard() {
  const { data: insight } = useFutureInsight();

  if (!insight) return null;

  const anomalies = insight.capacity_planning.electricity_anomalies;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-green-900",
          icon: "text-green-600",
        };
      case "mostly_compliant":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-900",
          icon: "text-blue-600",
        };
      case "partially_compliant":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          text: "text-yellow-900",
          icon: "text-yellow-600",
        };
      case "non_compliant":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          text: "text-red-900",
          icon: "text-red-600",
        };
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-200",
          text: "text-gray-900",
          icon: "text-gray-600",
        };
    }
  };

  const colors = getStatusColor(anomalies.status);

  return (
    <div className={`border rounded-lg p-4 ${colors.bg} ${colors.border} mb-4`}>
      <div className="flex items-center gap-2 mb-3">
        <AlertCircle className={`w-5 h-5 ${colors.icon}`} />
        <h3 className={`font-semibold ${colors.text}`}>
          Electricity Capacity Compliance
        </h3>
        <p className="text-sm font-normal text-gray-500 mt-1">
          (Based on Forecast)
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-white rounded p-2">
          <p className="text-xs text-gray-600 mb-1">Compliance Rate</p>
          <p className="text-lg font-bold">{anomalies.compliance_rate}%</p>
          <p className="text-xs text-gray-500">
            {anomalies.within_spec}/{anomalies.total_months} months
          </p>
        </div>

        <div className="bg-white rounded p-2">
          <p className="text-xs text-gray-600 mb-1">Out-of-Spec</p>
          <p className="text-lg font-bold">{anomalies.out_of_spec}</p>
          <p className="text-xs text-gray-500">Months exceeding capacity</p>
        </div>

        <div className="bg-white rounded p-2">
          <p className="text-xs text-gray-600 mb-1">Forecast Range</p>
          <p className="text-xs font-semibold">
            {formatNumberIDNoDecimal(anomalies.max_forecast)}
          </p>
          <p className="text-xs text-gray-500">Avg: {formatNumberID(anomalies.avg_forecast)} kWh</p>
        </div>

        <div className="bg-white rounded p-2">
          <p className="text-xs text-gray-600 mb-1">Capacity Sources</p>
          <p className="text-xs font-semibold">AMIO + ROFB</p>
          <p className="text-xs text-gray-500">
            {formatNumberIDNoDecimal(anomalies.amio_daily_max)}k + {formatNumberIDNoDecimal(anomalies.rofb_daily_max)}k/day
          </p>
        </div>
      </div>

      <div className={`${colors.bg} border-l-4 border-current rounded p-2`}>
        <p className={`text-sm font-medium ${colors.text}`}>
          {anomalies.recommendation}
        </p>
      </div>

      <div className="mt-3 pt-2 border-t border-current border-opacity-20">
        <div className="flex items-center gap-2 text-xs">
          {anomalies.status === "compliant" ? (
            <>
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-green-700">
                All forecasts within capacity bounds
              </span>
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4" />
              <span>Review capacity planning and forecast</span>
            </>
          )}
        </div>
      </div>

      {anomalies.monthly_details && anomalies.monthly_details.length > 0 && (
        <div className="mt-3 pt-3 border-t border-current border-opacity-20">
          <p className="text-xs font-semibold text-gray-700 mb-2">Monthly Breakdown</p>
          <div className="max-h-40 overflow-y-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-1 px-2">Month</th>
                  <th className="text-right py-1 px-2">Forecast (kWh)</th>
                  <th className="text-right py-1 px-2">Max Allowed</th>
                  <th className="text-center py-1 px-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {anomalies.monthly_details.map((month, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-white/50">
                    <td className="py-1 px-2">{month.month}</td>
                    <td className="text-right py-1 px-2 font-semibold">
                      {formatNumberIDNoDecimal(month.forecast_kwh)}
                    </td>
                    <td className="text-right py-1 px-2">
                      {formatNumberIDNoDecimal(month.max_allowed_kwh)}
                    </td>
                    <td className="text-center py-1 px-2">
                      {month.is_compliant ? (
                        <span className="text-green-600 font-semibold">✓</span>
                      ) : (
                        <span className="text-red-600 font-semibold">✗</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
