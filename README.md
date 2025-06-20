# BI Dashboard POC with AG Grid & React

This project is a simple Proof-of-Concept (POC) BI dashboard built with Vite, React, TypeScript, AG Grid (Community & Enterprise), and @tanstack/react-query.

## Features
- AG Grid table with charting (Enterprise)
- Dashboard-level time period filter
- Mock data adapter for demo purposes
- Modular folder structure for scalable React apps

## Tech Stack
- React + TypeScript
- Vite
- AG Grid (Community & Enterprise)
- @tanstack/react-query

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Open** [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure
```
src/
├── components/
│   ├── bi-ui-kit/
│   │   └── AnalyticsGrid.tsx
│   └── filters/
│       └── TimePeriodSelector.tsx
├── hooks/
│   └── data-adapters/
│       ├── mock.adapter.ts
│       └── useVisualizationData.ts
└── pages/
    └── MyDashboardPage.tsx
```

## Notes
- AG Grid Enterprise features (like charting) require a valid license for production use.
- This POC uses mock data and is intended for demonstration purposes only.
# biv-ag-grid
