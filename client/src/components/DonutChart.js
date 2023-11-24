import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const DonutChart = ({ data }) => {
  const companyVsVendorRef = useRef(null);
  // const salesVsProductsRef = useRef(null);
  
  useEffect(() => {
    const companyVsVendorChartCanvas = companyVsVendorRef.current;
    // const salesVsProductsChartCanvas = salesVsProductsRef.current;

    if (companyVsVendorChartCanvas && companyVsVendorChartCanvas.chart) {
      companyVsVendorChartCanvas.chart.destroy();
    }
    // if (salesVsProductsChartCanvas && salesVsProductsChartCanvas.chart) {
    //   salesVsProductsChartCanvas.chart.destroy();
    // }

    // Create the "Company vs Vendor" Donut Chart
    companyVsVendorChartCanvas.chart = new Chart(companyVsVendorChartCanvas, {
      type: 'doughnut',
      data: {
        labels: ['Vendors', 'Companies'],
        datasets: [
          {
            data: [data.nvendors, data.ncompany],
            backgroundColor: ['rgba(0, 0, 128, 0.6)', 'rgba(0, 0, 255, 0.6)'],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });

    // Create the "Total Sales vs Total Products" Donut Chart
    // salesVsProductsChartCanvas.chart = new Chart(salesVsProductsChartCanvas, {
    //   type: 'doughnut',
    //   data: {
    //     labels: ['Total Sales', 'Total Products'],
    //     datasets: [
    //       {
    //         data: [data.tsales, data.tprods],
    //         backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
    //       },
    //     ],
    //   },
    //   options: {
    //     responsive: true,
    //   },
    // });
  }, [data]);

  return (
    <div style={{  width: '1000px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', margin: 'auto', textAlign: 'center', width:"300px",margin:"0 8em", height:"500%" }}>
        <h4>Company vs Vendor</h4>
        <canvas ref={companyVsVendorRef} />
      </div>
      {/* <div style={{ margin: 'auto', textAlign: 'center', width:"300px",margin:"1em", height:"100%" }}>
        <h4>Total Sales vs Total Products</h4>
        <canvas ref={salesVsProductsRef} />
      </div>   */}
    </div>
  );
};

export default DonutChart;
