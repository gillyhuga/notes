import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ sidebarItems, children }) => (
    <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        {children && (
            <div className="drawer-content px-4">
                {children}
            </div>
        )}
        <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-60 min-h-full space-y-2 bg-base-100">
                {sidebarItems.map(item => (
                    <li key={item.path}>
                        <NavLink to={item.path} className="text-sm font-medium text-gray-700">
                            {item.icon && <span className="mr-1">{item.icon}</span>}
                            {item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

Sidebar.propTypes = {
    sidebarItems: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            icon: PropTypes.node,
        })
    ).isRequired,
    children: PropTypes.node,
};

export default Sidebar;