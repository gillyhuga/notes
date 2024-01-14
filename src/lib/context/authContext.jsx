import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUserLogged, getAccessToken } from '../../utils/network-data';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const storedAccessToken = getAccessToken();
                if (storedAccessToken) {
                    const { error, data } = await getUserLogged();
                    if (!error) {
                        setUser(data);
                    }
                }
            } catch (error) {
                toast.error('Error checking authentication:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const signIn = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        setUser(null);
    };

    const isAuthenticated = () => {
        return user;
    };

    return (
        <AuthContext.Provider value={{ user, signIn, logout, isAuthenticated, loading }}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};