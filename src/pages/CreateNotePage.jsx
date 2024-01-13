import NoteForm from '../components/NoteForm';
import Layout from '../components/Layout';
import { addNote } from '../utils/local-data';
import { useNavigate } from 'react-router-dom';

const AddNotePage = () => {
    const navigate = useNavigate();

    const handleAddNote = (newNote) => {
        addNote(newNote);
        navigate('/note');
    };

    return (
        <Layout title="Create Notes">
            <NoteForm note={{ title: '', body: '' }} isEditMode={false} onCreateNote={handleAddNote} />
        </Layout>
    );
};

export default AddNotePage;
