import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { FaPlusSquare, FaStickyNote, FaArchive } from 'react-icons/fa';

const sidebarItems = [
    { key: 'createNotes', path: '/create', label: 'Create Notes', icon: <FaPlusSquare /> },
    { key: 'notes', path: '/notes', label: 'Notes', icon: <FaStickyNote /> },
    { key: 'archive', path: '/archive', label: 'Archive', icon: <FaArchive /> },
];

const Layout = () => {
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
