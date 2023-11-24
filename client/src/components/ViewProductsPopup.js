import React from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import "../css_files/Popup.css";

const ViewProductsPopup = ({ details }) => {
  const handleClose = () => {
    details.setIsVisible(false);
  };

  return (
    <div className="popup-container">
        <div className="popup-content">
          <div className="popup-header">
            <h2>Products</h2>
            <Button onClick={handleClose}>Close</Button>
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ textAlign: "center" }}>
                    Product ID
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    Product Name
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    Quantity
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    Category
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {details.products.map((product) => (
                  <TableRow key={product.pid}>
                    <TableCell style={{ textAlign: "center" }}>
                      {product.pid}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {product.name}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {product.quantity}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {product.category}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
    </div>
  );
};

export default ViewProductsPopup;
