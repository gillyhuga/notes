import { useState, useEffect, useCallback } from 'react';
import Layout from '../components/Layout';
import NoteList from '../components/NoteList';
import { getActiveNotes, archiveNote, deleteNote } from '../utils/local-data';
import SearchBar from '../components/SearchBar';
import { useNavigate, useLocation } from 'react-router-dom';

const NotePage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [activeNotes, setActiveNotes] = useState([]);
    const [keyword, setKeyword] = useState('');

    const handleSearch = useCallback((searchKeyword) => {
        setKeyword(searchKeyword);

        const filteredNotes = getActiveNotes().filter((note) =>
            note.title.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        setActiveNotes(filteredNotes);

        const searchParams = new URLSearchParams();
        if (searchKeyword) {
            searchParams.set('keyword', searchKeyword);
        }

        navigate({ search: searchParams.toString() });
    }, [navigate]);

    useEffect(() => {
        const loadActiveNotes = () => {
            const notes = getActiveNotes();
            setActiveNotes(notes);
        };

        const loadNotesFromURL = () => {
            const searchParams = new URLSearchParams(location.search);
            const keywordParam = searchParams.get('keyword');

            if (keywordParam) {
                setKeyword(keywordParam);
                handleSearch(keywordParam);
            }
        };

        loadActiveNotes();
        loadNotesFromURL();
    }, [location.search, handleSearch]);

    const handleNoteDelete = (noteId) => {
        deleteNote(noteId);
        setActiveNotes(getActiveNotes());
    };

    const handleArchiveNote = (noteId) => {
        archiveNote(noteId);
        setActiveNotes(getActiveNotes());
    };

    return (
        <Layout title="My Notes">
            <div>
                <div className="flex space-x-4">
                    <SearchBar onSearch={handleSearch} initialSearchKey={keyword} />
                </div>
                <h1 className="font-bold text-xl pt-2">My Notes</h1>
                <p className="text-sm text-gray-500 mb-4">
                    Showing {activeNotes.length} active notes
                </p>
                <NoteList
                    notes={activeNotes}
                    onNoteArchive={handleArchiveNote}
                    onNoteDelete={handleNoteDelete}
                />
            </div>
        </Layout>
    );
};

export default NotePage;
