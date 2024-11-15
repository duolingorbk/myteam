import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ privateRoutes }) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user.type !== 'admin') {
            return <Navigate to="/" replace />;
        }
        return privateRoutes
        
    } catch (error) {
        return <Navigate to="/" replace />;
    }
};

export default ProtectedRoute;