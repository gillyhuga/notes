import PropTypes from 'prop-types';
import useInput from '../lib/hooks/useInput';

const LoginForm = ({ onLogin, translate }) => {
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            email,
            password,
        };

        onLogin(formData);
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
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
                <button type="submit" className="btn btn-neutral w-full">
                    {translate('pageLogin.login')}
                </button>
            </div>
        </form>
    );
};

LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
};

export default LoginForm;
