import { React, useState } from 'react'
import { Line } from 'react-chartjs-2';
import axios from 'axios'
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

function LineChart(props) {
  const initialData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: `${props.details.role} data`,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(30, 144, 255, 0.4)', // A shade of blue
        borderColor: 'rgba(30, 144, 255, 1)', // A shade of blue
        pointBorderColor: 'rgba(30, 144, 255, 1)', // A shade of blue
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(30, 144, 255, 1)', // A shade of blue
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [0,0,0,0,0,0],
      },
    ],
  };

  const [lineChartData, setLineChartData] = useState(initialData);
  const [months, setMonths] = useState([]);
  const [sales, setSales] = useState([]);

  const getLineChart = async () => {
    if (props.details.role === "vendor") {
      try {
        const lineChart = await axios.get('/monthlysales_v').then((res) => {
          const salesData = res.data;
          const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
          setMonths(salesData.map(entry => monthNames[Number(entry.month) - 1])); // subtract 1 because array indices start at 0
          setSales(salesData.map(entry => entry.sales));
          
          // if (months.length === 0) {
          //   months.push(['January', 'February', 'March', 'April', 'May', 'June']);
          //   sales.push([10, 20, 30, 40, 50, 60]);
          // }
          
          // let chartData = {
          //   ...initialData,
          //   labels: months,
          //   datasets: initialData.datasets.map(dataset => ({
          //     ...dataset,
          //     data: sales,
          //   })),
          // };
  
          // setLineChartData(chartData)
          // console.log("chart data : ", chartData)
        })
      } catch (error) {
        // alert("Inside Catch")
        if (error.response) {
          // toast.error(error.response.data.error);
          setMonths(['January', 'February', 'March', 'April', 'May', 'June']);
          setSales([0,0,0,0,0,0]);
          // let chartData = {
          //   ...initialData,
          //   labels: months,
          //   datasets: initialData.datasets.map(dataset => ({
          //     ...dataset,
          //     data: sales,
          //   })),
          // };
  
          // setLineChartData(chartData)
        } else {
          toast.error("Some error occured");
        }
      }
    }

    else if (props.details.role === "company") {
      try {
        const lineChart = await axios.get('/monthlysales_c').then((res) => {
          const salesData = res.data;
          const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
          setMonths(salesData.map(entry => monthNames[Number(entry.month) - 1])); // subtract 1 because array indices start at 0
          setSales(salesData.map(entry => entry.sales));
          // if (months.length === 0) {
          //   months.push(['January', 'February', 'March', 'April', 'May', 'June']);
          //   sales.push([10, 20, 30, 40, 50, 60]);
          // }
      
          // let chartData = {
          //   ...initialData,
          //   labels: months,
          //   datasets: initialData.datasets.map(dataset => ({
          //     ...dataset,
          //     data: sales,
          //   })),
          // };
      
          // setLineChartData(chartData)
         
        })
      } catch (error) {
        if (error.response) {
          // toast.error(error.response.data.error);
          setMonths(['January', 'February', 'March', 'April', 'May', 'June']);
          setSales([0,0,0,0,0,0]);
          // let chartData = {
          //   ...initialData,
          //   labels: months,
          //   datasets: initialData.datasets.map(dataset => ({
          //     ...dataset,
          //     data: sales,
          //   })),
          // };
  
          // setLineChartData(chartData)   
        } else {
          toast.error("Some error occured");
        }
      }
    }
    else if (props.details.role === "admin") {
      try {
        const lineChart = await axios.get('/adminLineChart').then((res) => {
          const salesData = res.data;
          const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
          setMonths(salesData.map(entry => monthNames[Number(entry.month) - 1])); // subtract 1 because array indices start at 0
          setSales(salesData.map(entry => entry.sales));
          // if (months.length === 0) {
          //   months.push(['January', 'February', 'March', 'April', 'May', 'June']);
          //   sales.push([10, 20, 30, 40, 50, 60]);
          // }
      
          // let chartData = {
          //   ...initialData,
          //   labels: months,
          //   datasets: initialData.datasets.map(dataset => ({
          //     ...dataset,
          //     data: sales,
          //   })),
          // };
      
          // setLineChartData(chartData)
         
        })
      } catch (error) {
        if (error.response) {
          // toast.error(error.response.data.error);
          setMonths(['January', 'February', 'March', 'April', 'May', 'June']);
          setSales([0,0,0,0,0,0]);
          // let chartData = {
          //   ...initialData,
          //   labels: months,
          //   datasets: initialData.datasets.map(dataset => ({
          //     ...dataset,
          //     data: sales,
          //   })),
          // };
  
          // setLineChartData(chartData)   
        } else {
          toast.error("Some error occured");
        }
      }
    }
  }
  useEffect(() => {
      getLineChart()
  }, [])


  useEffect(() => {
    if (months.length === 0) {
      months.push(['January', 'February', 'March', 'April', 'May', 'June']);
      sales.push([0,0,0,0,0,0]);
    }

    let chartData = {
      ...initialData,
      labels: months,
      datasets: initialData.datasets.map(dataset => ({
        ...dataset,
        data: sales,
      })),
    };

    setLineChartData(chartData)
}, [months, sales])

  return (
    <div style={{ margin: 'auto', textAlign: 'center', width: "500px", margin: "1em", height: "300%" }}>
      <Line
        data={lineChartData}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
}

export default LineChart;
