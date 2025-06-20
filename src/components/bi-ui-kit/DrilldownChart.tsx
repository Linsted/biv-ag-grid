import React, { useState, useRef, useEffect } from "react";
import { AgCharts } from "ag-charts-react";

// Mock drilldown data: hourly sales/users for each day
const hourlyData: Record<string, { hour: string; sales: number; users: number }[]> = {};
for (let d = 1; d <= 30; d++) {
  const day = `Day ${d}`;
  hourlyData[day] = Array.from({ length: 24 }, (_, h) => ({
    hour: `${h}:00`,
    sales: Math.floor(100 + Math.random() * 400),
    users: Math.floor(5 + Math.random() * 20),
  }));
}

interface DrilldownChartProps {
  data: { name: string; sales: number; users: number }[];
}

export const DrilldownChart: React.FC<DrilldownChartProps> = ({ data }) => {
  const [drillDay, setDrillDay] = useState<string | null>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  // Fix: Force chart resize after mount to ensure correct sizing
  useEffect(() => {
    if (chartContainerRef.current) {
      // Trigger a resize event after a short delay
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 100);
    }
  }, [drillDay]);

  if (!data.length) return <p>No data available</p>;

  if (drillDay) {
    // Drilldown view: hourly data for selected day
    const drillData = hourlyData[drillDay] || [];
    return (
      <div ref={chartContainerRef} style={{ width: 600, margin: "24px auto", background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px #0001", padding: 16 }}>
        <button onClick={() => setDrillDay(null)} style={{ marginBottom: 8 }}>Back</button>
        <h3>Hourly Breakdown for {drillDay}</h3>
        <AgCharts
          options={{
            data: drillData,
            series: [
              { type: "bar", xKey: "hour", yKey: "sales", label: { enabled: true }, direction: "vertical" },
              { type: "line", xKey: "hour", yKey: "users", label: { enabled: true } },
            ],
            title: { text: `Sales & Users by Hour for ${drillDay}` },
            legend: { enabled: true },
          }}
        />
      </div>
    );
  }

  // Top-level view: bar chart by day
  return (
    <div ref={chartContainerRef} style={{ width: 600, margin: "24px auto", background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px #0001", padding: 16 }}>
      <h3>Drilldown Chart: Sales by Day</h3>
      <AgCharts
        options={{
          data,
          series: [
            {
              type: "bar",
              xKey: "name",
              yKey: "sales",
              label: { enabled: true },
              direction: "vertical",
              listeners: {
                nodeClick: (e: any) => setDrillDay(e.datum.name),
              },
            },
          ],
          title: { text: "Click a bar to drill down to hourly view" },
          legend: { enabled: false },
        }}
      />
    </div>
  );
};
