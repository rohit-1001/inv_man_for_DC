import { React, useState } from 'react'
import TopSellingChart from './TopSellingChart'
import TopSellingTable from './TopSellingTable'
import axios from 'axios'
import { useEffect } from 'react';
const Compchta = (props) => {
    const sampleData = [
        {
            orderId: '1',
            name: 'Salt',
            quantity: 10,
            alertAmount: 100,
        },
        {
            orderId: '2',
            name: 'Sugar',
            quantity: 15,
            alertAmount: 150,
        },
        {
            orderId: '3',
            name: 'Wheat',
            quantity: 8,
            alertAmount: 80,
        },
        {
            orderId: '4',
            name: 'Humans',
            quantity: 20,
            alertAmount: 200,
        },
        {
            orderId: '5',
            name: "Rice",
            quantity: 12,
            alertAmount: 120,
        },
    ];
    const initialChartData = {
        labels: sampleData.map(item => item.name),
        datasets: [
            {
                data: sampleData.map(item => item.quantity),
                backgroundColor: ['blue', 'lightblue', 'deepskyblue', 'dodgerblue', 'royalblue'],
            },
        ],
    };

    const [chartData, setChartData] = useState(initialChartData);
    const [tabledata, setTableData] = useState([])

    useEffect(() => {
        if (props.details.role === "vendor") {
            const stockalert = axios.get('/topselling_v').then((res) => {
                const data = res.data
                const top5Products = data.top5Products;
                const others = data.others;
                // const labels = top5Products.map(item => item.name);
                // labels.push('Others');

                // // Create data for the chart, including the sales of "Others"
                // const quantity = top5Products.map(item => item.sales);
                // quantity.push(others);
                let labels = [];
                let quantity = [];
                if (data.top5Products.length === 0) {
                    labels.push('No Data');
                    quantity.push(100);

                }
                else {
                    // const labels = top5Products.map(item => item.name);
                    // labels.push('Others');
                    // const quantity = top5Products.map(item => item.sales);
                    // quantity.push(others);

                    labels = top5Products.map(item => item.name);
                    labels.push('Others');
                    quantity = top5Products.map(item => item.sales);
                    quantity.push(others);
                }
                // const backgroundColor = ['blue', 'lightblue', 'deepskyblue', 'dodgerblue', 'royalblue']
                // const backgroundColor = ['rgb(124, 146, 230)', 'rgb(198, 221, 110)', 'rgb(25, 25, 112)', 'rgb(127, 255, 0)', 'rgb(0, 128, 128)'];
                // const backgroundColor = ['rgb(124, 146, 230)', 'rgb(198, 221, 110)', 'rgb(172, 190, 223)', 'rgb(150, 207, 139)', 'rgb(126, 144, 120)'];
                const backgroundColor = ['rgb(124, 146, 230)', 'rgb(198, 221, 110)', 'rgb(92, 124, 114)', 'rgb(135, 206, 235)', 'rgb(78, 118, 155)', 'rgb(0, 128, 128)'];

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
                setTableData(top5Products)
            })
        }
        else if (props.details.role === "company") {
            const stockalert = axios.get('/topselling_c').then((res) => {
                const data = res.data
                const top5Products = data.top5Products;
                const others = data.others;
                let labels = [];
                let quantity = [];
                if (data.top5Products.length === 0) {
                    labels.push('No Data');
                    quantity.push(100);

                }
                else {
                    // const labels = top5Products.map(item => item.name);
                    // labels.push('Others');
                    // const quantity = top5Products.map(item => item.sales);
                    // quantity.push(others);

                    labels = top5Products.map(item => item.name);
                    labels.push('Others');
                    quantity = top5Products.map(item => item.sales);
                    quantity.push(others);
                }
                // Create data for the chart, including the sales of "Others"

                // const backgroundColor = ['blue', 'lightblue', 'deepskyblue', 'dodgerblue', 'royalblue']
                // const backgroundColor = ['rgb(124, 146, 230)', 'rgb(198, 221, 110)', 'rgb(25, 25, 112)', 'rgb(127, 255, 0)', 'rgb(0, 128, 128)'];
                // const backgroundColor = ['rgb(124, 146, 230)', 'rgb(198, 221, 110)', 'rgb(172, 190, 223)', 'rgb(150, 207, 139)', 'rgb(126, 144, 120)'];
                const backgroundColor = ['rgb(124, 146, 230)', 'rgb(198, 221, 110)', 'rgb(92, 124, 114)', 'rgb(135, 206, 235)', 'rgb(78, 118, 155)'];

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
                setTableData(top5Products)
            })
        }


    }, [])



    const productsWithId = tabledata.map((product) => ({
        ...product,
        id: product._id, // Assigning _id as the id property
    }));


    return (
        <div>
            <div className="flex" style={{ display: 'flex', flexDirection: 'row', margin: "3rem auto", width: "75%", justifyContent: "space-around" }}>
                <div className='flex-item' style={{
                    // border: "2px solid black"
                }}>
                    {/* <EnhancedTable data={sampleData} /> */}
                    <TopSellingTable data={{ productsWithId, role: props.details.role }} />
                </div>
                <div className='flex-item' style={{
                    display: "flex",
                    // border: "2px solid blue",
                    justifyContent: "top",
                    margin: "0 0 0 2em"
                }}>
                    <TopSellingChart chartData={chartData} />

                </div>
            </div>
        </div>
    )
}

export default Compchta