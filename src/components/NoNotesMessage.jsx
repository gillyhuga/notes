import { useLanguage } from '../lib/context/LanguageContext';

const NoNotesMessage = () => {
    const { translate } = useLanguage();
    return (
        <>
            <h1 className="text-center mt-8 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
                Oops!
            </h1>
            <p className="text-center text-gray-500 text-lg font-bold"> {translate('noNotesMessage')} </p>
        </>
    );
};

export default NoNotesMessage;
