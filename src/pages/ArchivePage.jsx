import { useEffect, useState, useCallback } from 'react';
import Layout from '../components/Layout';
import NoteList from '../components/NoteList';
import { getArchivedNotes, unarchiveNote, deleteNote } from '../utils/local-data';
import SearchBar from '../components/SearchBar';
import { useNavigate, useLocation } from 'react-router-dom';

const ArchivePage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [archivedNotes, setArchivedNotes] = useState([]);
    const [keyword, setKeyword] = useState('');

    const handleSearch = useCallback((searchKeyword) => {
        setKeyword(searchKeyword);

        const filteredNotes = getArchivedNotes().filter((note) =>
            note.title.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        setArchivedNotes(filteredNotes);

        const searchParams = new URLSearchParams();
        if (searchKeyword) {
            searchParams.set('keyword', searchKeyword);
        }

        navigate({ search: searchParams.toString() });
    }, [navigate]);

    useEffect(() => {
        const loadArchivedNotes = () => {
            const notes = getArchivedNotes();
            setArchivedNotes(notes);
        };

        const loadNotesFromURL = () => {
            const searchParams = new URLSearchParams(location.search);
            const keywordParam = searchParams.get('keyword');

            if (keywordParam) {
                setKeyword(keywordParam);
                handleSearch(keywordParam);
            }
        };

        loadArchivedNotes();
        loadNotesFromURL();
    }, [location.search, handleSearch]);

    const handleNoteUnarchive = (noteId) => {
        unarchiveNote(noteId);
        setArchivedNotes(getArchivedNotes());
    };

    const handleNoteDelete = (noteId) => {
        deleteNote(noteId);
        setArchivedNotes(getArchivedNotes());
    };

    return (
        <Layout title='Archived Notes'>
            <div>
                <div className="flex space-x-4">
                    <SearchBar onSearch={handleSearch} initialSearchKey={keyword} />
                </div>
                <h1 className="font-bold text-xl pt-2">Archived Notes</h1>
                <p className="text-sm text-gray-500 mb-4"> Showing {archivedNotes.length} archived notes</p>
                <NoteList
                    notes={archivedNotes}
                    onNoteUnarchive={handleNoteUnarchive}
                    onNoteDelete={handleNoteDelete}
                />
            </div>
        </Layout>
    );
};

export default ArchivePage;
