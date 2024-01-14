import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import NoteForm from '../components/NoteForm';
import { addNote } from '../utils/network-data';

const CreateNotePage = () => {
    const navigate = useNavigate();

    const handleSubmit = async (notes) => {
        try {
            await toast.promise(
                addNote({
                    title: notes.title,
                    body: notes.body,
                }),
                {
                    loading: 'Creating...',
                    success: 'Successfully Created!',
                    error: 'Failed to create note',
                }
            );
            navigate('/notes');
        } catch (error) {
            toast.error('Error creating note:', error);
        }
    };

    return (
        <NoteForm onSubmit={handleSubmit} />
    );
};

export default CreateNotePage;
