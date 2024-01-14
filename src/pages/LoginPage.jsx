import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, getUserLogged } from '../utils/network-data';
import toast from 'react-hot-toast';
import { useAuth } from '../lib/context/AuthContext';
import useInput from '../lib/hooks/useInput';

const LoginPage = () => {
    const navigate = useNavigate();
    const { user, signIn } = useAuth();
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');

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
        <div className="flex items-center justify-center min-h-screen bg-base-200">
            <div className="bg-base-100 p-4 rounded-xl shadow-2xl max-w-sm w-full">
                <img
                    src="../public/vite.svg"
                    alt="Personal Notes Logo"
                    className="mx-auto mb-4"
                    style={{ width: '60px', height: 'auto' }}
                />
                <h1 className="text-2xl font-light mb-4 text-center">Personal Notes</h1>
                <form className="space-y-4" onSubmit={handleLogin}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="input input-bordered"
                            required
                            value={email}
                            onChange={onEmailChange}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="input input-bordered"
                            required
                            value={password}
                            onChange={onPasswordChange}
                        />
                    </div>
                    <div className="form-control">
                        <button type="submit" className="btn btn-primary w-full">
                            Login
                        </button>
                    </div>
                </form>
                <h1 className="font-light mt-5 text-center">
                    Belum punya akun? <a href="/register" className="text-blue-500">Daftar di sini</a>
                </h1>
            </div>
        </div>
    );
};

export default LoginPage;
