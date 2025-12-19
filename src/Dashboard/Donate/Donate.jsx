import React, { useContext } from 'react';
import useAxios from '../../Hooks/UseAxios';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useNavigate } from 'react-router';

const Donate = () => {
    const axiosInstance = useAxios();
    const { user } = useContext(AuthContext);
    const navigate=useNavigate()
    const handleCheckout = (e) => {
        e.preventDefault();
        const donateAmount = e.target.donateAmount.value;
        const donorEmail = user?.email;
        const donarName = user?.displayName;
        const formData = {
            donateAmount,
            donorEmail,
            donarName
        }
        axiosInstance.post('/create-payment-checkout', formData)
            .then(res => {
                console.log(res.data);
                window.location.href=res.data.url
            
        })
    }
    return (
        <div>
            <form onSubmit={handleCheckout} className='flex justify-center items-center min-h-screen'>
                <input name='donateAmount' type="text" placeholder='Type here' className='input' />
                <button className='btn btn-primary' type='submit'>Donate</button>
            </form>
       </div>
    );
};

export default Donate;