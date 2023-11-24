import React from 'react'
import { useEffect, useState } from 'react';
import { Container, Grid, Paper, Avatar, Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import axios from "axios";
const OrderHistory = (props) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    document.title = 'Sangrah | Orders2';
  }, [])
  const pastOrders = [
    { orderID: 1, productName: 'Product A', dateOrdered: '2023-09-24', quantity: 10 },
    { orderID: 2, productName: 'Product B', dateOrdered: '2023-09-23', quantity: 5 },
    { orderID: 3, productName: 'Product C', dateOrdered: '2023-09-22', quantity: 8 },
  ];
  return (
    <>
      <br></br>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Company Profile */}

          {/* Past Orders */}
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h4" style={{ marginBottom: '20px' }}>{props.details.role === "vendor" ? "Raised Orders" : "Received Orders"} </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Order ID</TableCell>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Date Ordered</TableCell>
                      <TableCell>Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pastOrders.map((order) => (
                      <TableRow key={order.orderID}>
                        <TableCell>{order.orderID}</TableCell>
                        <TableCell>{order.productName}</TableCell>
                        <TableCell>{order.dateOrdered}</TableCell>
                        <TableCell>{order.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );

}
export default OrderHistory;