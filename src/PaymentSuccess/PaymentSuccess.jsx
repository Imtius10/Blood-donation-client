import { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../Hooks/UseAxiosSecure";

const PaymentSuccess = () => {
    const [params] = useSearchParams();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const session_id = params.get("session_id");

        if (session_id) {
            axiosSecure.post(`/success-payment?session_id=${session_id}`);
        }
    }, [params, axiosSecure]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <h2 className="text-3xl font-bold text-green-600">
                ✅ Payment Successful!
            </h2>
        </div>
    );
};

export default PaymentSuccess;
