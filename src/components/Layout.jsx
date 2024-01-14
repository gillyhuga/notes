import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../lib/context/AuthContext';
import { useTheme } from '../lib/context/ThemeContext';
import Loader from './Loader';

const Layout = () => {
    const { user, loading } = useAuth();
    const { theme } = useTheme();

    if (loading) {
        return <Loader />;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white text-black'}`}>
            <Navbar />
            <Sidebar>
                <Outlet />
            </Sidebar>
        </div>
    );
};

export default Layout;
