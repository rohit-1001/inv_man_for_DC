import React from 'react';
import { GoogleLogin } from 'react-google-login';
import Cookies from 'js-cookie';
import { useState } from 'react';
const clientId = "YOUR_CLIENT_ID"; // Replace with your Google client ID

const Login2 = () => {
    const [userClickedLogin, setUserClickedLogin] = useState(false);
    const onSuccess = (res) => {
        console.log('[Login Success] currentUser:', res.profileObj);

        const token = res.tokenId;
        if (!userClickedLogin) {
            setUserClickedLogin(true);
        }

        if (userClickedLogin) {


            // Create the JSON data in the desired format
            const jsonData = {
                token: token,
                role: 'admin',
                email: res.profileObj.email,
            };

            // Convert the JSON data to a string and add the 'j:' prefix
            const cookieValue = `j:${JSON.stringify(jsonData)}`;

            // Set the cookie
            Cookies.set('inv_man', cookieValue, { expires: 7 }); // Expires in 7 days

            // Redirect to the admin dashboard
            window.location.href = '/adminDashboard';
        }
    }

    const onFailure = (res) => {
        console.log('[Login Failed] res:', res);
    }

    return (
        <div style={{
            // border: "2px solid red",
            width: "50%",
            margin: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <GoogleLogin
                clientId={clientId}
                buttonText="Sign In"
                onSuccess={onSuccess}
                onFailure={onFailure}
                style={{ marginTop: '100px' }}
                isSignedIn={true}
            >
            </GoogleLogin>
        </div>
    )
}

export default Login2;
