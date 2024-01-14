import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, getUserLogged } from '../utils/network-data';
import toast from 'react-hot-toast';
import { useAuth } from '../lib/context/AuthContext';
import { useTheme } from '../lib/context/ThemeContext';
import { useLanguage } from '../lib/context/LanguageContext';
import ThemeToggle from '../components/ThemeToggle';
import LanguageSwitcher from '../components/LanguageSwitcher';
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';


const LoginPage = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { user, signIn } = useAuth();
    const { translate } = useLanguage();

    useEffect(() => {
        if (user) {
            navigate('/notes');
        }
    }, [user, navigate]);

    const handleLogin = async (formData) => {
        const { error, data } = await login(formData);
        if (!error) {
            localStorage.setItem('accessToken', data.accessToken);
            const { data: dataUser } = await getUserLogged();
            signIn(dataUser);
            navigate('/notes');
            toast.success('Login Success');
        }
    };

    return (
        <div className={`flex items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}`}>
            <div className="bg-base-100 p-4 rounded-xl shadow-2xl max-w-sm w-full">
                <ThemeToggle />
                <Header title={translate('title')} />
                <LoginForm
                    onLogin={handleLogin}
                    translate={translate}
                />
                <h1 className="font-light mt-5 text-center">
                    {translate('pageLogin.registerDesc')} <Link to="/register" className="text-slate-800 font-bold">{translate('pageLogin.registerLink')}</Link>
                </h1>
                <LanguageSwitcher />
            </div>
        </div>
    );
};

export default LoginPage;
