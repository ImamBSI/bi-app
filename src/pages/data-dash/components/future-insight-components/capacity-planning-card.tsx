import { useFutureInsight } from "@/hooks/insightEngine";
import { formatNumberIDNoDecimal } from "@/lib/format";
import { TrendingUp, Zap, Flame } from "lucide-react";

export function CapacityPlanningCard() {
  const { data: insight } = useFutureInsight();

  if (!insight) return null;

  const capacity = insight.capacity_planning;

  return (
    <div className="border rounded-lg p-4 bg-white border-gray-200 space-y-4">
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        <h3 className="font-bold text-lg text-gray-900">Capacity Planning</h3>
      </div>

      {/* ELECTRICITY CAPACITY */}
      <div className="border rounded-lg p-4 bg-gradient-to-br from-yellow-50 to-orange-50 border-orange-200">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-600" />
            <div>
              <p className="font-semibold text-gray-900">
                Electricity Capacity
              </p>
              <p className="text-xs text-gray-600">
                Model used: {capacity.best_electricity_model.toUpperCase()}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-3">
          {/* Total Required */}
          <div className="bg-white rounded p-3 border border-orange-100">
            <p className="text-xs text-gray-600 mb-1">Total Required</p>
            <p className="text-lg font-bold text-orange-700">
              {formatNumberIDNoDecimal(capacity.required_electricity_kwh)}
            </p>
            <p className="text-xs text-gray-500">kWh/year</p>
          </div>

          {/* Peak Load */}
          <div className="bg-white rounded p-3 border border-orange-100">
            <p className="text-xs text-gray-600 mb-1">Peak Load</p>
            <p className="text-lg font-bold text-orange-700">
              {capacity.peak_load.electricity.value_kwh
                ? formatNumberIDNoDecimal(
                    capacity.peak_load.electricity.value_kwh
                  )
                : "N/A"}
            </p>
            <p className="text-xs text-gray-500">
              {capacity.peak_load.electricity.month || "No data"}
            </p>
          </div>

          {/* Recommended Capacity (with buffer) */}
          <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded p-3  border-orange-300 border-2">
            <p className="text-xs text-gray-700 font-semibold mb-1">
              Recommended (+10%)
            </p>
            <p className="text-lg font-bold text-orange-800">
              {capacity.recommended_capacity_electricity_kwh
                ? formatNumberIDNoDecimal(
                    capacity.recommended_capacity_electricity_kwh
                  )
                : "N/A"}
            </p>
            <p className="text-xs text-gray-600">kWh</p>
          </div>
        </div>

        {/* Electricity Bounds Check */}
        {capacity.electricity_anomalies && (
          <div className="flex items-center gap-2 text-xs px-3 py-2 bg-orange-100 rounded border border-orange-200">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                capacity.electricity_anomalies.compliance_rate === 100
                  ? "bg-green-500"
                  : "bg-yellow-500"
              }`}
            ></span>
            <span className="text-gray-700">
              <strong>{capacity.electricity_anomalies.compliance_rate}%</strong>{" "}
              compliance with AMIO/ROFB bounds
            </span>
          </div>
        )}
      </div>

      {/* NATURAL GAS CAPACITY */}
      <div className="border rounded-lg p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-semibold text-gray-900">
                Natural Gas Capacity
              </p>
              <p className="text-xs text-gray-600">
                Model used: {capacity.best_natural_gas_model.toUpperCase()}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-3">
          {/* Total Required */}
          <div className="bg-white rounded p-3 border border-blue-100">
            <p className="text-xs text-gray-600 mb-1">Total Required</p>
            <p className="text-lg font-bold text-blue-700">
              {formatNumberIDNoDecimal(capacity.required_natural_gas_mmbtu)}
            </p>
            <p className="text-xs text-gray-500">MMBTU/year</p>
          </div>

          {/* Peak Load */}
          <div className="bg-white rounded p-3 border border-blue-100">
            <p className="text-xs text-gray-600 mb-1">Peak Load</p>
            <p className="text-lg font-bold text-blue-700">
              {capacity.peak_load.natural_gas.value_mmbtu
                ? formatNumberIDNoDecimal(
                    capacity.peak_load.natural_gas.value_mmbtu
                  )
                : "N/A"}
            </p>
            <p className="text-xs text-gray-500">
              {capacity.peak_load.natural_gas.month || "No data"}
            </p>
          </div>

          {/* Recommended Capacity (with buffer) */}
          <div className="bg-gradient-to-br from-blue-100 to-cyan-50 rounded p-3 border-blue-300 border-2">
            <p className="text-xs text-gray-700 font-semibold mb-1">
              Recommended (+10%)
            </p>
            <p className="text-lg font-bold text-blue-800">
              {capacity.recommended_capacity_natural_gas_mmbtu
                ? formatNumberIDNoDecimal(
                    capacity.recommended_capacity_natural_gas_mmbtu
                  )
                : "N/A"}
            </p>
            <p className="text-xs text-gray-600">MMBTU</p>
          </div>
        </div>

        {/* Natural Gas Bounds Check */}
        {capacity.natural_gas_anomalies && (
          <div className="flex items-center gap-2 text-xs px-3 py-2 bg-blue-100 rounded border border-blue-200">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                capacity.natural_gas_anomalies.compliance_rate === 100
                  ? "bg-green-500"
                  : "bg-yellow-500"
              }`}
            ></span>
            <span className="text-gray-700">
              <strong>{capacity.natural_gas_anomalies.compliance_rate}%</strong>{" "}
              compliance with operational bounds
            </span>
          </div>
        )}
      </div>

      {/* TOTAL INDEX ENERGY */}
      {/* <div className="border rounded-lg p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <p className="font-semibold text-gray-900">Total Energy (GJ)</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-purple-700">
              {formatNumberID(capacity.required_index_energy_gj)}
            </p>
            <p className="text-xs text-gray-600">for year {insight.summary.year}</p>
          </div>
        </div>
      </div> */}

      {/* SUMMARY TABLE */}
      <div className="border-t pt-4">
        <p className="text-xs font-semibold text-gray-700 mb-3">
          Capacity Summary
        </p>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">
                Energy Type
              </th>
              <th className="text-right py-2 px-2 text-xs font-semibold text-gray-700">
                Total
              </th>
              <th className="text-right py-2 px-2 text-xs font-semibold text-gray-700">
                Peak
              </th>
              <th className="text-right py-2 px-2 text-xs font-semibold text-gray-700">
                Recommended
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100 hover:bg-orange-50">
              <td className="py-2 px-2 text-gray-700 font-medium">
                Electricity
              </td>
              <td className="text-right py-2 px-2">
                {formatNumberIDNoDecimal(capacity.required_electricity_kwh)} kWh
              </td>
              <td className="text-right py-2 px-2">
                {capacity.peak_load.electricity.value_kwh
                  ? formatNumberIDNoDecimal(
                      capacity.peak_load.electricity.value_kwh
                    )
                  : "N/A"}{" "}
                kWh
              </td>
              <td className="text-right py-2 px-2 font-semibold text-orange-700">
                {capacity.recommended_capacity_electricity_kwh
                  ? formatNumberIDNoDecimal(
                      capacity.recommended_capacity_electricity_kwh
                    )
                  : "N/A"}{" "}
                kWh
              </td>
            </tr>
            <tr className="border-b border-gray-100 hover:bg-blue-50">
              <td className="py-2 px-2 text-gray-700 font-medium">
                Natural Gas
              </td>
              <td className="text-right py-2 px-2">
                {formatNumberIDNoDecimal(capacity.required_natural_gas_mmbtu)}{" "}
                MMBTU
              </td>
              <td className="text-right py-2 px-2">
                {capacity.peak_load.natural_gas.value_mmbtu
                  ? formatNumberIDNoDecimal(
                      capacity.peak_load.natural_gas.value_mmbtu
                    )
                  : "N/A"}{" "}
                MMBTU
              </td>
              <td className="text-right py-2 px-2 font-semibold text-blue-700">
                {capacity.recommended_capacity_natural_gas_mmbtu
                  ? formatNumberIDNoDecimal(
                      capacity.recommended_capacity_natural_gas_mmbtu
                    )
                  : "N/A"}{" "}
                MMBTU
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
