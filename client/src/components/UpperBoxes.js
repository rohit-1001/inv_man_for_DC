import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import image1 from '../assets/image_2.png';
import axios from 'axios';
import PropTypes from 'prop-types';
// import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography, Paper } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PointOfSaleSharpIcon from '@mui/icons-material/PointOfSaleSharp';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
 
const UpperBoxes = (props) => {
  const boxStyle = {
    width: '30%',
    // padding: 'px',
    display: 'flex',
    flexDirection: 'column', // Change to column
    alignItems: 'center',
    backgroundColor: 'rgb(0, 104, 252)', // Lighter shade of blue
    color: 'white',
    margin: '10px',
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px"
  };

  const titleStyle = {
    fontWeight: 'bold',
  };

  const contentStyle = {
    marginTop: '10px',
    fontSize: '20px'
  };

  const iconStyle = {
    fontSize: '36px',
  };

  const [data, setData] = useState({
    profit: 0,
    sales: 0,
    tsales: 0
  });

  const getData = async () => {
    if(props.details.role!=='admin'){
      try {
        const response = await axios.post("/getupfields");
        const { profit, sales, tsales } = response.data;
        setData({ profit, sales, tsales });
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Some error occured");
        }
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {/* <div className="row justify-content-center">
        <div className="col-md-6">
          <div style={{ marginBottom: '20px' }}>
            <Box sx={{ border: '1px solid black', padding: '10px', margin: "auto", boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px" }}>
              <div className='d-flex justify-content-center'>
                <div>
                  <div>Total Sales</div>
                  <div className='d-flex align-items-center'>
                    <div>
                      <img src={image1} alt="Image" className="img-fluid" />
                    </div>
                    <div className="ml-2">
                      {data.tsales}
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <Box sx={{ border: '1px solid black', padding: '10px', boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px" }}>
              <div className='d-flex justify-content-center'>
                <div>
                  <div>Profit</div>
                  <div className='d-flex align-items-center'>
                    <div>
                      <img src={image1} alt="Image" className="img-fluid" />
                    </div>
                    <div className="ml-2">
                      {data.profit}
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <Box sx={{ border: '1px solid black', padding: '10px', boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px" }}>
              <div className='d-flex justify-content-center'>
                <div>
                  <div>Sales</div>
                  <div className='d-flex align-items-center'>
                    <div>
                      <img src={image1} alt="Image" className="img-fluid" />
                    </div>
                    <div className="ml-2">
                      {data.sales}
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </div>
        </div>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <Box sx={{ border: '1px solid black', padding: '10px', boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px" }}>
          <div className='d-flex justify-content-center'>
            <div>
              <div>Sales</div>
              <div className='d-flex align-items-center'>
                <div>
                  <img src={image1} alt="Image" className="img-fluid" />
                </div>
                <div className="ml-2">
                  {data.sales}
                </div>
              </div>
            </div>
          </div>
        </Box>
      </div> */}
      <div className="container-fluid pt-4 px-4" style={{
        // border: "2px solid black",
        width: "100%",
      }}>
        <div className="row g-4 flex-column">
          <div className="col-12">
            <div className="text-dark  rounded d-flex align-items-center p-4" style={{ background: "rgb(72, 104, 223, 0.7)", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
              <i className="fa fa-chart-line fa-4x text-tertiary" />
              <div className="ms-4 justify-content-center">
                <p className="mb-2">Total Sales</p>
                <h6 className="mb-0">₹{data.tsales}</h6>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="text-dark  rounded d-flex align-items-center p-4" style={{ background: "rgb(178, 211, 53, 0.7)", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
              <i className="fa fa-chart-bar fa-4x text-tertiary" />
              <div className="ms-4 justify-content-center">
                <p className="mb-2" >Profit</p>
                <h6 className="mb-0">₹{data.profit}</h6>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="text-dark  rounded d-flex align-items-center p-4" style={{ background: "rgb(72, 104, 223, 0.7)", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
              <i className="fa fa-chart-area fa-4x text-tertiary" />
              <div className="ms-4 justify-content-center">
                <p className="mb-2 ">Current Month Sales</p>
                <h6 className="mb-0">₹{data.sales}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default UpperBoxes;
