import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../utils/network-data';
import toast from 'react-hot-toast';
import { useAuth } from '../lib/AuthContext';

const RegisterPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    useEffect(() => {
        if (user) {
            navigate('/notes');
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords don\'t match');
            return;
        }

        const { error } = await register({
            name: formData.name,
            email: formData.email,
            password: formData.password,
        });

        if (!error) {
            toast.success('Registration successful!');
            navigate('/');
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
                <form className="space-y-4" onSubmit={handleRegister}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Name"
                            className="input input-bordered"
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="input input-bordered"
                            required
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="input input-bordered"
                            required
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Confirm Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="input input-bordered"
                            required
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-control">
                        <button type="submit" className="btn btn-primary w-full">
                            Register
                        </button>
                    </div>
                </form>
                <h1 className="font-light mt-5 text-center">
                    Sudah punya akun? <a href="/" className="text-blue-500">Login di sini</a>
                </h1>
            </div>
        </div>
    );
};

export default RegisterPage;
