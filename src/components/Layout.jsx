import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Navigate, Outlet } from 'react-router-dom';
import { FaPlusSquare, FaStickyNote, FaArchive } from 'react-icons/fa';
import { useAuth } from '../lib/context/AuthContext';
import { useTheme } from '../lib/context/ThemeContext';
import Loader from './Loader';

const sidebarItems = [
    { key: 'createNotes', path: '/create', label: 'Create Notes', icon: <FaPlusSquare /> },
    { key: 'notes', path: '/notes', label: 'Notes', icon: <FaStickyNote /> },
    { key: 'archive', path: '/archive', label: 'Archive', icon: <FaArchive /> },
];

const Layout = () => {
    const { user, loading } = useAuth();
    const { theme } = useTheme();

    if (loading) {
        return <Loader/>;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className={`h-screen ${theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white text-black'}`}>
            <Navbar />
            <Sidebar sidebarItems={sidebarItems}>
                <Outlet/>
            </Sidebar>
        </div>
    );
};

export default Layout;
