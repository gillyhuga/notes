import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, getUserLogged } from '../utils/network-data';
import toast from 'react-hot-toast';
import { useAuth } from '../lib/context/AuthContext';
import useInput from '../lib/hooks/useInput';
import { useTheme } from '../lib/context/ThemeContext';
import { useLanguage } from '../lib/context/LanguageContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const LoginPage = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const { user, signIn } = useAuth();
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');
    const { language, toggleLanguage, translate } = useLanguage();

    useEffect(() => {
        if (user) {
            navigate('/notes');
        }
    }, [user, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = { email, password };
        try {
            const { error, data } = await login(formData);
            if (!error) {
                localStorage.setItem('accessToken', data.accessToken);
                const { data: dataUser } = await getUserLogged();
                signIn(dataUser);
                navigate('/notes');
            }
        } catch (error) {
            toast.error('Error during login:', error);
        }
    };

    return (
        <div className={`flex items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}`}>
            <div className="bg-base-100 p-4 rounded-xl shadow-2xl max-w-sm w-full">
                <div className='text-right'>
                    <button
                        className="btn btn-square btn-outline btn-sm btn-primary text-center"
                        onClick={toggleTheme}
                    >
                        {theme === 'dark' ? (
                            <>
                                <FaSun />
                            </>
                        ) : (
                            <>
                                <FaMoon />
                            </>
                        )}
                    </button>
                </div>

                <img
                    src="../public/vite.svg"
                    alt="Personal Notes Logo"
                    className="mx-auto mb-4"
                    style={{ width: '60px', height: 'auto' }}
                />
                <h1 className="text-2xl font-light mb-4 text-center"> {translate('title')}</h1>
                <form className="space-y-4" onSubmit={handleLogin}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">{translate('pageLogin.email')}</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder={translate('pageLogin.email')}
                            className="input input-bordered"
                            required
                            value={email}
                            onChange={onEmailChange}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">{translate('pageLogin.password')}</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder={translate('pageLogin.password')}
                            className="input input-bordered"
                            required
                            value={password}
                            onChange={onPasswordChange}
                        />
                    </div>
                    <div className="form-control">
                        <button type="submit" className="btn btn-primary w-full">
                            {translate('pageLogin.login')}
                        </button>
                    </div>
                </form>
                <h1 className="font-light mt-5 text-center">
                    {translate('pageLogin.registerDesc')} <Link to="/register" className="text-blue-500">{translate('pageLogin.registerLink')}</Link>
                </h1>
                <div className="font-light mt-5 text-center">
                    <a
                        className={`cursor-pointer ${language === 'id' ? 'text-blue-500 font-bold' : 'text-gray-500'}`}
                        onClick={() => language !== 'id' && toggleLanguage('id')}
                        style={{ pointerEvents: language === 'id' ? 'none' : 'auto' }}
                    >
                        ID
                    </a>
                    {' | '}
                    <a
                        className={`cursor-pointer ${language === 'en' ? 'text-blue-500 font-bold' : 'text-gray-500'}`}
                        onClick={() => language !== 'en' && toggleLanguage('en')}
                        style={{ pointerEvents: language === 'en' ? 'none' : 'auto' }}
                    >
                        EN
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
