import { useParams } from 'react-router-dom';
import NoteForm from '../components/NoteForm';
import { getNote, editNote } from '../utils/local-data';
import Layout from '../components/Layout';

const DetailPage = () => {
    const { id } = useParams();
    const note = getNote(id);

    const handleUpdateNote = (updatedNote) => {
        editNote(updatedNote);
    };

    const pageTitle = `${note.title} | Personal Notes`;

    return (
        <Layout title={pageTitle}>
            <NoteForm note={note} isEditMode onUpdateNote={handleUpdateNote} />
        </Layout>
    );
};

export default DetailPage;
