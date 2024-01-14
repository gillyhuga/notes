import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../utils/network-data';
import toast from 'react-hot-toast';
import { useAuth } from '../lib/context/AuthContext';
import useInput from '../lib/hooks/useInput';
import { useTheme } from '../lib/context/ThemeContext';
import { useLanguage } from '../lib/context/LanguageContext';

const RegisterPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { theme } = useTheme();
    const [name, onNameChange] = useInput('');
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');
    const [confirmPassword, onConfirmPasswordChange] = useInput('');
    const { translate } = useLanguage();

    useEffect(() => {
        if (user) {
            navigate('/notes');
        }
    }, [user, navigate]);


    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords don\'t match');
            return;
        }

        const { error } = await register({
            name,
            email,
            password,
        });

        if (!error) {
            toast.success('Registration successful!');
            navigate('/');
        }
    };

    return (
        <div className={`flex items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}`}>
            <div className="bg-base-100 p-4 rounded-xl shadow-2xl max-w-sm w-full">
                <img
                    src="../public/vite.svg"
                    alt="Personal Notes Logo"
                    className="mx-auto mb-4"
                    style={{ width: '60px', height: 'auto' }}
                />
                <h1 className="text-2xl font-light mb-4 text-center">{translate('title')}</h1>
                <form className="space-y-4" onSubmit={handleRegister}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">{translate('pageRegister.name')}</span>
                        </label>
                        <input
                            type="text"
                            placeholder={translate('pageRegister.name')}
                            className="input input-bordered"
                            required
                            name="name"
                            value={name}
                            onChange={onNameChange}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">{translate('pageRegister.email')}</span>
                        </label>
                        <input
                            type="email"
                            placeholder={translate('pageRegister.email')}
                            className="input input-bordered"
                            required
                            name="email"
                            value={email}
                            onChange={onEmailChange}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">{translate('pageRegister.password')}</span>
                        </label>
                        <input
                            type="password"
                            placeholder={translate('pageRegister.password')}
                            className="input input-bordered"
                            required
                            name="password"
                            value={password}
                            onChange={onPasswordChange}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">{translate('pageRegister.confirmPassword')}</span>
                        </label>
                        <input
                            type="password"
                            placeholder={translate('pageRegister.confirmPassword')}
                            className="input input-bordered"
                            required
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={onConfirmPasswordChange}
                        />
                    </div>
                    <div className="form-control">
                        <button type="submit" className="btn btn-primary w-full">
                            {translate('pageRegister.register')}
                        </button>
                    </div>
                </form>
                <h1 className="font-light mt-5 text-center">
                    {translate('pageRegister.loginDesc')} <Link to="/" className="text-blue-500">{translate('pageRegister.loginLink')}</Link>
                </h1>
            </div>
        </div>
    );
};

export default RegisterPage;
