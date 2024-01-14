import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineTranslate, MdOutlineBrightness2, MdOutlineWbSunny } from 'react-icons/md';
import { useAuth } from '../lib/context/AuthContext';
import { useTheme } from '../lib/context/ThemeContext';
import { useLanguage } from '../lib/context/LanguageContext';


const Navbar = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { user, logout } = useAuth();
    const { toggleTheme } = useTheme();
    const { translate, toggleLanguage } = useLanguage();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className={`navbar ${theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white text-black'}`}>
            <div className="navbar-start">
                <label htmlFor="my-drawer-2" className="btn btn-ghost btn-circle btn-primary drawer-button lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                </label>
                <Link to="/" className="btn btn-ghost text-xl">{translate('title')}</Link>
            </div>
            <div className="navbar-end">
                <button className="btn btn-square hidden sm:flex" onClick={toggleLanguage}>
                    <MdOutlineTranslate size={25} />
                </button>
                <button className="btn btn-square mx-4 hidden sm:flex" onClick={toggleTheme}>
                    {theme === 'dark' ? (
                        <MdOutlineBrightness2 size={25} />
                    ) : (
                        <MdOutlineWbSunny size={25} />
                    )}
                </button>
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div className="avatar placeholder" tabIndex={0} role="button">
                            <div className="bg-neutral text-neutral-content rounded-full w-12">
                                <span>A</span>
                            </div>
                        </div>
                        <ul tabIndex={0} className={`dropdown-content z-[1] menu p-2 shadow rounded-box w-52 mt-4 ${theme === 'dark' ? 'bg-slate-800' : 'bg-white '}`} >
                            <li className="sm:hidden">
                                <a onClick={toggleLanguage}>
                                    {translate('navbar.translate')}
                                </a>
                            </li>
                            <li className="sm:hidden">
                                <a onClick={toggleTheme}>
                                    {translate('navbar.theme')}
                                </a>
                            </li>
                            <li>
                                <a onClick={handleLogout}>
                                    {translate('navbar.logout')}
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
