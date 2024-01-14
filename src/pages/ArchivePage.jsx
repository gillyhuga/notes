import { useEffect, useState, useCallback } from 'react';
import Loader from '../components/Loader';
import NoteList from '../components/NoteList';
import { getArchivedNotes, unarchiveNote, deleteNote } from '../utils/network-data';
import SearchBar from '../components/SearchBar';
import { useNavigate, useLocation } from 'react-router-dom';

const ArchivePage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [archivedNotes, setArchivedNotes] = useState([]);
    const [searchNotes, setSearchNotes] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(true); // Add loading state

    const handleSearch = useCallback(async (searchKeyword) => {
        setKeyword(searchKeyword);

        const filteredNotes = archivedNotes.filter((note) =>
            note.title.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        setSearchNotes(filteredNotes);

        const searchParams = new URLSearchParams();
        if (searchKeyword) {
            searchParams.set('keyword', searchKeyword);
        }

        navigate({ search: searchParams.toString() });
    }, [archivedNotes, navigate]);

    const loadData = async () => {
        try {
            const notes = await getArchivedNotes();
            setArchivedNotes(notes.data);
        } catch (error) {
            console.error('Error fetching archived notes:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadNotesFromURL = async () => {
        try {
            const searchParams = new URLSearchParams(location.search);
            const keywordParam = searchParams.get('keyword');

            if (keywordParam) {
                setKeyword(keywordParam);
                await handleSearch(keywordParam);
            }
        } catch (error) {
            console.error('Error loading archived notes from URL:', error);
        }
    };

    useEffect(() => {
        const initializeData = async () => {
            if (!archivedNotes.length) {
                await loadData();
                await loadNotesFromURL();
            }
        };

        initializeData();
    }, []);

    const handleNoteUnarchive = async (noteId) => {
        setLoading(true);
        try {
            await unarchiveNote(noteId);
            await loadData(); // Reload the archived notes after unarchiving
        } finally {
            setLoading(false);
        }
    };

    const handleNoteDelete = async (noteId) => {
        setLoading(true);
        try {
            await deleteNote(noteId);
            await loadData(); // Reload the archived notes after deleting
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex space-x-4">
                <SearchBar onSearch={handleSearch} initialSearchKey={keyword} />
            </div>
            <h1 className="font-bold text-xl pt-2">Archived Notes</h1>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <p className="text-sm text-gray-500 mb-4"> Showing {keyword ? searchNotes.length : archivedNotes.length} archived notes</p>
                    <NoteList
                        notes={keyword ? searchNotes : archivedNotes}
                        onNoteUnarchive={handleNoteUnarchive}
                        onNoteDelete={handleNoteDelete}
                    />
                </>
            )}
        </div>
    );
};

export default ArchivePage;
