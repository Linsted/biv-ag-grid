// src/hooks/data-adapters/mock.adapter.ts
export interface VisualizationConfig {
  metricId: string;
  timePeriod: string;
}
const combinedData = [
  { name: "Day 1", sales: 4000, users: 1120 },
  { name: "Day 2", sales: 4200, users: 1135 },
  { name: "Day 3", sales: 3900, users: 1150 },
  { name: "Day 4", sales: 5000, users: 1170 },
  { name: "Day 5", sales: 6100, users: 2100 },
  { name: "Day 6", sales: 6800, users: 2210 },
  { name: "Day 7", sales: 7000, users: 2330 },
  { name: "Day 8", sales: 7100, users: 2440 },
  { name: "Day 9", sales: 7200, users: 2550 },
  { name: "Day 10", sales: 7300, users: 2660 },
  { name: "Day 11", sales: 7400, users: 2770 },
  { name: "Day 12", sales: 7500, users: 2880 },
  { name: "Day 13", sales: 7600, users: 2990 },
  { name: "Day 14", sales: 7700, users: 3100 },
  { name: "Day 15", sales: 7800, users: 3110 },
  { name: "Day 16", sales: 7900, users: 3120 },
  { name: "Day 17", sales: 8000, users: 3130 },
  { name: "Day 18", sales: 8100, users: 3140 },
  { name: "Day 19", sales: 8200, users: 3250 },
  { name: "Day 20", sales: 8300, users: 3360 },
  { name: "Day 21", sales: 8400, users: 3470 },
  { name: "Day 22", sales: 8500, users: 3680 },
  { name: "Day 23", sales: 8600, users: 3890 },
  { name: "Day 24", sales: 8700, users: 4400 },
  { name: "Day 25", sales: 8800, users: 4610 },
  { name: "Day 26", sales: 8900, users: 4820 },
  { name: "Day 27", sales: 9000, users: 4930 },
  { name: "Day 28", sales: 9100, users: 5240 },
  { name: "Day 29", sales: 9200, users: 6450 },
  { name: "Day 30", sales: 9300, users: 7560 },
];
export const fetchMockData = async (
  config: VisualizationConfig
): Promise<{ name: string; sales: number; users: number }[]> => {
  console.log("Fetching mock data with config:", config);
  await new Promise((resolve) => setTimeout(resolve, 500));
  let data = combinedData;
  if (config.timePeriod === "LAST_3_DAYS") {
    data = data.slice(-3);
  } else if (config.timePeriod === "LAST_7_DAYS") {
    data = data.slice(-7);
  } else if (config.timePeriod === "LAST_30_DAYS") {
    data = data.slice(-30);
  }
  return data;
};
