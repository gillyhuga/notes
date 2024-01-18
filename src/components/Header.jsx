import PropTypes from 'prop-types';

const Header = ({ title }) => {
    return (
        <div className="text-center mb-4">
            <img
                src="/website-icon.png"
                alt="Personal Notes Logo"
                className="mx-auto mb-4"
                style={{ width: '60px', height: 'auto' }}
            />
            <h1 className="text-2xl font-light mb-4">{title}</h1>
        </div>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Header;
