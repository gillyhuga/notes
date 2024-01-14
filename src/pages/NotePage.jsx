import { useState, useEffect, useCallback } from 'react';
import Loader from '../components/Loader';
import NoteList from '../components/NoteList';
import { getActiveNotes, archiveNote, deleteNote } from '../utils/network-data';
import SearchBar from '../components/SearchBar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../lib/context/LanguageContext';

const NotePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { translate } = useLanguage();
    const [activeNotes, setActiveNotes] = useState([]);
    const [searchNotes, setSearchNotes] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(true);

    const handleSearch = useCallback(async (searchKeyword) => {
        setKeyword(searchKeyword);

        const filteredNotes = activeNotes.filter((note) =>
            note.title.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        setSearchNotes(filteredNotes);

        const searchParams = new URLSearchParams();
        if (searchKeyword) {
            searchParams.set('keyword', searchKeyword);
        }

        navigate({ search: searchParams.toString() });
    }, [activeNotes, navigate]);

    const loadData = async () => {
        try {
            const data = await getActiveNotes();
            setActiveNotes(data.data);
            setSearchNotes(data.data);
        } catch (error) {
            console.error('Error fetching active notes:', error);
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
            console.error('Error loading notes from URL:', error);
        }
    };

    useEffect(() => {
        const initializeData = async () => {
            if (!activeNotes.length) {
                await loadData();
                await loadNotesFromURL();
            }
        };

        initializeData();
    }, []);

    const handleNoteDelete = async (noteId) => {
        setLoading(true);
        try {
            await deleteNote(noteId);
            await loadData();
        } finally {
            setLoading(false);
        }
    };


    const handleArchiveNote = async (noteId) => {
        setLoading(true);
        try {
            await archiveNote(noteId);
            await loadData();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex space-x-4">
                <SearchBar onSearch={handleSearch} initialSearchKey={keyword} />
            </div>
            <h1 className="font-bold text-xl pt-2">{translate('pageNotes.title')}</h1>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <p className="text-sm text-gray-500 mb-4">
                        {translate('pageNotes.result')} {keyword ? searchNotes.length : activeNotes.length} {translate('pageNotes.desc')}
                    </p>
                    <NoteList
                        notes={keyword ? searchNotes : activeNotes}
                        onNoteArchive={handleArchiveNote}
                        onNoteDelete={handleNoteDelete}
                    />
                </>
            )}
        </div>
    );
};

export default NotePage;
