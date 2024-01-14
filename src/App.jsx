import { Routes, Route } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import CreateNotePage from './pages/CreateNotePage';
import ArchivePage from './pages/ArchivePage';
import NotePage from './pages/NotePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './components/Layout';
import { AuthProvider } from './lib/context/authContext';

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route element={<Layout />}>
                    <Route path="/notes" element={<NotePage />} />
                    <Route path="/create" element={<CreateNotePage />} />
                    <Route path="/notes/detail/:id" element={<DetailPage />} />
                    <Route path="/archive" element={<ArchivePage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </AuthProvider>
    );
}

export default App;
