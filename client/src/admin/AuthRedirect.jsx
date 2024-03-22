import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthRedirect() {
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!sessionStorage.token) {
    //         navigate('/login');
    //     }
    // }, [navigate]);

    return (
        <div>
        </div>
    );
}

export default AuthRedirect;
