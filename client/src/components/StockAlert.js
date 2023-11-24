import { useState, React, useEffect } from 'react'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import StockPieChart from './StockPieChart';
import axios from 'axios'
import EnhancedTable from './Tablemaking';
import StockAlertTable from './StockAlertTable';
const StockAlert = (props) => {
  const sampleData = [
    {
      orderId: '1',
      date: '2023-09-25',
      quantity: 10,
      alertAmount: 100,
      status: 'Pending',
    },
    // {
    //   orderId: '2',
    //   date: '2023-09-24',
    //   quantity: 15,
    //   alertAmount: 150,
    //   status: 'Shipped',
    // },
    // {
    //   orderId: '3',
    //   date: '2023-09-23',
    //   quantity: 8,
    //   alertAmount: 80,
    //   status: 'Delivered',
    // },
    // {
    //   orderId: '4',
    //   date: '2023-09-22',
    //   quantity: 20,
    //   alertAmount: 200,
    //   status: 'Pending',
    // },
    // {
    //   orderId: '5',
    //   date: '2023-09-21',
    //   quantity: 12,
    //   alertAmount: 120,
    //   status: 'Shipped',
    // },
  ];

  const initialChartData = {
    labels: sampleData.map(item => `Product${item.orderId}`),
    datasets: [
      {
        data: sampleData.map(item => item.quantity),
        backgroundColor: ['blue', 'lightblue', 'deepskyblue', 'dodgerblue', 'royalblue', 'green'],
      },
    ],
  };


  const [chartData, setChartData] = useState(initialChartData);
  const [tabledata, setTableData] = useState([])

  useEffect(() => {
    if (props.details.role === "vendor") {
      const stockalert = axios.get('/prothreshold_v').then((res) => {
        const data = res.data
        let labels = [];
        let quantity = [];
        if (data.length === 0) {
          labels.push('No Data');
          quantity.push(100);
        }
        else {
          labels = data.map(item => item.name)
          quantity = data.map(item => item.quantity)
        }

        // const backgroundColor = ['blue', 'lightblue', 'deepskyblue', 'dodgerblue', 'royalblue']
        // const backgroundColor = ['rgb(124, 146, 230)', 'rgb(198, 221, 110)', 'rgb(25, 25, 112)', 'rgb(127, 255, 0)', 'rgb(0, 128, 128)'];
        // const backgroundColor = ['rgb(124, 146, 230)', 'rgb(198, 221, 110)', 'rgb(172, 190, 223)', 'rgb(150, 207, 139)', 'rgb(126, 144, 120)'];
        const backgroundColor = ['rgb(198, 221, 110)', 'rgb(124, 146, 230)', 'rgb(92, 124, 114)', 'rgb(135, 206, 235)', 'rgb(78, 118, 155)', 'rgb(172, 190, 223)'];

        const chartData = {
          labels: labels,
          datasets: [
            {
              data: quantity,
              backgroundColor: backgroundColor,
            },
          ],
        };
        setChartData(chartData)
        setTableData(data)
      })
    }
    else if (props.details.role === "company") {
      const stockalert = axios.get('/prothreshold_c').then((res) => {
        const data = res.data
        let labels = [];
        let quantity = [];
        if (data.length === 0) {
          labels.push('No Data');
          quantity.push(100);
        }
        else {
          labels = data.map(item => item.name)
          quantity = data.map(item => item.quantity)
        }

        // const backgroundColor = ['blue', 'lightblue', 'deepskyblue', 'dodgerblue', 'royalblue']
        const backgroundColor = ['rgb(198, 221, 110)', 'rgb(124, 146, 230)', 'rgb(92, 124, 114)', 'rgb(135, 206, 235)', 'rgb(78, 118, 155)'];
        const chartData = {
          labels: labels,
          datasets: [
            {
              data: quantity,
              backgroundColor: backgroundColor,
            },
          ],
        };
        setChartData(chartData)
        setTableData(data)
      })
    }
    // const stocktable = axios.get('/prothreshold_v').then((res) => {
    //   console.log("Stock Data: ", res.data)
    //   const data = res.data
    //   setTableData(data)
    // })
  }, [])


  const productsWithId = tabledata.map((product) => ({
    ...product,
    id: product._id, // Assigning _id as the id property
  }));

  return (
    <div className="flex" style={{ display: 'flex', flexDirection: 'row', margin: "3rem auto", width: "75%", justifyContent: "space-around" }}>
      <div className='flex-item' style={{
        // border: "2px solid black",
        margin: "0 2em 0 0",
      }}>
        <StockPieChart chartData={chartData} />
      </div>
      <div className='flex-item' style={{
        display: "flex",

        // border: "2px solid blue",
        justifyContent: "top",
      }}>
        {/* <EnhancedTable data={tabledata} /> */}
        <StockAlertTable data={productsWithId} />
      </div>
    </div>

  )
}

export default StockAlert
