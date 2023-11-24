
//This is for the pie chart on the Vendor Dashboard for the low quantity stock


import React from 'react';
import { Pie } from 'react-chartjs-2';

const StockPieChart = ({ chartData }) => {
  return (
    <div className="chart-container" style={{
      // border: "2px solid black",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}>
      {/* <h3 style={{ textAlign: "center" }}>PRODUCTS</h3> */}
      <div style={{ width: '400px', height: '400px' }}>
        <Pie
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Low Quantity Stock"
              }
            },
            responsive: true, // Enable responsiveness
            maintainAspectRatio: false, // Disable aspect ratio constraint
          }}
        />
      </div>
    </div>
  );
};

export default StockPieChart;
