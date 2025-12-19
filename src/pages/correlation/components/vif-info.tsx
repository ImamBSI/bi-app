import { useVariableCorrelation } from "@/hooks/variableCorrelation";
import ReactECharts from "echarts-for-react";

export function VifInfo() {
  const { data, loading, error } = useVariableCorrelation();

  if (loading) {
    return <div className="text-sm text-gray-600">Loading VIF data...</div>;
  }

  if (error) {
    return <div className="text-sm text-red-600">Error: {error}</div>;
  }

  const vifData = data?.vif || [];

  if (!vifData.length) {
    return <div className="text-sm text-gray-600">No VIF data available</div>;
  }

  const option = {
    title: {
      text: "Variance Inflation Factor (VIF)",
      left: "center",
      textStyle: { fontSize: 14 },
    },
    tooltip: {
      trigger: "item",
      formatter: (params: any) =>
        `${params.name}: <b>${params.value.toFixed(2)}</b>`,
    },
    grid: { left: 80, right: 20, top: 40, bottom: 40 },
    xAxis: {
      type: "value",
      name: "VIF",
      axisLabel: { formatter: (val: number) => val.toFixed(2) },
    },
    yAxis: {
      type: "category",
      data: vifData.map((d: any) => d.feature),
    },
    series: [
      {
        type: "bar",
        data: vifData.map((d: any) => d.VIF),
        itemStyle: {
          color: (params: any) => (params.value > 10 ? "#ef4444" : "#3b82f6"),
        },
        label: {
          show: true,
          position: "right",
          formatter: (val: any) => val.value.toFixed(2),
        },
      },
    ],
  };

  return (
    <div className="border rounded-xl bg-white p-4 shadow-sm">
      <h3 className="text-lg font-medium mb-4">VIF Analysis</h3>
      <ReactECharts option={option} style={{ height: 300 }} />
      <p className="text-xs text-gray-500 mt-2">
        VIF &gt; 5 biasanya menandakan adanya multikolinearitas tinggi antar
        variable independent.
      </p>
    </div>
  );
}
