import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const NotFoundPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            navigate('/');
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [navigate]);

    return (
        <Layout title="404 Not Found">
            <div className="flex flex-col items-center justify-center space-y-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-800">
                    Oops! 404
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-gray-800">
                    Unfortunately, this page doesn`t exist.
                </p>
            </div>
        </Layout>
    );
};

export default NotFoundPage;
