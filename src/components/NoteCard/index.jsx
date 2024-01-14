import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import NoteTitle from './NoteTitle';
import NoteBody from './NoteBody';
import NoteActions from './NoteActions';

const NoteCard = ({ note, color, onNoteArchive, onNoteUnarchive, onNoteDelete }) => {
    const { id, title, createdAt, body, archived } = note;

    const toggleArchive = () => {
        if (archived) {
            try {
                onNoteUnarchive?.(id);
                toast.success('Successfully Unarchive Note!');
            } catch (error) {
                toast.error('Failed to unarchive the note!');
            }
        } else {
            try {
                onNoteArchive?.(id);
                toast.success('Successfully Archive Note!');
            } catch (error) {
                toast.error('Failed to archive the note!');
            }
        }
    };

    const handleDelete = () => {
        try {
            onNoteDelete?.(id);
            toast.success('Successfully Deleted Note!');
        } catch (error) {
            toast.error('Failed to delete the note!');
        }
    };

    return (
        <div className={`card min-h-full w-full pb-6 sm:w-66 ${color} shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105`}>
            <div className="card-body p-4">
                <Link to={`/notes/detail/${id}`}>
                    <NoteTitle id={id} title={title} createdAt={createdAt} archived={archived} />
                    <NoteBody body={body} />
                </Link>
                <NoteActions
                    isArchived={archived}
                    toggleArchive={toggleArchive}
                    handleDelete={handleDelete}
                />
            </div>
        </div>
    );
};

NoteCard.propTypes = {
    note: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        archived: PropTypes.bool.isRequired,
    }).isRequired,
    color: PropTypes.string.isRequired,
    onNoteArchive: PropTypes.func,
    onNoteUnarchive: PropTypes.func,
    onNoteDelete: PropTypes.func,
};

export default NoteCard;
