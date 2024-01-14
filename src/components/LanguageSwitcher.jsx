import { useLanguage } from '../lib/context/LanguageContext';

const LanguageSwitcher = () => {
    const { language, toggleLanguage } = useLanguage();

    const renderLanguageLink = (langCode, label) => (
        <a
            className={`cursor-pointer ${language === langCode ? 'text-slate-800 font-bold' : 'text-gray-500'}`}
            onClick={() => language !== langCode && toggleLanguage(langCode)}
            style={{
                pointerEvents: language === langCode ? 'none' : 'auto',
            }}
        >
            {label}
        </a>
    );

    return (
        <div className="font-light mt-5 text-center">
            {renderLanguageLink('id', 'ID')}
            {' | '}
            {renderLanguageLink('en', 'EN')}
        </div>
    );
};

export default LanguageSwitcher;
