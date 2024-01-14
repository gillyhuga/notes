import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineTranslate } from 'react-icons/md';
import { useAuth } from '../lib/context/authContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <label htmlFor="my-drawer-2" className="btn btn-ghost btn-circle btn-primary drawer-button lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                </label>
                <Link to="/" className="btn btn-ghost text-xl">Personal Notes</Link>
            </div>
            <div className="navbar-end">
                <button className="btn btn-square hidden sm:flex">
                    <MdOutlineTranslate size={25} />
                </button>
                <button className="btn btn-square mx-4 hidden sm:flex">
                    <MdOutlineTranslate size={25} />
                </button>
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div className="avatar placeholder" tabIndex={0} role="button">
                            <div className="bg-neutral text-neutral-content rounded-full w-12">
                                <span>A</span>
                            </div>
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                            <li className="sm:hidden">
                                <a>
                                    Translate
                                </a>
                            </li>
                            <li className="sm:hidden">
                                <a>
                                    Theme
                                </a>
                            </li>
                            <li>
                                <a onClick={handleLogout}>
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Navbar;
