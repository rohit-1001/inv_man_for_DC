import React from 'react'
import UpperBoxes from '../components/UpperBoxes';
import StockAlert from '../components/StockAlert';
import Compchta from '../components/Compchta';
import { useEffect } from 'react';
// import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';

const CDashboard = (props) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    document.title = 'Sangrah | Dashboard';
  }, [])
  // const chartData = {
  //   labels: ['Product A', 'Product B', 'Product C'],
  //   datasets: [
  //     {
  //       label: 'Selling Price',
  //       data: [50, 60, 40],
  //       backgroundColor: 'rgba(54, 162, 235, 0.2)', // A shade of blue
  //       borderColor: 'rgba(54, 162, 235, 1)', // A shade of blue
  //       borderWidth: 1,
  //     },
  //     {
  //       label: 'Manufacturing Price',
  //       data: [30, 40, 25],
  //       backgroundColor: 'rgba(75, 192, 192, 0.2)', // Another shade of blue
  //       borderColor: 'rgba(75, 192, 192, 1)', // Another shade of blue
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  const name = "Prices";
  const parentContainerStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    height: "fit-content",
    margin: "auto",
    paddingBottom: "2.5em",

  };

  const chartContainerStyle = {
    margin: "auto",
    padding: "1em 0em 0 6em",
    // border: "1px solid black",
    width: "fit-content"
  };
  return (
    <div style={{
      width: "100%",
      backgroundColor: "rgb(244, 244, 245)"
    }}>
      <br></br>
      <div style={parentContainerStyle}>
        <div>
          <UpperBoxes details={{ role: props.details.role }} />
        </div>
        <div style={chartContainerStyle}>
          {/* <BarChart data={chartData} name={name} /> */}
          <LineChart details={{ role: props.details.role}} />
        </div>
      </div>
      <StockAlert details={{ role: props.details.role }} />
      <Compchta details={{ role: props.details.role }} />
    </div>
  )
}

export default CDashboard
