import React, { useState, useMemo } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

type Week = "Week 1" | "Week 2" | "Week 3" | "Week 4";
type ViewType = "monthly" | "quarterly" | "annual";

const Dashboard = () => {
  //  1️. ================ WEEKLY PIE CHART  ==================

  const [selectedWeek, setSelectedWeek] = useState<Week>("Week 1");
  const weeklyRevenue: Record<Week, number[]> = {
    "Week 1": [1200, 1500, 1800],
    "Week 2": [2000, 2200, 2000],
    "Week 3": [1700, 1900, 1700],
    "Week 4": [2500, 2600, 2000],
  };
  const pieSeries = useMemo(() => weeklyRevenue[selectedWeek], [selectedWeek]);
  const pieOptions: ApexOptions = {
    chart: { type: "pie" },
    labels: ["Product A", "Product B", "Product C"],
    legend: { position: "bottom" },
  };

  //  2️. ==============  MONTHLY LINE CHART  ================

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyRevenue = [
    12000, 15000, 18000, 14000, 22000, 25000, 21000, 19000, 23000, 26000, 24000,
    28000,
  ];
  const monthlyTarget = [
    10000, 14000, 16000, 15000, 20000, 23000, 20000, 18000, 21000, 25000, 22000,
    26000,
  ];
  const lineOptions: ApexOptions = {
    chart: { type: "line", toolbar: { show: false } },
    stroke: { curve: "smooth", width: 3 },
    xaxis: { categories: months },
    legend: { position: "top" },
  };

  const lineSeries = [
    { name: "Revenue", data: monthlyRevenue },
    { name: "Target", data: monthlyTarget },
  ];

  // ===============  3️. 2025 AREA CHART  ==================

  const [view, setView] = useState<ViewType>("monthly");
  const revenue2025 = monthlyRevenue;

  const previousMonthIndex = (() => {
    const today = new Date();
    return today.getMonth() === 0 ? 11 : today.getMonth() - 1;
  })();

  const areaData = useMemo(() => {
    switch (view) {
      case "monthly":
        return {
          categories: [months[previousMonthIndex]],
          data: [revenue2025[previousMonthIndex]],
        };
      case "quarterly":
        return {
          categories: months.slice(0, 4),
          data: revenue2025.slice(0, 4),
        };
      case "annual":
        return {
          categories: months,
          data: revenue2025,
        };
    }
  }, [view, previousMonthIndex]);

  const areaOptions: ApexOptions = {
    chart: { type: "area", toolbar: { show: false } },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 3 },
    xaxis: { categories: areaData?.categories },
  };

  const areaSeries = [
    {
      name: "Revenue 2025",
      data: areaData?.data ?? [],
    },
  ];

  return (
    <div className="p-6 space-y-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold">Revenue Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PIE CHART */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Weekly Revenue Distribution
            </h3>
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value as Week)}
              className="border rounded-md px-3 py-1 text-sm"
            >
              {Object.keys(weeklyRevenue).map((week) => (
                <option key={week} value={week}>
                  {week}
                </option>
              ))}
            </select>
          </div>

          <Chart
            options={pieOptions}
            series={pieSeries}
            type="pie"
            height={300}
          />
        </div>

        {/* LINE CHART */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">
            Monthly Revenue vs Target
          </h3>
          <Chart
            options={lineOptions}
            series={lineSeries}
            type="line"
            height={300}
          />
        </div>
      </div>

      {/* AREA CHART */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">2025 Revenue Overview</h3>
          <div className="flex space-x-2">
            {(["monthly", "quarterly", "annual"] as ViewType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setView(tab)}
                className={`px-4 py-1 rounded-md text-sm font-medium transition
                  ${
                    view === tab
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
              >
                {tab === "monthly" && "Previous Month"}
                {tab === "quarterly" && "Quarterly"}
                {tab === "annual" && "Annual"}
              </button>
            ))}
          </div>
        </div>

        <Chart
          options={areaOptions}
          series={areaSeries}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
};

export default Dashboard;
