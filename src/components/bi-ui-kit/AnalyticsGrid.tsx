// src/components/bi-ui-kit/AnalyticsGrid.tsx
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry, type ColDef } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import { GridChartsModule } from "@ag-grid-enterprise/charts";
import { MenuModule } from "@ag-grid-enterprise/menu";

// Register the required AG Grid modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  GridChartsModule,
]);

interface AnalyticsGridProps {
  isLoading: boolean;
  data: any[];
  columnDefs: ColDef[];
}

export const AnalyticsGrid = ({
  isLoading,
  data,
  columnDefs,
}: AnalyticsGridProps) => {
  if (isLoading) {
    return <p>Loading data...</p>;
  }

  return (
    <div className="ag-theme-quartz" style={{ height: 500, width: "100%" }}>
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        enableRangeSelection={true}
        enableCharts={true}
        popupParent={document.body}
      />
    </div>
  );
};
