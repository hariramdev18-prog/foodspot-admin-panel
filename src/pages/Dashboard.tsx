import React from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

const Dashboard = () => {
  const data = {
    dates: [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
    ],
    revenue: [
      120, 200, 150, 480, 500, 310, 400, 600, 850, 700, 400, 300, 450, 800, 950,
      1100, 900, 700, 650, 500, 400, 450, 600, 800, 1200, 1100, 900, 950, 810,
      600,
    ],
  };

  // ================= AREA CHART =================
  const areaOptions: ApexOptions = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    xaxis: {
      categories: data.dates,
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    colors: ["#7F00FF"],
    dataLabels: { enabled: false },
    tooltip: { theme: "dark" },
  };

  const areaSeries = [
    {
      name: "Revenue",
      data: data.revenue,
    },
  ];

  // ================= PIE CHART =================
  const pieOptions: ApexOptions = {
    labels: ["Product A", "Product B", "Product C", "Product D"],
    legend: {
      position: "bottom",
    },
    colors: ["#7F00FF", "#00E396", "#FEB019", "#FF4560"],
  };

  const pieSeries = [44, 55, 13, 33];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Revenue Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Area Chart Card */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Monthly Revenue
          </h2>
          <Chart
            options={areaOptions}
            series={areaSeries}
            type="area"
            height={350}
          />
        </div>

        {/* Pie Chart Card */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Revenue Distribution
          </h2>
          <Chart
            options={pieOptions}
            series={pieSeries}
            type="pie"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
