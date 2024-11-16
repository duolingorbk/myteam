import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user.type !== 'admin') {
            return <Navigate to="/" replace />;
        }
        return element
        
    } catch (error) {
        return <Navigate to="/" replace />;
    }
};

export default ProtectedRoute;