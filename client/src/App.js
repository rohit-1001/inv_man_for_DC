import "./App.css";
import "./css_files/rohit.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Routes, Route} from "react-router-dom";
// import Navbar from './components/Navbar';
import Home from "./components/Home";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
// import Logout from './components/Logout';
import NotFound from "./components/NotFound";
import Admin from "./components/Admin";
import CDashboard from "./Pages/CDashboard";
import Requests from "./components/Requests";
import AdminLogin from "./components/AdminLogin";
import CProfile from "./Pages/CProfile";
import Orders from "./components/Orders/Orders";
import Products from "./components/Products/Products";
import Navbar from "./components/Navbar";
import Navbar2 from "./components/Navbar2";
import Navbar3 from "./components/Navbar3";
import HomeAbout from "./components/AboutUs/HomeAbout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import OrderHistory from "./components/OrderHistory";
import Marketplace from "./Pages/Marketplace";
import SearchResult from './Pages/SearchResult';
// import { useContext, useReducer } from 'react';
// import {reducer, initialState} from '../reducer/UserReducer'
import axios from 'axios'

// export const context = createContext();

// const DUMMY_ORDERS = [
//   {
//     id: "e1",
//     date: new Date(2021, 7, 14),
//     customer: "Godzilla",
//     saleschannel: "flame cells",
//     count: 34,
//     status: "fail",
//   },
//   {
//     id: "e2",
//     date: new Date(2021, 7, 15),
//     customer: "King Kong",
//     saleschannel: "flame cells",
//     count: 45,
//     status: "pending",
//   },
//   {
//     id: "e3",
//     date: new Date(2022, 7, 16),
//     customer: "Mothra",
//     saleschannel: "fire wings",
//     count: 22,
//     status: "success",
//   },
//   {
//     id: "e4",
//     date: new Date(2020, 7, 17),
//     customer: "Rodan",
//     saleschannel: "inferno sales",
//     count: 30,
//     status: "fail",
//   },
//   {
//     id: "e5",
//     date: new Date(2020, 7, 18),
//     customer: "Gamera",
//     saleschannel: "blaze mart",
//     count: 28,
//     status: "success",
//   },
//   {
//     id: "e6",
//     date: new Date(2022, 7, 19),
//     customer: "Mechagodzilla",
//     saleschannel: "heat deals",
//     count: 40,
//     status: "fail",
//   },
//   {
//     id: "e7",
//     date: new Date(2020, 7, 20),
//     customer: "Anguirus",
//     saleschannel: "lava goods",
//     count: 15,
//     status: "success",
//   },
//   {
//     id: "e8",
//     date: new Date(2020, 7, 21),
//     customer: "Destoroyah",
//     saleschannel: "scorch sales",
//     count: 50,
//     status: "fail",
//   },
//   {
//     id: "e9",
//     date: new Date(2019, 7, 22),
//     customer: "Gigan",
//     saleschannel: "flame mart",
//     count: 37,
//     status: "success",
//   },
//   {
//     id: "e10",
//     date: new Date(2020, 7, 23),
//     customer: "Biollante",
//     saleschannel: "blaze deals",
//     count: 18,
//     status: "success",
//   },
//   {
//     id: "e11",
//     date: new Date(2020, 7, 24),
//     customer: "SpaceGodzilla",
//     saleschannel: "inferno mart",
//     count: 32,
//     status: "fail",
//   },
// ];

// const DUMMY_PRODUCTS = [
//   {
//     id: "p1",
//     date: new Date(2020, 7, 24),
//     vendor: "Adwait",
//     p_name: "Shampoo",
//   },
//   {
//     id: "p2",
//     date: new Date(2020, 8, 15),
//     vendor: "Aanya",
//     p_name: "Conditioner",
//   },
//   {
//     id: "p3",
//     date: new Date(2020, 9, 8),
//     vendor: "Beauty Essentials",
//     p_name: "Soap",
//   },
//   {
//     id: "p4",
//     date: new Date(2020, 10, 3),
//     vendor: "Dental Care Pro",
//     p_name: "Toothbrush",
//   },
//   {
//     id: "p5",
//     date: new Date(2020, 11, 19),
//     vendor: "Luxe Spa",
//     p_name: "Body Lotion",
//   },
//   {
//     id: "p6",
//     date: new Date(2021, 0, 7),
//     vendor: "StyleMasters",
//     p_name: "Hair Gel",
//   },
//   {
//     id: "p7",
//     date: new Date(2021, 1, 2),
//     vendor: "Skincare Solutions",
//     p_name: "Face Wash",
//   },
//   {
//     id: "p8",
//     date: new Date(2021, 2, 12),
//     vendor: "SafeHands",
//     p_name: "Hand Sanitizer",
//   },
//   {
//     id: "p9",
//     date: new Date(2021, 3, 5),
//     vendor: "Groom & Glide",
//     p_name: "Shaving Cream",
//   },
//   {
//     id: "p10",
//     date: new Date(2021, 4, 20),
//     vendor: "Fresh Scent",
//     p_name: "Deodorant",
//   },
// ];

// const Routing = () => {
//   return (

//     );
//   }
function App() {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [role, setRole] = useState("visitor");
  const getRole = async () => {
    const c = await axios.get('/getrole', {
      withCredentials: true
    });
    setRole(c.data.role)
  }
  useEffect(() => {
    getRole()
  }, [])
  return (
    <>
      <div>
        <ToastContainer />
      </div>
      {/* <context.Provider value={{state, dispatch}}> */}
      {role === "visitor" && (
        <>
          <Navbar2 />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route path="/homeabout" element={<HomeAbout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login details={{ setRole }} />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/admin"
              element={<AdminLogin details={{ setRole }} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
      {role === "company" && (
        <>
          <Navbar details={{ role, setRole }} />
          <Routes>
            <Route exact path="/" element={<CDashboard details={{ role }} />} />
            <Route path="/codb" element={<CDashboard details={{ role }} />} />
            <Route path="/copr" element={<CProfile />} />
            <Route path="/orders" element={<Orders details={{ role }} />} />
            <Route
              path="/products"
              element={<Products items={{ role }} />}
            />
            {/* <Route path="/order-history" element={<OrderHistory details={role}/>} /> */}
            <Route path="/requests" element={<Requests />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
      {role === "vendor" && (
        <>
          <Navbar details={{ role, setRole }} />
          <Routes>
            <Route exact path="/" element={<CDashboard details={{ role }} />} />
            <Route path="/codb" element={<CDashboard details={{ role }} />} />
            <Route path="/copr" element={<CProfile />} />
            <Route path="/orders" element={<Orders details={{ role }} />} />
            <Route
              path="/products"
              element={<Products items={{ role }} />}
            />
            {/* <Route path="/order-history" element={<OrderHistory details={{ role }} />} /> */}
            <Route path="/requests" element={<Requests />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path='/search/:id' element={<SearchResult></SearchResult>}></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}

      {role === "admin" && (
        <>
          <Navbar3 details={{ setRole }} />
          <Routes>
            <Route exact path="/" element={<Admin details={{ role }}/>} />
            <Route path="/adminDashboard" element={<Admin details={{ role }}/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
      {/* </context.Provider>       */}
    </>
  );
}
// const Routing = () => {
//   return (
//     <Routes>
//       <Route exact path="/" element={<Home />} />
//       <Route path="/homeabout" element={<HomeAbout />} />

//       <Route path="/home" element={<Home />} />
//       <Route path="/about" element={<About />} />
//       <Route path="/contact" element={<Contact />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/codb" element={<CDashboard />} />
//       <Route path="/copr" element={<CProfile />} />
//       <Route path="/admin" element={<Admin />} />
//       <Route path="/orders" element={<Orders items={DUMMY_ORDERS} />} />
//       <Route path="/products" element={<Products items={DUMMY_PRODUCTS} />} />
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }
// function App() {
//   // const [state, dispatch] = useReducer(reducer, initialState);
//   return (
//     <>
//       {/* <context.Provider value={{state, dispatch}}> */}
//       <Routing />
//       {/* </context.Provider>       */}
//     </>
//   );
// }

export default App;
