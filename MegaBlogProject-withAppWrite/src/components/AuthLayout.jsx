import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Protected({children, authentication=true}) {

    const navigate = useNavigate();
    const authStatus = useSelector(state => state.auth.status);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        /**
            in this we are considering authStatus as single source of truth.....
            we can also do this as ...
            if(authStatus !== true) {
                navigate("/login");
            }
            else if(authStatus === true) {
                navigate("/");
            }
        */


        if(authentication && authStatus !== authentication) {
            // when user is not authenticated...
            navigate("/login");
        }
        else if(!authentication && authStatus !== authentication) {
            // when user is authenticated i.e.(authStatus === true)...
            navigate("/"); // this is for navigating to home page....
        }
        setLoading(false);
    }, [authStatus,authentication,navigate]);

    return loading ? <h1>Loading...</h1> : <>{children}</>
}
