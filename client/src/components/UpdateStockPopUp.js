import React from "react";
import axios from "axios";
import { Button } from "@mui/material";
import "../css_files/Popup.css";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const UpdateStockPopUp = ({ details }) => {
  const handleClose = async () => {
    const c = await axios.get("/getallproducts", {
      withCredentials: true,
    });
    details.setAllProducts(c.data);

    if (details.currInput === "") {
      details.setFilteredProducts([]);
      return;
    } else {
      const filPro = details.allProducts.filter((pro) => {
        const regex = new RegExp(details.currInput, "i");
        return pro.name.match(regex) || pro.pid.match(regex);
      });
      details.setFilteredProducts(filPro);
    }

    details.setIsVisible(false);
  };

  const updateStock = async (event) => {
    event.preventDefault();
    const stock = event.target.stock.value;
    const newquantity = event.target.newquantity.value;
    const name = event.target.name.value
    const desc = event.target.desc.value
    const category = event.target.category.value
    let manufacturer
    if (details.role === "vendor") {
      manufacturer = event.target.manufacturer.value
    }
    else {
      manufacturer = " "
    }
    const threshold = event.target.threshold.value
    const s_price = event.target.s_price.value
    const c_price = event.target.c_price.value

    if (stock === "add") {
      let c;
      try {
        c = await axios.post("/addstock", {
          quantity: newquantity,
          pid: details.pid,
          name,
          desc,
          category,
          manufacturer,
          threshold,
          s_price,
          c_price
        });

        if (c.status === 200) {
          await handleClose();
          toast.success(c.data.message);
        } else {
          toast.error(c.data.error);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Some error occured");
        }
      }
    } else if (stock === "subtract") {
      try {
        const c = await axios.post("/subtractstock", {
          quantity: newquantity,
          pid: details.pid,
          name,
          desc,
          category,
          manufacturer,
          threshold,
          s_price,
          c_price
        });

        if (c.status === 200) {
          await handleClose();
          toast.success(c.data.message);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Some error occured");
        }
      }
    }
  };

  return (
    <>
      <div className="popup-container">
        <div className="popup-content">
          <div className="popup-header">
            <h2>Update Stock</h2>
            <Button color="error" variant="outlined" onClick={handleClose}>Close</Button>
          </div>
          <form onSubmit={updateStock}>
            <div className="mb-2 row">
              <div className="mb-2 row">
                <div className="col-auto">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    value="Product ID "
                  />
                </div>
                <div className="col-auto">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Product ID"
                    value={details.pid}
                    readOnly
                    required
                  />
                </div>
              </div>
              <div className="mb-2 row">
                <div className="col-auto">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    value="Product Name "
                  />
                </div>
                <div className="col-auto">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Product Name"
                    defaultValue={details.name}
                    name="name"
                    required
                  />
                </div>
              </div>
              <div className="mb-2 row">
                <div className="col-auto">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    value="Category "
                  />
                </div>
                <div className="col-auto">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Category"
                    defaultValue={details.category}
                    name="category"
                    required
                  />
                </div>
              </div>
              <div className="mb-2 row">
                <div className="col-auto">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    value="Quantity "
                  />
                </div>
                <div className="col-auto">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Quantity"
                    value={details.quantity}
                    readOnly
                    required
                  />
                </div>
              </div>
              {details.role === "vendor" ? (
                <div className="mb-2 row">
                  <div className="col-auto">
                    <input
                      type="text"
                      readOnly
                      className="form-control-plaintext"
                      value="Manufacturer "
                    />
                  </div>
                  <div className="col-auto">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Manufacturer"
                      defaultValue={details.manufacturer}
                      name="manufacturer"
                      required
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="mb-2 row">
                <div className="col-auto">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    value="Description "
                  />
                </div>
                <div className="col-auto">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    defaultValue={details.desc}
                    name="desc"
                    required
                  />
                </div>
              </div>
              <div className="mb-2 row">
                <div className="col-auto">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    value="Threshold "
                  />
                </div>
                <div className="col-auto">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Threshold"
                    defaultValue={details.threshold}
                    name="threshold"
                    required
                  />
                </div>
              </div>
              <div className="mb-2 row">
                <div className="col-auto">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    value="Selling Price "
                  />
                </div>
                <div className="col-auto">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Selling Price"
                    defaultValue={details.s_price}
                    name="s_price"
                    required
                  />
                </div>
              </div>
              <div className="mb-2 row">
                <div className="col-auto">
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    value="Cost Price "
                  />
                </div>
                <div className="col-auto">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Cost Price"
                    defaultValue={details.c_price}
                    name="c_price"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-auto mt-3">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className="form-check" style={{ paddingLeft: "10px" }}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="stock"
                    id="flexRadioDefault1"
                    value="add"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Add Stock
                  </label>
                </div>
                <div className="form-check" style={{ paddingLeft: "50px" }}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="stock"
                    id="flexRadioDefault2"
                    value="subtract"
                    defaultChecked
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Subtract Stock
                  </label>
                </div>
              </div>
              <div
                style={{ display: "flex", margin: "5px", flexDirection: "row" }}
              >
                <div style={{ display: "flex" }}>
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"
                    value="Enter Quantity"
                  />
                  <div className="col-auto">
                    <input
                      type="number"
                      name="newquantity"
                      className="form-control"
                      placeholder="Quantity"
                      defaultValue={0}
                    />
                  </div>
                </div>
              </div>
              <div className="align-self-center">
                <button
                  className="btn btn-success"
                  type="submit"
                  style={{
                    display: "flex",
                    margin: "auto",
                    marginTop: "10px",
                  }}

                >
                  Update Stock
                </button>
              </div>
              <div className="col-auto"></div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateStockPopUp;
