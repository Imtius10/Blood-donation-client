import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { User } from 'lucide-react';
import { Navigate } from 'react-router';

const PrivateRoutes = ({children}) => {
    const { user,loading,roleloading } = useContext(AuthContext)
    
    if (loading || roleloading) {
        return <p>Loading................</p>
    }
    if (!user) {
        return <Navigate to={'/login'}></Navigate>
    }
  return children
};

export default PrivateRoutes;