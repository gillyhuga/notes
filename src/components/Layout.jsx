import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Navigate, Outlet } from 'react-router-dom';
import { FaPlusSquare, FaStickyNote, FaArchive } from 'react-icons/fa';
import { useAuth } from '../lib/context/authContext';
import Loader from './Loader';

const sidebarItems = [
    { key: 'createNotes', path: '/create', label: 'Create Notes', icon: <FaPlusSquare /> },
    { key: 'notes', path: '/notes', label: 'Notes', icon: <FaStickyNote /> },
    { key: 'archive', path: '/archive', label: 'Archive', icon: <FaArchive /> },
];

const Layout = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <Loader/>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div>
            <Navbar />
            <Sidebar sidebarItems={sidebarItems}>
                <Outlet/>
            </Sidebar>
        </div>
    );
};

export default Layout;
