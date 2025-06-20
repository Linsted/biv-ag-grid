// src/components/bi-ui-kit/DashboardCharts.tsx
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import type {
  ChartType,
  ColDef,
  CreateRangeChartParams,
  GridApi,
} from "@ag-grid-community/core";
import { ModuleRegistry } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import { GridChartsModule } from "@ag-grid-enterprise/charts";
import { MenuModule } from "@ag-grid-enterprise/menu";
import React, { useEffect, useRef } from "react";

// Register AG Grid modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  GridChartsModule,
]);

interface DashboardChartsProps {
  data: Record<string, unknown>[];
  isLoading: boolean;
}

const chartConfigs = [
  { type: "groupedBar", title: "Bar Chart" },
  { type: "stackedBar", title: "Stacked Bar Chart" },
  { type: "normalizedBar", title: "Normalized Bar Chart" },
  { type: "groupedColumn", title: "Column Chart" },
  { type: "stackedColumn", title: "Stacked Column Chart" },
  { type: "normalizedColumn", title: "Normalized Column Chart" },
  { type: "line", title: "Line Chart" },
  { type: "area", title: "Area Chart" },
  { type: "stackedArea", title: "Stacked Area Chart" },
  { type: "normalizedArea", title: "Normalized Area Chart" },
  { type: "pie", title: "Pie Chart" },
  { type: "doughnut", title: "Doughnut Chart" },
];

export const DashboardCharts: React.FC<DashboardChartsProps> = ({
  data,
  isLoading,
}) => {
  const gridApiRef = useRef<GridApi | null>(null);
  const chartRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!gridApiRef.current || !data.length) return;
    // Destroy old charts
    chartRefs.current.forEach((container) => {
      if (container) container.innerHTML = "";
    });
    // Create 12 charts
    chartConfigs.forEach((cfg, idx) => {
      const params: CreateRangeChartParams = {
        cellRange: {
          rowStartIndex: 0,
          rowEndIndex: data.length - 1,
          columns: ["name", Object.keys(data[0]).find((k) => k !== "name")!],
        },
        chartType: cfg.type as ChartType,
        chartContainer: chartRefs.current[idx]!,
        suppressChartRanges: true,
        // Remove chartThemeOverrides.title (not supported)
      };
      gridApiRef.current?.createRangeChart(params);
    });
  }, [data]);

  return (
    <div>
      {isLoading ? (
        <p>Loading charts...</p>
      ) : (
        <>
          {/* Hidden grid for chart data source */}
          <div
            style={{
              height: 0,
              width: 0,
              overflow: "hidden",
              position: "absolute",
            }}
          >
            <AgGridReact
              rowData={data}
              columnDefs={
                [
                  { field: "name", chartDataType: "category" },
                  ...Object.keys(data[0] || {})
                    .filter((k) => k !== "name")
                    .map((k) => ({
                      field: k,
                      chartDataType: "series" as const,
                    })),
                ] as ColDef[]
              }
              onGridReady={(params) => {
                gridApiRef.current = params.api;
              }}
              enableCharts={true}
              enableRangeSelection={true}
              popupParent={document.body}
            />
          </div>
          {/* Chart containers */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {chartConfigs.map((cfg, idx) => (
              <div
                key={cfg.type}
                ref={(el) => {
                  chartRefs.current[idx] = el;
                }}
                style={{
                  width: 400,
                  height: 300,
                  background: "#fff",
                  borderRadius: 8,
                  boxShadow: "0 2px 8px #0001",
                  padding: 8,
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
