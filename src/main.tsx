import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/layout";
import "./index.css";
import { ForecastPage } from "@/pages/forecast";
import { CorrelationPage } from "@/pages/correlation";
import { ExploratoryDataAnalysis } from "./pages/eda";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout title="Forecast Page"/>}>
          <Route index element={<ForecastPage />} />
        </Route>
        <Route path="/correlation" element={<Layout title="Correlation Page" />}>
          <Route index element={<CorrelationPage />} />
        </Route>
        <Route path="/eda" element={<Layout title="Summary Page" />}>
          <Route index element={<ExploratoryDataAnalysis />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
