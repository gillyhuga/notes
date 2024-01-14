import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import languages from '../../utils/languages';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('language') || 'id';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === 'id' ? 'en' : 'id'));
    };

    const translate = (key) => {
        const keys = key.split('.');
        let translated = languages[language];

        keys.forEach((k) => {
            translated = translated[k];
        });

        return translated || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, translate }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Add PropTypes
LanguageProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useLanguage = () => {
    return useContext(LanguageContext);
};
