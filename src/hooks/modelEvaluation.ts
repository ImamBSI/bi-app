import { useEffect, useState } from "react";

export interface Evaluation {
  mae: number;
  rmse: number;
  mape: number;
}

const API_BASE = import.meta.env.BI_APPS_API || "";

export function useEvaluation(model: string, category: string) {
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/bi-apps/api/evaluation?model=${model}&category=${category}`
        );
        const data = await res.json();

        if (data.evaluation && !data.error) {
          setEvaluation({
            mae: data.evaluation.MAE,
            rmse: data.evaluation.RMSE,
            mape: data.evaluation.MAPE,
          });
        } else {
          setEvaluation(null);
        }
      } catch (err) {
        console.error("Error fetching evaluation:", err);
        setEvaluation(null);
      }
    };

    fetchEvaluation();
  }, [model, category]);

  return { evaluation };
}
