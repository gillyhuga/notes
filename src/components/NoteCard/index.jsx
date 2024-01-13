import { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { archiveNote, unarchiveNote, deleteNote } from '../../utils/local-data';
import NoteTitle from './NoteTitle';
import NoteBody from './NoteBody';
import NoteActions from './NoteActions';

const NoteCard = ({ note, color, onNoteArchive, onNoteUnarchive, onNoteDelete }) => {
    const { id, title,createdAt, body, archived } = note;
    const [isArchived, setIsArchived] = useState(archived);

    const toggleArchive = () => {
        const action = isArchived ? unarchiveNote : archiveNote;
        action(id);
        setIsArchived(!isArchived);

        if (isArchived) {
            onNoteUnarchive?.(id);
            toast.success('Successfully Unarchive Note!');
        } else {
            onNoteArchive?.(id);
            toast.success('Successfully Archive Note!');
        }
    };

    const handleDelete = () => {
        deleteNote(id);
        onNoteDelete?.(id);
        toast.success('Successfully Deleted Note!');
    };

    return (
        <div className={`card min-h-full w-full pb-6 sm:w-66 ${color} shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105`}>
            <div className="card-body p-4">
                <Link to={`/notes/detail/${id}`}>
                    <NoteTitle id={id} title={title} createdAt={createdAt} archived={archived} />
                    <NoteBody body={body} />
                </Link>
                <NoteActions
                    isArchived={isArchived}
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
