import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import useAxios from '../Hooks/UseAxios';

const PaymentSuccess = () => {

    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const axiosInstance = useAxios();
    useEffect(() => {
        axiosInstance.post(`/success-payment?session_id=${sessionId}`)
    },[axiosInstance, sessionId])
    return (
        <div>
            PaymentSuccess
        </div>
    );
};

export default PaymentSuccess;