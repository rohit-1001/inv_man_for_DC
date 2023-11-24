// import React, {useEffect} from 'react'
// import {useNavigate} from 'react-router-dom'
// import axios from 'axios'

// const Logout = () => {
//     const navigate = useNavigate()
//     const userLogout = async () => {
//         try {
//             const res = await axios.post('/userlogout', {
//                 withCredentials : true
//             })
    
//             if(res.status===200){
//                 window.alert("User logged out successfully")
//                 navigate('/login')
//             }
//         } catch (error) {
//             window.alert("Some error occured")
//         }
//     }
//     useEffect(() => {
//         const val = window.confirm("Are you sure, You wish to logout?")
//         if(val===true){
//             userLogout()
//         }
//         else{
//             window.alert("Logging out cancelled")
//         }
//     }, [])
//   return (
//     <>
//         <h1>Oops! Logout?</h1>
//     </>
//   )
// }

// export default Logout
