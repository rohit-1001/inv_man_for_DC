import React from 'react'
import { GoogleLogout } from 'react-google-login'
const clientId = "114263541606-9lf0mrh7gl51q7skf8d2ja8rq4rqr4pe.apps.googleusercontent.com"

const Logout2 = () => {

    const onSuccess = (res) => {
        console.log('[Logout Success]');
    }

    return (
        <div id="signOutButton">
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            >
            </GoogleLogout>

        </div>
    )
}

export default Logout2
