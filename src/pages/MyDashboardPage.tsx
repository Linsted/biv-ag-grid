// src/pages/MyDashboardPage.tsx

import { useState } from "react";
import { AgChartsDashboard } from "../components/bi-ui-kit/AgChartsDashboard";

import { TimePeriodSelector } from "../components/filters/TimePeriodSelector";
import { useVisualizationData } from "../hooks/data-adapters/useVisualizationData";

export const MyDashboardPage = () => {
  const [timePeriod, setTimePeriod] = useState("LAST_30_DAYS");
  // In a real app, the selected metric would also be a state
  const metricId = "sales";

  const config = { metricId, timePeriod };
  const { data, isLoading } = useVisualizationData(config);

  return (
    <div style={{ padding: "20px", minWidth: "80vw", width: "100%" }}>
      <h1>Dashboard with AG Charts</h1>
      <TimePeriodSelector value={timePeriod} onChange={setTimePeriod} />
      <hr />
      <AgChartsDashboard isLoading={isLoading} data={data || []} />
      <hr />
    </div>
  );
};
