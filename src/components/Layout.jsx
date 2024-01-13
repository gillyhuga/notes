
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { FaPlusSquare, FaStickyNote, FaArchive } from 'react-icons/fa';

const sidebarItems = [
    { key: 'createNotes', path: '/create', label: 'Create Notes', icon: <FaPlusSquare /> },
    { key: 'notes', path: '/notes', label: 'Notes', icon: <FaStickyNote /> },
    { key: 'archive', path: '/archive', label: 'Archive', icon: <FaArchive /> },
];

const Layout = ({ title, children }) => {

    useEffect(() => {
        return () => {
            document.title = title;
        };
    }, [title]);

    return (
        <div>
            <Navbar />
            <Sidebar sidebarItems={sidebarItems}>{children}</Sidebar>
        </div>
    );
};

Layout.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Layout;
