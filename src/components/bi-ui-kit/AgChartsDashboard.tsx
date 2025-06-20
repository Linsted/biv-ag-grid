// src/components/bi-ui-kit/AgChartsDashboard.tsx
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { AgCharts } from "ag-charts-react";
import React from "react";

interface AgChartsDashboardProps {
  data: { name: string; sales: number; users: number }[];
  isLoading: boolean;
}

const chartTypes = [
  { type: "bar", title: "Bar Chart", direction: "horizontal" as const },
  { type: "bar", title: "Column Chart", direction: "vertical" as const },
  {
    type: "bar",
    title: "Horizontal Bar Chart",
    direction: "horizontal" as const,
  },
  { type: "line", title: "Line Chart" },
  { type: "area", title: "Area Chart" },
  { type: "pie", title: "Pie Chart" },
  { type: "area", title: "Area Chart" },
  { type: "bar", title: "Column Chart", direction: "vertical" as const },
  { type: "line", title: "Line Chart" },
  { type: "line", title: "Line Chart" },
  { type: "bar", title: "Bar Chart", direction: "horizontal" as const },
];

const yKeys = ["sales", "users"];

export const AgChartsDashboard: React.FC<AgChartsDashboardProps> = ({
  data,
  isLoading,
}) => {
  if (isLoading) return <p>Loading charts...</p>;
  if (!data.length) return <p>No data available</p>;

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", gap: 24, minWidth: "100%" }}
    >
      {chartTypes.map((cfg) => {
        if (
          cfg.title === "Column Chart" ||
          cfg.title === "Horizontal Bar Chart" ||
          cfg.title === "Bar Chart"
        ) {
          const series = yKeys.map((yKey) => ({
            type: "bar" as const,
            xKey: "name",
            yKey,
            direction: cfg.direction,
            label: { enabled: true },
          }));
          return (
            <div
              key={cfg.title}
              style={{
                width: 500,
                height: 400,
                background: "#fff",
                borderRadius: 8,
                boxShadow: "0 2px 8px #0001",
                padding: 8,
              }}
            >
              <h4 style={{ margin: 0, marginBottom: 8 }}>{cfg.title}</h4>
              <AgCharts
                options={{
                  data,
                  series,
                  title: { text: cfg.title },
                  legend: { enabled: true },
                }}
              />
            </div>
          );
        }
        if (cfg.type === "pie" || cfg.type === "doughnut") {
          // Render one pie/doughnut per yKey
          return yKeys.map((yKey) => (
            <div
              key={cfg.type + yKey}
              style={{
                width: 500,
                height: 400,
                background: "#fff",
                borderRadius: 8,
                boxShadow: "0 2px 8px #0001",
                padding: 8,
              }}
            >
              <h4 style={{ margin: 0, marginBottom: 8 }}>
                {cfg.title} ({yKey})
              </h4>
              <AgCharts
                options={{
                  data,
                  series: [
                    {
                      type: cfg.type as "pyramid",
                      angleKey: yKey,
                      labelKey: "name",
                      title: yKey.charAt(0).toUpperCase() + yKey.slice(1),
                    },
                  ],
                  title: { text: `${cfg.title} (${yKey})` },
                  legend: { enabled: true },
                }}
              />
            </div>
          ));
        }
        let series;
        if (
          [
            "groupedBar",
            "stackedBar",
            "groupedColumn",
            "stackedColumn",
          ].includes(cfg.type)
        ) {
          series = yKeys.map((yKey) => ({
            type: cfg.type as
              | "groupedBar"
              | "stackedBar"
              | "groupedColumn"
              | "stackedColumn",
            xKey: "name",
            yKey,
            stacked: cfg.type.startsWith("stacked"),
            grouped: cfg.type.startsWith("grouped"),
            label: { enabled: true },
          }));
        } else {
          series = yKeys.map((yKey) => ({
            type: cfg.type as "bar" | "line" | "area" | "pie",
            xKey: "name",
            yKey,
            label: { enabled: true },
          }));
        }
        return (
          <div
            key={cfg.type}
            style={{
              width: 500,
              height: 400,
              background: "#fff",
              borderRadius: 8,
              boxShadow: "0 2px 8px #0001",
              padding: 8,
            }}
          >
            <h4 style={{ margin: 0, marginBottom: 8 }}>{cfg.title}</h4>
            <AgCharts
              options={{
                data,
                series,
                title: { text: cfg.title },
                legend: { enabled: true },
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
