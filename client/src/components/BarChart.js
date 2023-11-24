import React from 'react';
import { Bar } from 'react-chartjs-2';

function BarChart({ data, name }) {
    // Define an array of custom colors
    const customColors = [
        'rgb(72, 104, 223, 0.7)',
        'rgb(178, 211, 53, 0.7)',
        // Add more colors here for additional datasets
    ];

    // Map your data.datasets and assign colors to them
    const datasetsWithColors = data.datasets.map((dataset, index) => ({
        ...dataset,
        backgroundColor: customColors[index % customColors.length],
    }));

    // Create a modified data object with colors
    const modifiedData = {
        ...data,
        datasets: datasetsWithColors,
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h3 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: "20px 0 0 0" }}>{name}</h3>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: "20px 0 0 0" }}>
                <div style={{ width: '600px' }}>
                    <Bar
                        data={modifiedData}
                        options={{
                            scales: {
                                x: {
                                    beginAtZero: true,
                                },
                                y: {
                                    beginAtZero: true,
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default BarChart;
