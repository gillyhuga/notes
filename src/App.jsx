import { Routes, Route, Navigate } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import CreateNotePage from './pages/CreateNotePage';
import ArchivePage from './pages/ArchivePage';
import NotePage from './pages/NotePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
    return (
        <Routes>
            <Route path="" element={<Navigate to="/notes" />} />
            <Route path="/notes" element={<NotePage />} />
            <Route path="/create" element={<CreateNotePage />} />
            <Route path="/notes/detail/:id" element={<DetailPage />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default App;
