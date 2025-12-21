import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { User } from 'lucide-react';
import { Navigate } from 'react-router';
import Loading from './Loading';

const PrivateRoutes = ({children}) => {
    const { user,loading,roleloading } = useContext(AuthContext)
    
    if (loading || roleloading) {
        return <Loading></Loading>
    }
    if (!user) {
        return <Navigate to={'/login'}></Navigate>
    }
  return children
};

export default PrivateRoutes;