import PropTypes from 'prop-types';
import useInput from '../lib/hooks/useInput';

const RegisterForm = ({ onRegister, translate }) => {
    const [name, onNameChange] = useInput('');
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');
    const [confirmPassword, onConfirmPasswordChange] = useInput('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords don\'t match');
            return;
        }

        const formData = {
            name,
            email,
            password,
        };

        onRegister(formData);
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
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
                <button type="submit" className="btn btn-neutral w-full">
                    {translate('pageRegister.register')}
                </button>
            </div>
        </form>
    );
};

RegisterForm.propTypes = {
    onRegister: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
};

export default RegisterForm;
