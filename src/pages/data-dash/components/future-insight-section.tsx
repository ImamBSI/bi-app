import ForecastCompareChart from "./forecast-compare";
import ForecastFGChart from "./forecast-fg";
import { CostProjectionCard } from "./future-insight-components/cost-projection-card";
import { KPIOutlook } from "./future-insight-components/kpi-outlook-card";
import { PeakForecastIndexCard } from "./future-insight-components/peak-index-card";
import { NaturalGasAnomalyCard } from "./future-insight-components/gas-anomaly-card";
import { ElectricAnomalyCard } from "./future-insight-components/electric-anomaly-card";
import { CapacityPlanningCard } from "./future-insight-components/capacity-planning-card";

export function FutureInsightSection() {
  return (
    <div className="flex flex-col gap-2 w-full p-4 bg-gray-200 rounded-2xl">
      {/* ----- TOP ROW ----- */}
      <div className="flex gap-2">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-2 flex-1">
          <ForecastCompareChart year={2026} defaultCategory="indexEnergy" />
          <ForecastFGChart year={2026} />
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex gap-2 max-h-56 ">
            <div className="flex-shrink-0">
              <KPIOutlook />
            </div>
            <div className="flex-1">
              <PeakForecastIndexCard />
            </div>
          </div>
          <CostProjectionCard />
          <CapacityPlanningCard />
        </div>
      </div>

      {/* ----- BOTTOM ROW: ANOMALY CARDS (SIDE BY SIDE) ----- */}
      <div className="flex gap-4">
        <div className="flex-1">
          <ElectricAnomalyCard />
        </div>
        <div className="flex-1">
          <NaturalGasAnomalyCard />
        </div>
      </div>

      {/* ----- CAPACITY PLANNING CARD ----- */}
      <div className="w-full">
        
      </div>
    </div>
  );
}
