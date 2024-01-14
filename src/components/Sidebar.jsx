import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../lib/context/ThemeContext';
import { FaPlusSquare, FaStickyNote, FaArchive } from 'react-icons/fa';
import { useLanguage } from '../lib/context/LanguageContext';

const Sidebar = ({ children }) => {
    const { translate } = useLanguage();
    const { theme } = useTheme();
    const sidebarItems = [
        { key: 'createNotes', path: '/create', label: translate('sidebar.create'), icon: <FaPlusSquare /> },
        { key: 'notes', path: '/notes', label: translate('sidebar.notes'), icon: <FaStickyNote /> },
        { key: 'archive', path: '/archive', label: translate('sidebar.archive'), icon: <FaArchive /> },
    ];

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            {children && (
                <div className="drawer-content px-4">
                    {children}
                </div>
            )}
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className={`menu p-4 w-60 min-h-full space-y-2 ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}`} >
                    {sidebarItems.map(item => (
                        <li key={item.path}>
                            <NavLink to={item.path} className="text-sm font-medium">
                                {item.icon && <span className="mr-1">{item.icon}</span>}
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

Sidebar.propTypes = {
    children: PropTypes.node,
};

export default Sidebar;
