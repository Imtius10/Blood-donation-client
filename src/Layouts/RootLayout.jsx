import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Componenet/Navbar';
import Footer from '../Componenet/Footer';

const RootLayout = () => {
    return (
        <div className='flex flex-col min-h-screen max-w-8xl mx-auto'>
            <Navbar></Navbar>
            <div className='flex-grow pt-16'> {/* Added pt-16 here */}
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;