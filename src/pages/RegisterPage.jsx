import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../utils/network-data';
import toast from 'react-hot-toast';
import { useAuth } from '../lib/context/AuthContext';
import { useTheme } from '../lib/context/ThemeContext';
import { useLanguage } from '../lib/context/LanguageContext';
import ThemeToggle from '../components/ThemeToggle';
import LanguageSwitcher from '../components/LanguageSwitcher';
import RegisterForm from '../components/RegisterForm';
import Header from '../components/Header';

const RegisterPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { theme } = useTheme();
    const { translate } = useLanguage();

    useEffect(() => {
        if (user) {
            navigate('/notes');
        }
    }, [user, navigate]);

    const handleRegister = async (formData) => {
        const { error } = await register(formData);

        if (!error) {
            toast.success('Registration successful!');
            navigate('/');
        }
    };

    return (
        <div className={`flex items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}`}>
            <div className="bg-base-100 p-4 rounded-xl shadow-2xl max-w-sm w-full">
                <ThemeToggle />
                <Header title={translate('title')}/>
                <RegisterForm
                    onRegister={handleRegister}
                    translate={translate}
                />
                <h1 className="font-light mt-5 text-center">
                    {translate('pageRegister.loginDesc')} <Link to="/" className="text-slate-800 font-bold">{translate('pageRegister.loginLink')}</Link>
                </h1>
                <LanguageSwitcher />
            </div>
        </div>
    );
};

export default RegisterPage;
