import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './lib/context/LanguageContext.jsx';
import { ThemeProvider } from './lib/context/ThemeContext.jsx';
import { AuthProvider } from './lib/context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Toaster
            position="top-center"
            reverseOrder={false}
        />
        <ThemeProvider>
            <LanguageProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </LanguageProvider>
        </ThemeProvider>
    </BrowserRouter>,
);
