import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../lib/context/LanguageContext';

const NotFoundPage = () => {
    const navigate = useNavigate();
    const { translate } = useLanguage();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            navigate(-1);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-800 pb-4">
                {translate('pageNotFound.title')}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-gray-800">
                {translate('pageNotFound.desc')}
            </p>
        </div>
    );
};

export default NotFoundPage;
