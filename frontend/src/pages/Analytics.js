import React, { useState, useEffect } from "react";
import { Chart } from "chart.js/auto";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Analytics = () => {
  const [threats, setThreats] = useState([]);
  const [selectedThreat, setSelectedThreat] = useState("");
  // Set start date as a month before today
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const [startDate, setStartDate] = useState(oneMonthAgo);
  const [endDate, setEndDate] = useState(new Date());
  

  useEffect(() => {
    // Fetch threats from the API during component initialization
    fetchThreats();
  }, []);

  const fetchThreats = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/attack?startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();

      if (data.success) {
        setThreats(data.data);
        // Set the default selected threat (you can set it to the first threat in the list)
        setSelectedThreat(data.data[0]?.threat || "");
      } else {
        console.error("Failed to fetch threats:", data.error);
      }
    } catch (error) {
      console.error("Error fetching threats:", error);
    }
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    fetchThreats();
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);

    console.log(endDate);
    fetchThreats();

  };

  // Function to generate unique random colors
  const generateUniqueRandomColors = (count) => {
    const colors = new Set();

    while (colors.size < count) {
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 0.4)`;
      colors.add(color);
    }

    return Array.from(colors);
  };

  // ...

  const getChartData = () => {
    const threatColors = generateUniqueRandomColors(threats.length);

    // Create arrays for labels and data
    const labels = threats.map((threat) => threat.threat);
    const data = threats.map((threat) => threat.noOfOccurrence);

    return {
      labels: labels,
      datasets: [
        {
          label: "No. of Occurrence",
          data: data,
          backgroundColor: threatColors,
          borderColor: threatColors.map((color) => color.replace("0.4", "1")), // Adjust alpha for border
          borderWidth: 1,
        },
      ],
    };
  };

  useEffect(() => {
    // Destroy previous charts before rendering new ones
    destroyChartInstance("line-chart");
    destroyChartInstance("pie-chart");
    destroyChartInstance("bar-chart");

    // Render new charts
    renderCharts();
  }, [selectedThreat, startDate, endDate]);

  const destroyChartInstance = (id) => {
    const chart = getChartInstance(id);
    chart && chart.destroy();
  };

  const getChartInstance = (id) => {
    const chart = Chart.getChart(id);
    return chart instanceof Chart ? chart : null;
  };

  const renderCharts = () => {
    // Render new charts here
    const lineChartCanvas = document.getElementById("line-chart");
    const pieChartCanvas = document.getElementById("pie-chart");
    const barChartCanvas = document.getElementById("bar-chart");

    new Chart(lineChartCanvas, {
      type: "line",
      data: getChartData(),
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: "No. of Occurrence",
            },
          },
          y: {
            title: {
              display: true,
              text: "Threat",
            },
          },
        },
      },
    });

    new Chart(pieChartCanvas, {
      type: "pie",
      data: getChartData(),
    });

    new Chart(barChartCanvas, {
      type: "bar",
      data: getChartData(),
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: "No. of Occurrence",
            },
          },
          y: {
            title: {
              display: true,
              text: "Threat",
            },
          },
        },
      },
    });
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Select Date Range</h2>
        <div>
          <label>Start Date:</label>
          <DatePicker selected={startDate} onChange={handleStartDateChange} />
        </div>
        <div className="mt-4">
          <label>End Date:</label>
          <DatePicker selected={endDate} onChange={handleEndDateChange} />
        </div>
      </div>

      <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Line Chart</h2>
        <canvas id="line-chart" width="400" height="200"></canvas>
      </div>

      <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Pie Chart</h2>
        <canvas id="pie-chart" width="400" height="200"></canvas>
      </div>

      <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Bar Chart</h2>
        <canvas id="bar-chart" width="400" height="200"></canvas>
      </div>
    </div>
  );
};

export default Analytics;
